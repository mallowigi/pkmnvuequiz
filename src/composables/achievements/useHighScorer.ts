import { useI18n } from 'vue-i18n';

import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useHighScorer = () => {
  const { getHighScore } = useProfile();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '高分玩家',
        description: '获得 {n} 分。',
        goldTitle: '高分专家',
        lastDescription: '获得了超过 5000 分。',
        lastTitle: '高分教授',
        platinumTitle: '高分大师',
        silverTitle: '高分爱好者',
      },
      de: {
        bronzeTitle: 'Punktesammler',
        description: 'Erreiche {n} Punkte.',
        goldTitle: 'Punkte-Experte',
        lastDescription: 'Mehr als 5000 Punkte erreicht.',
        lastTitle: 'Punkte-Professor',
        platinumTitle: 'Punkte-Meister',
        silverTitle: 'Punkte-Fan',
      },
      en: {
        bronzeTitle: 'High Scorer',
        description: 'Attain a score of {n} points.',
        goldTitle: 'Score Expert',
        lastDescription: 'Attained a score of more than 5000 points.',
        lastTitle: 'Score Professor',
        platinumTitle: 'Score Master',
        silverTitle: 'Score Aficionado',
      },
      es: {
        bronzeTitle: 'Alta puntuación',
        description: 'Alcanza {n} puntos.',
        goldTitle: 'Experto en puntos',
        lastDescription: 'Más de 5000 puntos alcanzados.',
        lastTitle: 'Profesor de puntos',
        platinumTitle: 'Maestro de puntos',
        silverTitle: 'Aficionado de puntos',
      },
      fr: {
        bronzeTitle: 'Haut score',
        description: 'Atteignez {n} points.',
        goldTitle: 'Expert en points',
        lastDescription: 'Plus de 5000 points atteints.',
        lastTitle: 'Professeur de points',
        platinumTitle: 'Maître de points',
        silverTitle: 'Connaisseur de points',
      },
      it: {
        bronzeTitle: 'Alto punteggio',
        description: 'Raggiungi {n} punti.',
        goldTitle: 'Esperto in punti',
        lastDescription: 'Più di 5000 punti raggiunti.',
        lastTitle: 'Professore di punti',
        platinumTitle: 'Maestro di punti',
        silverTitle: 'Appassionato di punti',
      },
      jp: {
        bronzeTitle: 'ハイスコア',
        description: '{n}ポイントを獲得。',
        goldTitle: 'スコアエキスパート',
        lastDescription: '5000ポイント以上を獲得。',
        lastTitle: 'スコア博士',
        platinumTitle: 'スコアマスター',
        silverTitle: 'スコア愛好家',
      },
      ko: {
        bronzeTitle: '하이 스코어',
        description: '{n}점을 획득하세요.',
        goldTitle: '스코어 전문가',
        lastDescription: '5000점 이상을 획득.',
        lastTitle: '스코어 박사',
        platinumTitle: '스코어 마스터',
        silverTitle: '스코어 애호가',
      },
      pt: {
        bronzeTitle: 'Alta pontuação',
        description: 'Alcance {n} pontos.',
        goldTitle: 'Especialista em pontos',
        lastDescription: 'Mais de 5000 pontos alcançados.',
        lastTitle: 'Professor de pontos',
        platinumTitle: 'Mestre de pontos',
        silverTitle: 'Aficionado de pontos',
      },
      ru: {
        bronzeTitle: 'Высокий счет',
        description: 'Наберите {n} очков.',
        goldTitle: 'Эксперт по очкам',
        lastDescription: 'Набрано более 5000 очков.',
        lastTitle: 'Профессор по очкам',
        platinumTitle: 'Мастер по очкам',
        silverTitle: 'Знаток по очкам',
      },
      zh: {
        bronzeTitle: '高分玩家',
        description: '獲得 {n} 分。',
        goldTitle: '高分專家',
        lastDescription: '獲得了超過 5000 分。',
        lastTitle: '高分教授',
        platinumTitle: '高分大師',
        silverTitle: '高分愛好者',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'misc',
    getValue: getHighScore,
    id: 'highScorer',
    get lastDescription() {
      return t('lastDescription');
    },
    get lastTitle() {
      return t('lastTitle');
    },
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
