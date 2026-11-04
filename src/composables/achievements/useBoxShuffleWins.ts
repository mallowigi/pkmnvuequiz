import { useI18n } from 'vue-i18n';

import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useBoxShuffleWins = () => {
  const { getBoxShuffleWins } = useProfile();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '箱子尝试者',
        description: '在箱子随机模式下赢得 {n} 场比赛。',
        goldTitle: '箱子专家',
        lastDescription: '在箱子随机模式下赢得了超过 500 场比赛。',
        lastTitle: '箱子洗牌者',
        platinumTitle: '箱子大师',
        silverTitle: '箱子爱好者',
      },
      de: {
        bronzeTitle: 'Box-Experimentator',
        description: 'Gewinne {n} Spiele im Box-Shuffle-Modus.',
        goldTitle: 'Box-Experte',
        lastDescription: 'Mehr als 500 Spiele im Box-Shuffle-Modus gewonnen.',
        lastTitle: 'Box-Shuffler',
        platinumTitle: 'Box-Meister',
        silverTitle: 'Box-Fan',
      },
      en: {
        bronzeTitle: 'Box Tryout',
        description: 'Win {n} games in Box Shuffle mode.',
        goldTitle: 'Box Expert',
        lastDescription: 'Won more than 500 games in Box Shuffle mode.',
        lastTitle: 'Box Shuffler',
        platinumTitle: 'Box Master',
        silverTitle: 'Box Enthusiast',
      },
      es: {
        bronzeTitle: 'Probador de cajas',
        description: 'Gana {n} partidas en modo Caja Aleatoria.',
        goldTitle: 'Experto en cajas',
        lastDescription: 'Más de 500 partidas ganadas en modo Caja Aleatoria.',
        lastTitle: 'Mezclador de cajas',
        platinumTitle: 'Maestro de cajas',
        silverTitle: 'Entusiasta de cajas',
      },
      fr: {
        bronzeTitle: 'Essayeur de boîtes',
        description: 'Remportez {n} parties en mode Boîte Aléatoire.',
        goldTitle: 'Expert en boîtes',
        lastDescription: 'Plus de 500 parties remportées en mode Boîte Aléatoire.',
        lastTitle: 'Mélangeur de boîtes',
        platinumTitle: 'Maître des boîtes',
        silverTitle: 'Passionné de boîtes',
      },
      it: {
        bronzeTitle: 'Provatore di scatole',
        description: 'Vinci {n} partite in modalità Scatola Casuale.',
        goldTitle: 'Esperto di scatole',
        lastDescription: 'Più di 500 partite vinte in modalità Scatola Casuale.',
        lastTitle: 'Mescolatore di scatole',
        platinumTitle: 'Maestro delle scatole',
        silverTitle: 'Appassionato di scatole',
      },
      jp: {
        bronzeTitle: 'ボックス挑戦者',
        description: 'ボックスシャッフルモードで{n}回勝利する。',
        goldTitle: 'ボックスエキスパート',
        lastDescription: 'ボックスシャッフルモードで500回以上勝利。',
        lastTitle: 'ボックスシャッフラー',
        platinumTitle: 'ボックスマスター',
        silverTitle: 'ボックス愛好家',
      },
      ko: {
        bronzeTitle: '박스 도전자',
        description: '박스 셔플 모드에서 {n}번 승리하세요.',
        goldTitle: '박스 전문가',
        lastDescription: '박스 셔플 모드에서 500번 넘게 승리.',
        lastTitle: '박스 셔플러',
        platinumTitle: '박스 마스터',
        silverTitle: '박스 애호가',
      },
      pt: {
        bronzeTitle: 'Experimentador de caixas',
        description: 'Ganhe {n} partidas no modo Caixa Aleatório.',
        goldTitle: 'Especialista em caixas',
        lastDescription: 'Mais de 500 partidas ganhas no modo Caixa Aleatório.',
        lastTitle: 'Misturador de caixas',
        platinumTitle: 'Mestre das caixas',
        silverTitle: 'Entusiasta de caixas',
      },
      ru: {
        bronzeTitle: 'Исследователь ящиков',
        description: 'Выиграйте {n} игр в режиме Перемешивания ящиков.',
        goldTitle: 'Эксперт по ящикам',
        lastDescription: 'Выиграно более 500 игр в режиме Перемешивания ящиков.',
        lastTitle: 'Перемешиватель ящиков',
        platinumTitle: 'Мастер ящиков',
        silverTitle: 'Энтузиаст ящиков',
      },
      zh: {
        bronzeTitle: '箱子嘗試者',
        description: '在箱子隨機模式下贏得 {n} 場比賽。',
        goldTitle: '箱子專家',
        lastDescription: '在箱子隨機模式下贏得了超過 500 場比賽。',
        lastTitle: '箱子洗牌者',
        platinumTitle: '箱子大師',
        silverTitle: '箱子愛好者',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'total',
    getValue: getBoxShuffleWins,
    id: 'boxShuffleWins',
    get lastDescription() {
      return t('lastDescription');
    },
    get lastTitle() {
      return t('lastTitle');
    },
    priority: 20,
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
