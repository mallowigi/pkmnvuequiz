import { defineStore, acceptHMRUpdate } from 'pinia';
import { useI18n } from 'vue-i18n';

import { useAttackStore } from '@/stores/useAttackStore.ts';
import { usePkmnData } from '@/stores/usePkmnStore.ts';
import type { Attack, Language, PokemonInfo } from '@/types.ts';
import { capitalize, normalizeName } from '@/utils/utils.ts';

export const useLanguages = defineStore('languages', () => {
  const { data } = usePkmnData();
  const { data: attackData } = useAttackStore();
  const { locale } = useI18n();

  const getTranslation = (pokemon: PokemonInfo | string, language?: Language | string | null) => {
    const rawLang = language || locale.value;
    const langKey = rawLang === 'jp' ? 'ja' : rawLang;

    if (!data.translations) {
      if (typeof pokemon === 'string') return capitalize(pokemon);
      return capitalize(pokemon.baseName);
    }

    const pokemonId = typeof pokemon === 'string' ? pokemon : pokemon.id;
    const baseName = typeof pokemon === 'string' ? pokemon : pokemon.baseName;

    const normalizedId = normalizeName(pokemonId);
    const normalizedBaseName = normalizeName(baseName);

    const translations =
      data.translations[pokemonId] ??
      data.translations[normalizedId] ??
      data.translations[baseName] ??
      data.translations[normalizedBaseName];

    if (!translations) {
      return capitalize(baseName);
    }

    const localized = translations[langKey as Language] ?? translations.en ?? baseName;
    return capitalize(localized);
  };

  const getAttackTranslation = (attack: Attack, language?: Language | string | null) => {
    const rawLang = language || locale.value;
    const langKey = rawLang === 'jp' ? 'ja' : rawLang;

    const translations = attackData.translations?.[attack.id];
    if (!translations) {
      return capitalize(attack.name);
    }

    const localized = translations[langKey as Language] ?? translations.en ?? attack.name;
    return capitalize(localized);
  };

  return {
    getAttackTranslation,
    getTranslation,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLanguages, import.meta.hot));
}
