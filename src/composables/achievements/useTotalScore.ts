import { useI18n } from 'vue-i18n';

import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useTotalScore = () => {
  const { getTotalScore } = useProfile();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '得分收集者',
        description: '累计得分达到 {n} 分。',
        goldTitle: '得分冠军',
        lastDescription: '累计得分达到了 1000000 分。',
        lastTitle: '百万分传奇',
        platinumTitle: '纪录追逐者',
        silverTitle: '得分攀登者',
      },
      de: {
        bronzeTitle: 'Punktesammler',
        description: 'Erreiche insgesamt {n} Punkte.',
        goldTitle: 'Punktechampion',
        lastDescription: 'Insgesamt 1.000.000 Punkte erreicht.',
        lastTitle: 'Millionenpunkte-Legende',
        platinumTitle: 'Rekordjäger',
        silverTitle: 'Punktejäger',
      },
      en: {
        bronzeTitle: 'Point Collector',
        description: 'Reach a total score of {n} points.',
        goldTitle: 'Score Champion',
        lastDescription: 'Reached a total score of 1,000,000 points.',
        lastTitle: 'Million-Point Legend',
        platinumTitle: 'Record Chaser',
        silverTitle: 'Score Climber',
      },
      es: {
        bronzeTitle: 'Recolector',
        description: 'Alcanza un puntaje total de {n} puntos.',
        goldTitle: 'Campeón',
        lastDescription: 'Alcanzó un puntaje total de 1.000.000 de puntos.',
        lastTitle: 'Leyenda del millón',
        platinumTitle: 'Cazador de récords',
        silverTitle: 'Escalador',
      },
      fr: {
        bronzeTitle: 'Collectionneur',
        description: 'Atteignez un score total de {n} points.',
        goldTitle: 'Champion',
        lastDescription: 'Score total de 1 000 000 points atteint.',
        lastTitle: 'Légende du million',
        platinumTitle: 'Chasseur de records',
        silverTitle: 'Grimpeur',
      },
      it: {
        bronzeTitle: 'Collezionista',
        description: 'Raggiungi un punteggio totale di {n} punti.',
        goldTitle: 'Campione',
        lastDescription: 'Raggiunto un punteggio totale di 1.000.000 punti.',
        lastTitle: 'Leggenda del milione',
        platinumTitle: 'Cacciatore di record',
        silverTitle: 'Scalatore',
      },
      jp: {
        bronzeTitle: 'ポイントコレクター',
        description: '合計{n}ポイントを獲得する。',
        goldTitle: 'スコアチャンピオン',
        lastDescription: '合計1,000,000ポイントを獲得した。',
        lastTitle: 'ミリオンポイントレジェンド',
        platinumTitle: '記録ハンター',
        silverTitle: 'スコアクライマー',
      },
      ko: {
        bronzeTitle: '포인트 수집가',
        description: '총 {n}점을 획득하세요.',
        goldTitle: '점수 챔피언',
        lastDescription: '총 1,000,000점을 획득했습니다.',
        lastTitle: '백만 점의 전설',
        platinumTitle: '기록 사냥꾼',
        silverTitle: '점수 정복자',
      },
      pt: {
        bronzeTitle: 'Coletor',
        description: 'Alcance um total de {n} pontos.',
        goldTitle: 'Campeão',
        lastDescription: 'Alcançou um total de 1.000.000 de pontos.',
        lastTitle: 'Lenda do milhão',
        platinumTitle: 'Caçador de recordes',
        silverTitle: 'Escalador',
      },
      ru: {
        bronzeTitle: 'Собиратель очков',
        description: 'Наберите в общей сложности {n} очков.',
        goldTitle: 'Чемпион по очкам',
        lastDescription: 'Набрано в общей сложности 1 000 000 очков.',
        lastTitle: 'Легенда миллиона очков',
        platinumTitle: 'Охотник за рекордами',
        silverTitle: 'Покоритель очков',
      },
      zh: {
        bronzeTitle: '得分收集者',
        description: '累計得分達到 {n} 分。',
        goldTitle: '得分冠軍',
        lastDescription: '累計得分達到了 1000000 分。',
        lastTitle: '百萬分傳奇',
        platinumTitle: '紀錄追逐者',
        silverTitle: '得分攀登者',
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
    priority: 5,
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
