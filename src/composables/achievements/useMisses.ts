// Global misses counter achievement
import { useI18n } from 'vue-i18n';

import { useGlobalStats } from '@/stores/useGlobalStats.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useMisses = () => {
  const { statsState } = useGlobalStats();
  const { t } = useI18n({
    messages: {
      en: {
        bronzeTitle: 'Misnomer',
        description: 'Miss {n} Pokémon total.',
        goldTitle: 'Brute Forcer',
        lastDescription: 'Missed 5000 Pokémon total.',
        lastTitle: 'Perseverer',
        platinumTitle: 'Hard Guesser',
        silverTitle: 'Almost There',
      },
    },
  });

  return createAchievement({
    category: 'counters',
    getValue: () => statsState.totalMisses,
    id: 'misses',
    get lastDescription() {
      return t('lastDescription');
    },
    get lastTitle() {
      return t('lastTitle');
    },
    priority: 10,
    thresholds: [
      {
        get description() {
          return t('description', { n: 100 });
        },
        get nextTitle() {
          return t('bronzeTitle');
        },
        rank: 'bronze',
        val: 100,
      },
      {
        get description() {
          return t('description', { n: 500 });
        },
        get nextTitle() {
          return t('silverTitle');
        },
        rank: 'silver',
        val: 500,
      },
      {
        get description() {
          return t('description', { n: 1000 });
        },
        get nextTitle() {
          return t('goldTitle');
        },
        rank: 'gold',
        val: 1000,
      },
      {
        get description() {
          return t('description', { n: 5000 });
        },
        get nextTitle() {
          return t('platinumTitle');
        },
        rank: 'platinum',
        val: 5000,
      },
    ],
  });
};
