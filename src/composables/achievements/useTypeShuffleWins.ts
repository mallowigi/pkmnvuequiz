import { useI18n } from 'vue-i18n';

import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useTypeShuffleWins = () => {
  const { getTypeShuffleWins } = useProfile();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '类型尝试者',
        description: '在类型随机模式下完成 {n} 场比赛。',
        goldTitle: '类型专家',
        lastDescription: '在类型随机模式下完成了超过 500 场比赛。',
        lastTitle: '类型洗牌者',
        platinumTitle: '类型大师',
        silverTitle: '类型爱好者',
      },
      de: {
        bronzeTitle: 'Typ-Experimentator',
        description: 'Gewinne {n} Spiele im Typ-Shuffle-Modus.',
        goldTitle: 'Typ-Experte',
        lastDescription: 'Mehr als 500 Spiele im Typ-Shuffle-Modus gewonnen.',
        lastTitle: 'Typ-Shuffler',
        platinumTitle: 'Typ-Meister',
        silverTitle: 'Typ-Fan',
      },
      en: {
        bronzeTitle: 'Type Tryout',
        description: 'Win {n} games in Type Shuffle mode.',
        goldTitle: 'Type Expert',
        lastDescription: 'Won more than 500 games in Type Shuffle mode.',
        lastTitle: 'Type Shuffler',
        platinumTitle: 'Type Master',
        silverTitle: 'Type Enthusiast',
      },
      es: {
        bronzeTitle: 'Probador de tipos',
        description: 'Gana {n} partidas en modo Tipo Aleatorio.',
        goldTitle: 'Experto en tipos',
        lastDescription: 'Más de 500 partidas ganadas en modo Tipo Aleatorio.',
        lastTitle: 'Mezclador de tipos',
        platinumTitle: 'Maestro de tipos',
        silverTitle: 'Entusiasta de tipos',
      },
      fr: {
        bronzeTitle: 'Essayeur de types',
        description: 'Remportez {n} parties en mode Type Aléatoire.',
        goldTitle: 'Expert en types',
        lastDescription: 'Plus de 500 parties remportées en mode Type Aléatoire.',
        lastTitle: 'Mélangeur de types',
        platinumTitle: 'Maître des types',
        silverTitle: 'Passionné de types',
      },
      it: {
        bronzeTitle: 'Provatore di tipi',
        description: 'Vinci {n} partite in modalità Tipo Casuale.',
        goldTitle: 'Esperto di tipi',
        lastDescription: 'Più di 500 partite vinte in modalità Tipo Casuale.',
        lastTitle: 'Mescolatore di tipi',
        platinumTitle: 'Maestro dei tipi',
        silverTitle: 'Appassionato di tipi',
      },
      jp: {
        bronzeTitle: 'タイプ挑戦者',
        description: 'タイプシャッフルモードで{n}回勝利する。',
        goldTitle: 'タイプエキスパート',
        lastDescription: 'タイプシャッフルモードで500回以上勝利。',
        lastTitle: 'タイプシャッフルer',
        platinumTitle: 'タイプマスター',
        silverTitle: 'タイプ愛好家',
      },
      ko: {
        bronzeTitle: '타입 도전자',
        description: '타입 셔플 모드에서 {n}번 승리하세요.',
        goldTitle: '타입 전문가',
        lastDescription: '타입 셔플 모드에서 500번 넘게 승리.',
        lastTitle: '타입 셔플러',
        platinumTitle: '타입 마스터',
        silverTitle: '타입 애호가',
      },
      pt: {
        bronzeTitle: 'Experimentador de tipos',
        description: 'Ganhe {n} partidas no modo Tipo Aleatório.',
        goldTitle: 'Especialista em tipos',
        lastDescription: 'Mais de 500 partidas ganhas no modo Tipo Aleatório.',
        lastTitle: 'Misturador de tipos',
        platinumTitle: 'Mestre dos tipos',
        silverTitle: 'Entusiasta de tipos',
      },
      ru: {
        bronzeTitle: 'Исследователь типов',
        description: 'Выиграйте {n} игр в режиме Перемешивания типов.',
        goldTitle: 'Эксперт по типам',
        lastDescription: 'Выиграно более 500 игр в режиме Перемешивания типов.',
        lastTitle: 'Перемешиватель типов',
        platinumTitle: 'Мастер типов',
        silverTitle: 'Энтузиаст типов',
      },
      zh: {
        bronzeTitle: '類型嘗試者',
        description: '在類型隨機模式下完成 {n} 場比賽。',
        goldTitle: '類型專家',
        lastDescription: '在類型隨機模式下完成了超過 500 場比賽。',
        lastTitle: '類型洗牌者',
        platinumTitle: '類型大師',
        silverTitle: '類型愛好者',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'total',
    getValue: getTypeShuffleWins,
    id: 'typeShuffleWins',
    get lastDescription() {
      return t('lastDescription');
    },
    get lastTitle() {
      return t('lastTitle');
    },
    thresholds: [
      {
        get description() {
          return t('description', { n: 10 });
        },
        get nextTitle() {
          return t('bronzeTitle');
        },
        rank: 'bronze',
        val: 10,
      },
      {
        get description() {
          return t('description', { n: 50 });
        },
        get nextTitle() {
          return t('silverTitle');
        },
        rank: 'silver',
        val: 50,
      },
      {
        get description() {
          return t('description', { n: 100 });
        },
        get nextTitle() {
          return t('goldTitle');
        },
        rank: 'gold',
        val: 100,
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
