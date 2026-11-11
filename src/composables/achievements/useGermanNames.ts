import { useI18n } from 'vue-i18n';

import { useGlobalStats } from '@/stores/useGlobalStats.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useGermanNames = () => {
  const { t } = useI18n({
    messages: {
      cn: {
        description: '输入一个德语的宝可梦名字。',
        title: 'Ich bin Pokemeister',
      },
      de: {
        description: 'Gib einen Pokémon-Namen auf Deutsch ein.',
        title: 'Ich bin Pokemeister',
      },
      en: {
        description: 'Enter a Pokémon name in German.',
        title: 'Ich bin Pokemeister',
      },
      es: {
        description: 'Introduce un nombre de Pokémon en alemán.',
        title: 'Ich bin Pokemeister',
      },
      fr: {
        description: 'Saisissez un nom de Pokémon en allemand.',
        title: 'Ich bin Pokemeister',
      },
      it: {
        description: 'Inserisci un nome di Pokémon in tedesco.',
        title: 'Ich bin Pokemeister',
      },
      jp: {
        description: 'ドイツ語でポケモンの名前を入力する。',
        title: 'Ich bin Pokemeister',
      },
      ko: {
        description: '독일어로 포켓몬 이름을 입력하세요.',
        title: 'Ich bin Pokemeister',
      },
      pt: {
        description: 'Digite um nome de Pokémon em alemão.',
        title: 'Ich bin Pokemeister',
      },
      ru: {
        description: 'Введите имя покемона на немецком.',
        title: 'Ich bin Pokemeister',
      },
      zh: {
        description: '輸入一個德語的寶可夢名字。',
        title: 'Ich bin Pokemeister',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'misc',
    getValue: () => {
      const { statsState } = useGlobalStats();
      return statsState.germanNames;
    },
    id: 'germanNames',
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
