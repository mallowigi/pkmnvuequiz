import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

import { useSavedData } from '@/composables/useSavedData.ts';
import { useCurrentGen } from '@/stores/useCurrentGen.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useLanguages } from '@/stores/useLanguages.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import { useState } from '@/stores/useState.ts';
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
  const { loadAutoSave, autoSave } = useSavedData();

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

  const initSavedState = () => {
    // 1. Try to load progress first
    loadAutoSave();

    // 2. Debounce setup (wait 500ms after the last action to save)
    let saveTimeout: ReturnType<typeof setTimeout>;
    const triggerAutoSave = () => {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        autoSave();
      }, 500);
    };

    // 3. Subscribe to the essential stores
    const storesToWatch = [useState(), useCurrentGen(), useCurrentType(), usePokemons(), useLanguages(), useGameFlow()];

    for (const store of storesToWatch) {
      store.$subscribe(
        () => {
          triggerAutoSave();
        },
        { detached: true },
      );
    }
  };

  async function loadData() {
    return Promise.all([
      loadPokemons(),
      loadSprites(),
      loadSpriteCycles(),
      loadTranslations(),
      loadNamings(),
      loadSilhouettes(),
      loadShinies(),
    ])
      .then(() => {
        const { initializePokemonMaps } = usePokemons();

        setLoaded();
        initializePokemonMaps();
        initSavedState();
      })
      .catch((error) => {
        console.error('Error loading data:', error);
        setError(error);
      });
  }

  return {
    data,
    loadData,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePkmnData, import.meta.hot));
}
