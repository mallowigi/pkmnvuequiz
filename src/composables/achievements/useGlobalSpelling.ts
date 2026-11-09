// Global spelling counter achievement
import { useI18n } from 'vue-i18n';

import { useGlobalStats } from '@/stores/useGlobalStats.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useGlobalSpelling = () => {
  const { statsState } = useGlobalStats();
  const { t } = useI18n({
    messages: {
      en: {
        bronzeTitle: 'Spell Checker',
        description: 'Use spelling hint {n} times total.',
        goldTitle: 'Grammar Nazi',
        lastDescription: 'Used spelling hint 1000 times total.',
        lastTitle: 'Dyslexic',
        platinumTitle: 'Proofreader',
        silverTitle: 'Spelling Bee',
      },
    },
  });

  return createAchievement({
    category: 'counters',
    getValue: () => statsState.totalInvokedSpelling,
    id: 'globalSpelling',
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
