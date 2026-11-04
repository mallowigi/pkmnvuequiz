import { useI18n } from 'vue-i18n';

import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useChallengeWins = () => {
  const { getChallengeWins } = useProfile();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '挑战者',
        description: '在挑战模式下完成 {n} 场比赛。',
        goldTitle: '挑战专家',
        lastDescription: '在挑战模式下完成了超过 500 场比赛。',
        lastTitle: 'Nuzlocker',
        platinumTitle: '挑战大师',
        silverTitle: '挑战爱好者',
      },
      de: {
        bronzeTitle: 'Herausforderer',
        description: 'Gewinne {n} Spiele im Challenge-Modus.',
        goldTitle: 'Challenge-Experte',
        lastDescription: 'Mehr als 500 Spiele im Challenge-Modus gewonnen.',
        lastTitle: 'Nuzlocker',
        platinumTitle: 'Challenge-Meister',
        silverTitle: 'Challenge-Fan',
      },
      en: {
        bronzeTitle: 'Challenger',
        description: 'Win {n} games in Challenge mode.',
        goldTitle: 'Challenge Expert',
        lastDescription: 'Won more than 500 games in Challenge mode.',
        lastTitle: 'Nuzlocker',
        platinumTitle: 'Challenge Master',
        silverTitle: 'Challenge Enthusiast',
      },
      es: {
        bronzeTitle: 'Desafiante',
        description: 'Gana {n} partidas en modo Desafío.',
        goldTitle: 'Experto en desafíos',
        lastDescription: 'Más de 500 partidas ganadas en modo Desafío.',
        lastTitle: 'Nuzlocker',
        platinumTitle: 'Maestro de desafíos',
        silverTitle: 'Entusiasta de desafíos',
      },
      fr: {
        bronzeTitle: 'Défiant',
        description: 'Remportez {n} parties en mode Défi.',
        goldTitle: 'Expert en défis',
        lastDescription: 'Plus de 500 parties remportées en mode Défi.',
        lastTitle: 'Nuzlocker',
        platinumTitle: 'Maître des défis',
        silverTitle: 'Passionné de défis',
      },
      it: {
        bronzeTitle: 'Sfidante',
        description: 'Vinci {n} partite in modalità Sfida.',
        goldTitle: 'Esperto di sfide',
        lastDescription: 'Più di 500 partite vinte in modalità Sfida.',
        lastTitle: 'Nuzlocker',
        platinumTitle: 'Maestro delle sfide',
        silverTitle: 'Appassionato di sfide',
      },
      jp: {
        bronzeTitle: '挑戦者',
        description: 'チャレンジモードで{n}回勝利する。',
        goldTitle: 'チャレンジエキスパート',
        lastDescription: 'チャレンジモードで500回以上勝利。',
        lastTitle: 'ヌズロッカー',
        platinumTitle: 'チャレンジャーマスター',
        silverTitle: 'チャレンジ愛好家',
      },
      ko: {
        bronzeTitle: '도전자',
        description: '챌린지 모드에서 {n}번 승리하세요.',
        goldTitle: '챌린지 전문가',
        lastDescription: '챌린지 모드에서 500번 넘게 승리.',
        lastTitle: '누즈록커',
        platinumTitle: '챌린지 마스터',
        silverTitle: '챌린지 애호가',
      },
      pt: {
        bronzeTitle: 'Desafiante',
        description: 'Ganhe {n} partidas no modo Desafio.',
        goldTitle: 'Especialista em desafios',
        lastDescription: 'Mais de 500 partidas ganhas no modo Desafio.',
        lastTitle: 'Nuzlocker',
        platinumTitle: 'Mestre dos desafios',
        silverTitle: 'Entusiasta de desafios',
      },
      ru: {
        bronzeTitle: 'Вызывающий',
        description: 'Выиграйте {n} игр в режиме Испытания.',
        goldTitle: 'Эксперт по испытаниям',
        lastDescription: 'Выиграно более 500 игр в режиме Испытания.',
        lastTitle: 'Nuzlocker',
        platinumTitle: 'Мастер испытаний',
        silverTitle: 'Энтузиаст испытаний',
      },
      zh: {
        bronzeTitle: '挑戰者',
        description: '在挑戰模式下完成 {n} 場比賽。',
        goldTitle: '挑戰專家',
        lastDescription: '在挑戰模式下完成了超過 500 場比賽。',
        lastTitle: 'Nuzlocker',
        platinumTitle: '挑戰大師',
        silverTitle: '挑戰愛好者',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'total',
    getValue: getChallengeWins,
    id: 'challengeWins',
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
