import { readonly, reactive } from 'vue';

import type { Language, LanguagesState } from '@/types.ts';

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

export const useLanguages = () => {
  return {
    languagesState: readonly(languagesState),
    resetLanguages,
    setLanguages,
    toggleLanguage,
  };
};
