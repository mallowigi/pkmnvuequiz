import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

import type { Language, LanguagesState, PokemonInfo } from '@/types.ts';
import { usePkmnData } from '@/stores/usePkmnStore.ts';

export const useLanguages = defineStore('languages', () => {
  const { data } = usePkmnData();

  const languagesState = reactive<LanguagesState>({
    languages: new Set<Language>(['en', 'fr', 'de', 'ko', 'ja', 'zh', 'cn']),
  });

  const toggleLanguage = (language: Language) => {
    if (languagesState.languages.has(language)) {
      languagesState.languages.delete(language);
      return;
    }
    languagesState.languages.add(language);
  };

  const setLanguages = (languages: Language[]) => {
    languagesState.languages = new Set<Language>(languages);
  };

  const resetLanguages = () => {
    languagesState.languages = new Set<Language>(['en', 'ko', 'ja', 'zh', 'cn']);
  };

  const getTranslation = (pokemon: PokemonInfo, language: Language | null) => {
    if (!language) {
      return data.translations?.[pokemon.id]?.en;
    }
    return data.translations?.[pokemon.id]?.[language];
  };

  return {
    getTranslation,
    languagesState,
    resetLanguages,
    setLanguages,
    toggleLanguage,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLanguages, import.meta.hot));
}
