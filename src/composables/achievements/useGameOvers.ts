// Global game overs counter achievement
import { useI18n } from 'vue-i18n';

import { useGlobalStats } from '@/stores/useGlobalStats.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useGameOvers = () => {
  const { statsState } = useGlobalStats();
  const { t } = useI18n({
    messages: {
      en: {
        bronzeTitle: 'Novice',
        description: 'Give up or reveal all shadows {n} times.',
        goldTitle: 'Quitter',
        lastDescription: 'Gave up or revealed all shadows 500 times.',
        lastTitle: 'Empty Head',
        platinumTitle: 'Simpleton',
        silverTitle: 'Beginner',
      },
    },
  });

  return createAchievement({
    category: 'counters',
    getValue: () => statsState.totalGameOvers,
    id: 'gameOvers',
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
          return t('description', { n: 50 });
        },
        get nextTitle() {
          return t('bronzeTitle');
        },
        rank: 'bronze',
        val: 50,
      },
      {
        get description() {
          return t('description', { n: 100 });
        },
        get nextTitle() {
          return t('silverTitle');
        },
        rank: 'silver',
        val: 100,
      },
      {
        get description() {
          return t('description', { n: 200 });
        },
        get nextTitle() {
          return t('goldTitle');
        },
        rank: 'gold',
        val: 200,
      },
      {
        get description() {
          return t('description', { n: 500 });
        },
        get nextTitle() {
          return t('platinumTitle');
        },
        rank: 'platinum',
        val: 500,
      },
    ],
  });
};
