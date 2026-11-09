import { useI18n } from 'vue-i18n';

import { useGlobalStats } from '@/stores/useGlobalStats.ts';
import type { Type } from '@/types.ts';
import { createAchievement } from '@/utils/utils.ts';

export function usePokemonCatcher(type: Type) {
  const { statsState } = useGlobalStats();
  const { t } = useI18n({
    messages: {
      en: {
        bronzeTitle: 'Type Novice',
        description: 'Find {n} {type} Pokémon.',
        goldTitle: 'Type Specialist',
        lastDescription: `Found 10000 {type} Pokémon.`,
        lastTitle: 'Type Master',
        platinumTitle: 'Type Expert',
        silverTitle: 'Type Apprentice',
      },
    },
  });

  return createAchievement({
    category: 'pokemon',
    getValue: () => statsState.pokemonFoundByType[type],
    id: `pokemonCatcher_${type}`,
    get lastDescription() {
      return t('lastDescription', { type: t(`type_${type}`) });
    },
    get lastTitle() {
      return t('lastTitle');
    },
    priority: 5,
    thresholds: [
      {
        get description() {
          return t('description', { n: 500, type: t(`type_${type}`) });
        },
        get nextTitle() {
          return t('bronzeTitle');
        },
        rank: 'bronze',
        val: 500,
      },
      {
        get description() {
          return t('description', { n: 1000, type: t(`type_${type}`) });
        },
        get nextTitle() {
          return t('silverTitle');
        },
        rank: 'silver',
        val: 1000,
      },
      {
        get description() {
          return t('description', { n: 2000, type: t(`type_${type}`) });
        },
        get nextTitle() {
          return t('goldTitle');
        },
        rank: 'gold',
        val: 2000,
      },
      {
        get description() {
          return t('description', { n: 10000, type: t(`type_${type}`) });
        },
        get nextTitle() {
          return t('platinumTitle');
        },
        rank: 'platinum',
        val: 10000,
      },
    ],
  });
}
