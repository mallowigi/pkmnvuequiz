import { useI18n } from 'vue-i18n';

import { useGlobalStats } from '@/stores/useGlobalStats.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useGlobalShadows = () => {
  const { statsState } = useGlobalStats();
  const { t } = useI18n({
    messages: {
      en: {
        bronzeTitle: 'Shadow Summoner',
        description: 'Summon {n} shadows total.',
        goldTitle: 'Shadow Master',
        lastDescription: 'Summoned 1000 shadows total.',
        lastTitle: 'Shadow God',
        platinumTitle: 'Shadow Expert',
        silverTitle: 'Shadow Apprentice',
      },
    },
  });

  return createAchievement({
    category: 'counters',
    getValue: () => statsState.totalShadows,
    id: 'globalShadows',
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
          return t('description', { n: 200 });
        },
        get nextTitle() {
          return t('silverTitle');
        },
        rank: 'silver',
        val: 200,
      },
      {
        get description() {
          return t('description', { n: 500 });
        },
        get nextTitle() {
          return t('goldTitle');
        },
        rank: 'gold',
        val: 500,
      },
      {
        get description() {
          return t('description', { n: 1000 });
        },
        get nextTitle() {
          return t('platinumTitle');
        },
        rank: 'platinum',
        val: 1000,
      },
    ],
  });
};
