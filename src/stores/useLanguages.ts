import { defineStore, acceptHMRUpdate } from 'pinia';

import { usePkmnData } from '@/stores/usePkmnStore.ts';
import type { Language, PokemonInfo } from '@/types.ts';

export const useLanguages = defineStore('languages', () => {
  const { data } = usePkmnData();

  const getTranslation = (pokemon: PokemonInfo, language: Language | null) => {
    if (!language) {
      return data.translations?.[pokemon.id]?.en;
    }
    return data.translations?.[pokemon.id]?.[language];
  };

  return {
    getTranslation,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLanguages, import.meta.hot));
}
