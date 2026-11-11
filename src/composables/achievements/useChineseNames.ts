import { useI18n } from 'vue-i18n';

import { useGlobalStats } from '@/stores/useGlobalStats.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useChineseNames = () => {
  const { t } = useI18n({
    messages: {
      cn: {
        description: '输入一个中文的宝可梦名字。',
        title: '全部收服！',
      },
      de: {
        description: 'Gib einen Pokémon-Namen auf Chinesisch ein.',
        title: '全部收服！',
      },
      en: {
        description: 'Enter a Pokémon name in Chinese.',
        title: '全部收服！',
      },
      es: {
        description: 'Introduce un nombre de Pokémon en chino.',
        title: '全部收服！',
      },
      fr: {
        description: 'Saisissez un nom de Pokémon en chinois.',
        title: '全部收服！',
      },
      it: {
        description: 'Inserisci un nome di Pokémon in cinese.',
        title: '全部收服！',
      },
      jp: {
        description: '中国語でポケモンの名前を入力する。',
        title: '全部收服！',
      },
      ko: {
        description: '중국어로 포켓몬 이름을 입력하세요.',
        title: '全部收服！',
      },
      pt: {
        description: 'Digite um nome de Pokémon em chinês.',
        title: '全部收服！',
      },
      ru: {
        description: 'Введите имя покемона на китайском.',
        title: '全部收服！',
      },
      zh: {
        description: '輸入一個中文的寶可夢名字。',
        title: '全部收服！',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'misc',
    getValue: () => {
      const { statsState } = useGlobalStats();
      return statsState.chineseNames;
    },
    id: 'chineseNames',
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
