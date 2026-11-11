import { useI18n } from 'vue-i18n';

import { useGlobalStats } from '@/stores/useGlobalStats.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useKoreanNames = () => {
  const { t } = useI18n({
    messages: {
      cn: {
        description: '输入一个韩语的宝可梦名字。',
        title: '다 잡자!',
      },
      de: {
        description: 'Gib einen Pokémon-Namen auf Koreanisch ein.',
        title: '다 잡자!',
      },
      en: {
        description: 'Enter a Pokémon name in Korean.',
        title: '다 잡자!',
      },
      es: {
        description: 'Introduce un nombre de Pokémon en coreano.',
        title: '다 잡자!',
      },
      fr: {
        description: 'Saisissez un nom de Pokémon en coréen.',
        title: '다 잡자!',
      },
      it: {
        description: 'Inserisci un nome di Pokémon in coreano.',
        title: '다 잡자!',
      },
      jp: {
        description: '韓国語でポケモンの名前を入力する。',
        title: '다 잡자!',
      },
      ko: {
        description: '한국어로 포켓몬 이름을 입력하세요.',
        title: '다 잡자!',
      },
      pt: {
        description: 'Digite um nome de Pokémon em coreano.',
        title: '다 잡자!',
      },
      ru: {
        description: 'Введите имя покемона на корейском.',
        title: '다 잡자!',
      },
      zh: {
        description: '輸入一個韓語的寶可夢名字。',
        title: '다 잡자!',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'misc',
    getValue: () => {
      const { statsState } = useGlobalStats();
      return statsState.koreanNames;
    },
    id: 'koreanNames',
    get lastDescription() {
      return t('description');
    },
    get lastTitle() {
      return t('title');
    },
    priority: 30,
    thresholds: [
      {
        get description() {
          return t('description');
        },
        get nextTitle() {
          return t('title');
        },
        rank: 'platinum',
        val: 1,
      },
    ],
  });
};
