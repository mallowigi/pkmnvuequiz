import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive, ref } from 'vue';

import { useLoadingProgress } from '@/composables/useLoadingProgress.ts';
import { parseAttackDexCatalog } from '@/schemas/attackDexCatalog.schema.ts';
import { useAttacks } from '@/stores/useAttacks.ts';
import type { Translations, AttackDexData, Attack } from '@/types.ts';

export const useAttackStore = defineStore('attackData', () => {
  const { beginLoading, endLoading, reportStep } = useLoadingProgress();
  const isLoading = ref(false);

  const data: AttackDexData = reactive<AttackDexData>({
    attacks: null,
    error: null,
    isLoaded: false,
    translations: null,
  });

  async function loadAttacks() {
    const module = await import('@/data/attacks.json');
    const result = parseAttackDexCatalog(module.default);

    if (!result.success) {
      throw result.error;
    }

    data.attacks = result.data.moves as Attack[];
  }

  async function loadTranslations() {
    const module = await import('@/data/attackTranslations.json');
    data.translations = module.default.translations as Record<string, Translations>;
  }

  function setLoaded() {
    data.isLoaded = true;
  }

  function setError(error: unknown) {
    data.error = error;
  }

  async function loadData() {
    const { initializeAttackMaps } = useAttacks();
    if (data.isLoaded || isLoading.value) {
      return;
    }

    const loaders = [loadAttacks, loadTranslations];

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
      initializeAttackMaps();
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
