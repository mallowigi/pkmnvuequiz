import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

import type { Language, LanguagesState } from '@/types.ts';

export const useLanguages = defineStore('languages', () => {
  const languagesState = reactive<LanguagesState>({
    languages: new Set<Language>(['en', 'ko', 'ja', 'zh', 'cn']),
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

  return {
    languagesState,
    resetLanguages,
    setLanguages,
    toggleLanguage,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLanguages, import.meta.hot));
}
