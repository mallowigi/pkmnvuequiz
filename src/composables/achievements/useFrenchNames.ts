import { useI18n } from 'vue-i18n';

import { useGlobalStats } from '@/stores/useGlobalStats.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useFrenchNames = () => {
  const { t } = useI18n({
    messages: {
      cn: {
        description: '输入一个法语的宝可梦名字。',
        title: 'Attrapez les tous',
      },
      de: {
        description: 'Gib einen Pokémon-Namen auf Französisch ein.',
        title: 'Attrapez les tous',
      },
      en: {
        description: 'Enter a Pokémon name in French.',
        title: 'Attrapez les tous',
      },
      es: {
        description: 'Introduce un nombre de Pokémon en francés.',
        title: 'Attrapez les tous',
      },
      fr: {
        description: 'Saisissez un nom de Pokémon en français.',
        title: 'Attrapez les tous',
      },
      it: {
        description: 'Inserisci un nome di Pokémon in francese.',
        title: 'Attrapez les tous',
      },
      jp: {
        description: 'フランス語でポケモンの名前を入力する。',
        title: 'Attrapez les tous',
      },
      ko: {
        description: '프랑스어로 포켓몬 이름을 입력하세요.',
        title: 'Attrapez les tous',
      },
      pt: {
        description: 'Digite um nome de Pokémon em francês.',
        title: 'Attrapez les tous',
      },
      ru: {
        description: 'Введите имя покемона на французском.',
        title: 'Attrapez les tous',
      },
      zh: {
        description: '輸入一個法語的寶可夢名字。',
        title: 'Attrapez les tous',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'misc',
    getValue: () => {
      const { statsState } = useGlobalStats();
      return statsState.frenchNames;
    },
    id: 'frenchNames',
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
