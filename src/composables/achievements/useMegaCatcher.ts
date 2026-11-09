import { useI18n } from 'vue-i18n';

import { useGlobalStats } from '@/stores/useGlobalStats.ts';
import type { MegaType } from '@/types.ts';
import { createAchievement } from '@/utils/utils.ts';

export function useMegaCatcher(megaType: MegaType) {
  const { statsState } = useGlobalStats();
  const label = megaType === 'mega' ? 'Mega' : 'G-Max';
  const { t } = useI18n({
    messages: {
      en: {
        bronzeTitle: `${label} Novice`,
        description: `Find {n} ${label} Pokémon.`,
        goldTitle: `${label} Specialist`,
        lastDescription: `Found 10000 ${label} Pokémon.`,
        lastTitle: `${label} Master`,
        platinumTitle: `${label} Expert`,
        silverTitle: `${label} Apprentice`,
      },
    },
  });

  return createAchievement({
    category: 'pokemon',
    getValue: () => statsState.pokemonFoundByMegaType[megaType],
    id: `megaCatcher_${megaType}`,
    get lastDescription() {
      return t('lastDescription');
    },
    get lastTitle() {
      return t('lastTitle');
    },
    priority: 5,
    thresholds: [
      {
        get description() {
          return t('description', { n: 500 });
        },
        get nextTitle() {
          return t('bronzeTitle');
        },
        rank: 'bronze',
        val: 500,
      },
      {
        get description() {
          return t('description', { n: 1000 });
        },
        get nextTitle() {
          return t('silverTitle');
        },
        rank: 'silver',
        val: 1000,
      },
      {
        get description() {
          return t('description', { n: 2000 });
        },
        get nextTitle() {
          return t('goldTitle');
        },
        rank: 'gold',
        val: 2000,
      },
      {
        get description() {
          return t('description', { n: 10000 });
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
