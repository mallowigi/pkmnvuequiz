import { useI18n } from 'vue-i18n';

import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useFirstShiny = () => {
  const { getShinyCount } = useProfile();
  const { t } = useI18n({
    messages: {
      cn: {
        lastDescription: '找到第一只闪光。',
        lastTitle: '首次闪光',
      },
      de: {
        lastDescription: 'Erstes Shiny gefunden.',
        lastTitle: 'Erstes Shiny',
      },
      en: {
        lastDescription: 'Found your first shiny.',
        lastTitle: 'First Shiny',
      },
      es: {
        lastDescription: 'Primer shiny encontrado.',
        lastTitle: 'Primer shiny',
      },
      fr: {
        lastDescription: 'Premier shiny trouvé.',
        lastTitle: 'Premier shiny',
      },
      it: {
        lastDescription: 'Primo shiny trovato.',
        lastTitle: 'Primo shiny',
      },
      jp: {
        lastDescription: '最初のひかるポケモンを発見。',
        lastTitle: '最初のひかるポケモン',
      },
      ko: {
        lastDescription: '첫 번째 빛나는 포켓몬 발견.',
        lastTitle: '첫 번째 빛나는 포켓몬',
      },
      pt: {
        lastDescription: 'Primeiro shiny encontrado.',
        lastTitle: 'Primeiro shiny',
      },
      ru: {
        lastDescription: 'Найден первый шайни.',
        lastTitle: 'Первый шайни',
      },
      zh: {
        lastDescription: '找到第一隻閃光。',
        lastTitle: '首次閃光',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'misc',
    getValue: getShinyCount,
    id: 'firstShiny',
    get lastDescription() {
      return t('lastDescription');
    },
    get lastTitle() {
      return t('lastTitle');
    },
    thresholds: [
      {
        get description() {
          return t('lastDescription');
        },
        get nextTitle() {
          return t('lastTitle');
        },
        rank: 'platinum',
        val: 1,
      },
    ],
  });
};
