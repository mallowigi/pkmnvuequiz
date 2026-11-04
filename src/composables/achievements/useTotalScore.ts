import { useI18n } from 'vue-i18n';

import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useTotalScore = () => {
  const { getTotalScore } = useProfile();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '得分手',
        description: '累计得分达到 {n} 分。',
        goldTitle: '高分王',
        lastDescription: '累计得分达到了 1000000 分。',
        lastTitle: '分数大师',
        platinumTitle: '传奇',
        silverTitle: '熟练者',
      },
      de: {
        bronzeTitle: 'Punktesammler',
        description: 'Erreiche insgesamt {n} Punkte.',
        goldTitle: 'Hochpunktespieler',
        lastDescription: 'Insgesamt 1.000.000 Punkte erreicht.',
        lastTitle: 'Punkte-Meister',
        platinumTitle: 'Legende',
        silverTitle: 'Geübt',
      },
      en: {
        bronzeTitle: 'Point Getter',
        description: 'Reach a total score of {n} points.',
        goldTitle: 'High Scorer',
        lastDescription: 'Reached a total score of 1,000,000 points.',
        lastTitle: 'Score Master',
        platinumTitle: 'Legend',
        silverTitle: 'Skilled',
      },
      es: {
        bronzeTitle: 'Anotador',
        description: 'Alcanza un puntaje total de {n} puntos.',
        goldTitle: 'Gran anotador',
        lastDescription: 'Alcanzó un puntaje total de 1.000.000 de puntos.',
        lastTitle: 'Maestro del puntaje',
        platinumTitle: 'Leyenda',
        silverTitle: 'Hábil',
      },
      fr: {
        bronzeTitle: 'Marqueur',
        description: 'Atteignez un score total de {n} points.',
        goldTitle: 'Grand marqueur',
        lastDescription: 'Score total de 1.000.000 points atteint.',
        lastTitle: 'Maître du score',
        platinumTitle: 'Légende',
        silverTitle: 'Habile',
      },
      it: {
        bronzeTitle: 'Punteggiatore',
        description: 'Raggiungi un punteggio totale di {n} punti.',
        goldTitle: 'Gran punteggiatore',
        lastDescription: 'Raggiunto un punteggio totale di 1.000.000 punti.',
        lastTitle: 'Maestro del punteggio',
        platinumTitle: 'Leggenda',
        silverTitle: 'Abile',
      },
      jp: {
        bronzeTitle: '得点者',
        description: '合計{n}ポイントを獲得する。',
        goldTitle: '高得点者',
        lastDescription: '合計1,000,000ポイントを獲得した。',
        lastTitle: 'スコアマスター',
        platinumTitle: '伝説',
        silverTitle: '熟練者',
      },
      ko: {
        bronzeTitle: '점수 획득자',
        description: '총 {n}점을 획득하세요.',
        goldTitle: '고득점자',
        lastDescription: '총 1,000,000점을 획득했습니다.',
        lastTitle: '스코어 마스터',
        platinumTitle: '전설',
        silverTitle: '숙련자',
      },
      pt: {
        bronzeTitle: 'Pontuador',
        description: 'Alcance um total de {n} pontos.',
        goldTitle: 'Alta pontuação',
        lastDescription: 'Alcançou um total de 1.000.000 de pontos.',
        lastTitle: 'Mestre do placar',
        platinumTitle: 'Lenda',
        silverTitle: 'Habilidoso',
      },
      ru: {
        bronzeTitle: 'Набирающий',
        description: 'Наберите в общей сложности {n} очков.',
        goldTitle: 'Высокий счет',
        lastDescription: 'Набрано в общей сложности 1.000.000 очков.',
        lastTitle: 'Мастер очков',
        platinumTitle: 'Легенда',
        silverTitle: 'Умелый',
      },
      zh: {
        bronzeTitle: '得分手',
        description: '累計得分達到 {n} 分。',
        goldTitle: '高分王',
        lastDescription: '累計得分達到了 1000000 分。',
        lastTitle: '分數大師',
        platinumTitle: '傳奇',
        silverTitle: '熟練者',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'total',
    getValue: getTotalScore,
    id: 'totalScore',
    get lastDescription() {
      return t('lastDescription');
    },
    get lastTitle() {
      return t('lastTitle');
    },
    thresholds: [
      {
        get description() {
          return t('description', { n: 1000 });
        },
        get nextTitle() {
          return t('bronzeTitle');
        },
        rank: 'bronze',
        val: 1000,
      },
      {
        get description() {
          return t('description', { n: 10000 });
        },
        get nextTitle() {
          return t('silverTitle');
        },
        rank: 'silver',
        val: 10000,
      },
      {
        get description() {
          return t('description', { n: 100000 });
        },
        get nextTitle() {
          return t('goldTitle');
        },
        rank: 'gold',
        val: 100000,
      },
      {
        get description() {
          return t('description', { n: 1000000 });
        },
        get nextTitle() {
          return t('platinumTitle');
        },
        rank: 'platinum',
        val: 1000000,
      },
    ],
  });
};
