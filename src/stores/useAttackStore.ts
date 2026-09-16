import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive, ref } from 'vue';

import type { AttackDexData, AttackDexMove } from '@/attackdex/types.ts';
import { useLoadingProgress } from '@/composables/useLoadingProgress.ts';
import { parseAttackDexCatalog } from '@/schemas/attackDexCatalog.schema.ts';
import type { Translations } from '@/types.ts';

export const useAttackStore = defineStore('attackData', () => {
  const { beginLoading, endLoading, reportStep } = useLoadingProgress();
  const isLoading = ref(false);

  const data: AttackDexData = reactive<AttackDexData>({
    error: null,
    isLoaded: false,
    moves: null,
    translations: null,
  });

  async function loadMoves() {
    const module = await import('@/data/attacks.json');
    const result = parseAttackDexCatalog(module.default);

    if (!result.success) {
      throw result.error;
    }

    data.moves = result.data.moves as AttackDexMove[];
  }

  async function loadTranslations() {
    const module = await import('@/data/moveTranslations.json');
    data.translations = module.default.translations as Record<string, Translations>;
  }

  function setLoaded() {
    data.isLoaded = true;
  }

  function setError(error: unknown) {
    data.error = error;
  }

  async function loadData() {
    if (data.isLoaded || isLoading.value) {
      return;
    }

    const loaders = [loadMoves, loadTranslations];

    setError(null);
    isLoading.value = true;
    beginLoading(loaders.length);

    try {
      await Promise.all(
        loaders.map(async (loader) => {
          await loader();
          reportStep();
        }),
      );

      setLoaded();
    } catch (error) {
      console.error('Error loading attack data:', error);
      setError(error);
    } finally {
      isLoading.value = false;
      endLoading();
    }
  }

  return {
    data,
    loadData,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAttackStore, import.meta.hot));
}
