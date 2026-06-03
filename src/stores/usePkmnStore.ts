import { useNProgress } from '@vueuse/integrations/useNProgress';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

import { usePokemons } from '@/stores/usePokemons.ts';
import type { PkmnData, PokemonInfo, Translations } from '@/types';

type PkmnDataState = {
  error: unknown;
  isLoaded: boolean;
  namings: Record<string, string> | null;
  pokemon: PokemonInfo[] | null;
  shinies: Record<string, string> | null;
  silhouettes: Record<string, string> | null;
  spriteCycles: Record<string, string[]> | null;
  sprites: Record<string, string> | null;
  suffixNamings: Record<string, string> | null;
  translations: Record<string, Translations> | null;
};

export const usePkmnData = defineStore('pkmnData', () => {
  const { isLoading, progress } = useNProgress(undefined, {
    showSpinner: false,
  });
  const { initializePokemonMaps } = usePokemons();

  const data: PkmnData = reactive<PkmnDataState>({
    error: null,
    isLoaded: false,
    namings: null,
    pokemon: null,
    shinies: null,
    silhouettes: null,
    spriteCycles: null,
    sprites: null,
    suffixNamings: null,
    translations: null,
  });

  async function loadPokemons() {
    const module = await import('@/data/pokemon.json');
    data.pokemon = module.default.pokemon as PokemonInfo[];
  }

  async function loadNamings() {
    const module = await import('@/data/namings.json');
    data.namings = module.default.namings;
    data.suffixNamings = module.default.suffix_namings;
  }

  async function loadSpriteCycles() {
    const module = await import('@/data/spriteCycles.json');
    data.spriteCycles = module.default.sprite_cycles as Record<string, string[]>;
  }

  async function loadTranslations() {
    const module = await import('@/data/translations.json');
    data.translations = module.default.translations as Record<string, Translations>;
  }

  async function loadSprites() {
    const module = await import('@/data/sprites.json');
    data.sprites = module.default.sprite as Record<string, string>;
  }

  async function loadShinies() {
    const module = await import('@/data/shinies.json');
    data.shinies = module.default.shiny as Record<string, string>;
  }

  async function loadSilhouettes() {
    const module = await import('@/data/silhouettes.json');
    data.silhouettes = module.default.silhouette as Record<string, string>;
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

    const loaders = [
      loadPokemons,
      loadSprites,
      loadSpriteCycles,
      loadTranslations,
      loadNamings,
      loadSilhouettes,
      loadShinies,
    ];

    let loadedCount = 0;

    setError(null);
    progress.value = 0;
    isLoading.value = true;

    try {
      await Promise.all(
        loaders.map(async (loader) => {
          await loader();
          loadedCount += 1;
          progress.value = loadedCount / loaders.length;
        }),
      );

      setLoaded();
      initializePokemonMaps();
    } catch (error) {
      console.error('Error loading data:', error);
      setError(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    data,
    loadData,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePkmnData, import.meta.hot));
}
