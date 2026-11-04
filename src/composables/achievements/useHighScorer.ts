import { useI18n } from 'vue-i18n';

import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useHighScorer = () => {
  const { getHighScore } = useProfile();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '游戏玩家',
        description: '获得 {n} 分。',
        goldTitle: '资深玩家',
        lastDescription: '获得了超过 5000 分。',
        lastTitle: '活着的传奇',
        platinumTitle: '游戏大师',
        silverTitle: '熟练玩家',
      },
      de: {
        bronzeTitle: 'Gamer',
        description: 'Erreiche {n} Punkte.',
        goldTitle: 'Erfahrener Gamer',
        lastDescription: 'Mehr als 5000 Punkte erreicht.',
        lastTitle: 'Lebende Legende',
        platinumTitle: 'Meister-Gamer',
        silverTitle: 'Versierter Gamer',
      },
      en: {
        bronzeTitle: 'Gamer',
        description: 'Attain a score of {n} points.',
        goldTitle: 'Veteran Gamer',
        lastDescription: 'Attained a score of more than 5000 points.',
        lastTitle: 'Living Legend',
        platinumTitle: 'Master Gamer',
        silverTitle: 'Skilled Gamer',
      },
      es: {
        bronzeTitle: 'Jugador',
        description: 'Alcanza {n} puntos.',
        goldTitle: 'Jugador veterano',
        lastDescription: 'Más de 5000 puntos alcanzados.',
        lastTitle: 'Leyenda viva',
        platinumTitle: 'Maestro gamer',
        silverTitle: 'Jugador hábil',
      },
      fr: {
        bronzeTitle: 'Joueur',
        description: 'Atteignez {n} points.',
        goldTitle: 'Joueur vétéran',
        lastDescription: 'Plus de 5000 points atteints.',
        lastTitle: 'Légende vivante',
        platinumTitle: 'Maître gamer',
        silverTitle: 'Joueur chevronné',
      },
      it: {
        bronzeTitle: 'Giocatore',
        description: 'Raggiungi {n} punti.',
        goldTitle: 'Giocatore veterano',
        lastDescription: 'Più di 5000 punti raggiunti.',
        lastTitle: 'Leggenda vivente',
        platinumTitle: 'Maestro dei videogiochi',
        silverTitle: 'Giocatore esperto',
      },
      jp: {
        bronzeTitle: 'ゲームプレイヤー',
        description: '{n}ポイントを獲得。',
        goldTitle: 'ベテランプレイヤー',
        lastDescription: '5000ポイント以上を獲得。',
        lastTitle: '生ける伝説',
        platinumTitle: 'ゲームの達人',
        silverTitle: '熟練プレイヤー',
      },
      ko: {
        bronzeTitle: '게이머',
        description: '{n}점을 획득하세요.',
        goldTitle: '베테랑 게이머',
        lastDescription: '5000점 이상을 획득.',
        lastTitle: '살아있는 전설',
        platinumTitle: '마스터 게이머',
        silverTitle: '숙련된 게이머',
      },
      pt: {
        bronzeTitle: 'Jogador',
        description: 'Alcance {n} pontos.',
        goldTitle: 'Jogador veterano',
        lastDescription: 'Mais de 5000 pontos alcançados.',
        lastTitle: 'Lenda viva',
        platinumTitle: 'Mestre dos jogos',
        silverTitle: 'Jogador habilidoso',
      },
      ru: {
        bronzeTitle: 'Игрок',
        description: 'Наберите {n} очков.',
        goldTitle: 'Опытный игрок',
        lastDescription: 'Набрано более 5000 очков.',
        lastTitle: 'Живая легенда',
        platinumTitle: 'Мастер игры',
        silverTitle: 'Умелый игрок',
      },
      zh: {
        bronzeTitle: '遊戲玩家',
        description: '獲得 {n} 分。',
        goldTitle: '資深玩家',
        lastDescription: '獲得了超過 5000 分。',
        lastTitle: '活著的傳奇',
        platinumTitle: '遊戲大師',
        silverTitle: '熟練玩家',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'total',
    getValue: getHighScore,
    id: 'highScore',
    get lastDescription() {
      return t('lastDescription');
    },
    get lastTitle() {
      return t('lastTitle');
    },
    priority: 5,
    thresholds: [
      {
        get description() {
          return t('description', { n: 500 });
        },
        get nextTitle() {
          return t('bronzeTitle');
        },
        rank: 'bronze',
        val: 500,
      },
      {
        get description() {
          return t('description', { n: 1000 });
        },
        get nextTitle() {
          return t('silverTitle');
        },
        rank: 'silver',
        val: 1000,
      },
      {
        get description() {
          return t('description', { n: 3000 });
        },
        get nextTitle() {
          return t('goldTitle');
        },
        rank: 'gold',
        val: 3000,
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
