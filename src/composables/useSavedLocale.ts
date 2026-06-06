import { useLocalStorage, usePreferredLanguages } from '@vueuse/core';
import { availableLanguages } from '@/types.ts';

const getPreferredLanguage = () => {
  const languages = usePreferredLanguages();
  if (!languages.value.length) {
    return 'en';
  }

  const firstAvailableLanguage = languages.value.find((lang) =>
    availableLanguages.includes(lang),
  );

  return firstAvailableLanguage || 'en';
};

const savedLocale = useLocalStorage('pkmnQuizLocale', getPreferredLanguage());

export const useSavedLocale = () => {
  return {
    savedLocale,
  };
};
