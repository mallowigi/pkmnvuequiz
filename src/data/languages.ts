import type { LanguageInfo, Language } from '@/types.ts';

export const languages: Record<Language, LanguageInfo> = {
  cn: {
    id: 'cn',
    index: 6,
    name: 'Chinese (Simplified)',
    symbol: 'CHS',
  },
  de: {
    id: 'de',
    index: 2,
    name: 'German',
    symbol: 'GER',
  },
  en: {
    id: 'en',
    index: 0,
    name: 'English',
    symbol: 'ENG/ESP/ITA',
  },
  fr: {
    id: 'fr',
    index: 1,
    name: 'French',
    symbol: 'FRE',
  },
  ja: {
    id: 'ja',
    index: 4,
    name: 'Japanese',
    symbol: 'JPN',
  },
  ko: {
    id: 'ko',
    index: 3,
    name: 'Korean',
    symbol: 'KOR',
  },
  zh: {
    id: 'zh',
    index: 5,
    name: 'Chinese (Traditional)',
    symbol: 'CHT',
  },
};
