// Global misses counter achievement
import { useI18n } from 'vue-i18n';

import { useGlobalStats } from '@/stores/useGlobalStats.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useMisses = () => {
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '误称者',
        description: '总共错过 {n} 只宝可梦。',
        goldTitle: '暴力破解者',
        lastDescription: '总共错过了 5000 只宝可梦。',
        lastTitle: '坚持不懈者',
        platinumTitle: '艰难猜测者',
        silverTitle: '差一点',
      },
      de: {
        bronzeTitle: 'Falschbenenner',
        description: 'Verpasse insgesamt {n} Pokémon.',
        goldTitle: 'Brute-Forcer',
        lastDescription: 'Insgesamt 5000 Pokémon verpasst.',
        lastTitle: 'Ausdauernder',
        platinumTitle: 'Harter Rater',
        silverTitle: 'Fast geschafft',
      },
      en: {
        bronzeTitle: 'Misnomer',
        description: 'Miss {n} Pokémon total.',
        goldTitle: 'Brute Forcer',
        lastDescription: 'Missed 5000 Pokémon total.',
        lastTitle: 'Perseverer',
        platinumTitle: 'Hard Guesser',
        silverTitle: 'Almost There',
      },
      es: {
        bronzeTitle: 'Confundido',
        description: 'Falla {n} Pokémon en total.',
        goldTitle: 'Fuerza bruta',
        lastDescription: 'Falló 5000 Pokémon en total.',
        lastTitle: 'Perseverante',
        platinumTitle: 'Adivino difícil',
        silverTitle: 'Casi allí',
      },
      fr: {
        bronzeTitle: 'Mauvais nom',
        description: 'Manquez {n} Pokémon au total.',
        goldTitle: 'Force brute',
        lastDescription: 'Manqué 5000 Pokémon au total.',
        lastTitle: 'Persévérant',
        platinumTitle: 'Devineur difficile',
        silverTitle: 'Presque là',
      },
      it: {
        bronzeTitle: 'Confuso',
        description: 'Manca {n} Pokémon in totale.',
        goldTitle: 'Forza bruta',
        lastDescription: 'Mancato 5000 Pokémon in totale.',
        lastTitle: 'Perseverante',
        platinumTitle: 'Indovino difficile',
        silverTitle: 'Quasi lì',
      },
      jp: {
        bronzeTitle: '誤称者',
        description: '合計{n}匹のポケモンを見逃す。',
        goldTitle: 'ブルートフォサー',
        lastDescription: '合計5000匹のポケモンを見逃した。',
        lastTitle: '不屈の戦士',
        platinumTitle: '不屈の挑戦者',
        silverTitle: 'あと一歩',
      },
      ko: {
        bronzeTitle: '잘못된 이름',
        description: '총 {n}마리의 포켓몬을 놓치세요.',
        goldTitle: '마구잡이 탐색가',
        lastDescription: '총 5000마리의 포켓몬을 놓쳤습니다.',
        lastTitle: '인내심 있는 사람',
        platinumTitle: '집념의 추측가',
        silverTitle: '거의 성공',
      },
      pt: {
        bronzeTitle: 'Confuso',
        description: 'Erre {n} Pokémon no total.',
        goldTitle: 'Força bruta',
        lastDescription: 'Errou 5000 Pokémon no total.',
        lastTitle: 'Perseverante',
        platinumTitle: 'Adivinhador difícil',
        silverTitle: 'Quase lá',
      },
      ru: {
        bronzeTitle: 'Неправильное имя',
        description: 'Пропустите {n} Покемонов.',
        goldTitle: 'Штурмовик',
        lastDescription: 'Пропущено 5000 Покемонов.',
        lastTitle: 'Настойчивый',
        platinumTitle: 'Упорный игрок',
        silverTitle: 'Почти получилось',
      },
      zh: {
        bronzeTitle: '誤稱者',
        description: '總共錯過 {n} 隻寶可夢。',
        goldTitle: '暴力破解者',
        lastDescription: '總共錯過了 5000 隻寶可夢。',
        lastTitle: '堅持不懈者',
        platinumTitle: '艱難猜測者',
        silverTitle: '差一點',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'counters',
    getValue: () => {
      const { statsState } = useGlobalStats();
      return statsState.totalMisses;
    },
    id: 'misses',
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
          return t('description', { n: 500 });
        },
        get nextTitle() {
          return t('silverTitle');
        },
        rank: 'silver',
        val: 500,
      },
      {
        get description() {
          return t('description', { n: 1000 });
        },
        get nextTitle() {
          return t('goldTitle');
        },
        rank: 'gold',
        val: 1000,
      },
      {
        get description() {
          return t('description', { n: 5000 });
        },
        get nextTitle() {
          return t('platinumTitle');
        },
        rank: 'platinum',
        val: 5000,
      },
    ],
  });
};
