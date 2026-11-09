// Combo breaker achievement - tracks max bonus streak
import { useI18n } from 'vue-i18n';

import { useGlobalStats } from '@/stores/useGlobalStats.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useComboBreaker = () => {
  const { statsState } = useGlobalStats();
  const { t } = useI18n({
    messages: {
      en: {
        bronzeTitle: 'Comboist',
        description: 'Earn {n} bonus points in a single streak.',
        goldTitle: 'Combo Breaker',
        lastDescription: 'Earned 500 bonus points in a single streak.',
        lastTitle: 'Ultimate Concentration',
        platinumTitle: 'Serious Streaker',
        silverTitle: 'On Fire',
      },
    },
  });

  return createAchievement({
    category: 'counters',
    getValue: () => statsState.maxComboBonus,
    id: 'comboBreaker',
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
