import { useI18n } from 'vue-i18n';

import { useGlobalStats } from '@/stores/useGlobalStats.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useJapaneseNames = () => {
  const { t } = useI18n({
    messages: {
      cn: {
        description: '输入一个日语的宝可梦名字。',
        title: 'ポケモンゲットだぜ！',
      },
      de: {
        description: 'Gib einen Pokémon-Namen auf Japanisch ein.',
        title: 'ポケモンゲットだぜ！',
      },
      en: {
        description: 'Enter a Pokémon name in Japanese.',
        title: 'ポケモンゲットだぜ！',
      },
      es: {
        description: 'Introduce un nombre de Pokémon en japonés.',
        title: 'ポケモンゲットだぜ！',
      },
      fr: {
        description: 'Saisissez un nom de Pokémon en japonais.',
        title: 'ポケモンゲットだぜ！',
      },
      it: {
        description: 'Inserisci un nome di Pokémon in giapponese.',
        title: 'ポケモンゲットだぜ！',
      },
      jp: {
        description: '日本語でポケモンの名前を入力する。',
        title: 'ポケモンゲットだぜ！',
      },
      ko: {
        description: '일본어로 포켓몬 이름을 입력하세요.',
        title: 'ポケモンゲットだぜ！',
      },
      pt: {
        description: 'Digite um nome de Pokémon em japonês.',
        title: 'ポケモンゲットだぜ！',
      },
      ru: {
        description: 'Введите имя покемона на японском.',
        title: 'ポケモンゲットだぜ！',
      },
      zh: {
        description: '輸入一個日語的寶可夢名字。',
        title: 'ポケモンゲットだぜ！',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'misc',
    getValue: () => {
      const { statsState } = useGlobalStats();
      return statsState.japaneseNames;
    },
    id: 'japaneseNames',
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
