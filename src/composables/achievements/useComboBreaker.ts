// Combo breaker achievement - tracks max bonus streak
import { useI18n } from 'vue-i18n';

import { useGlobalStats } from '@/stores/useGlobalStats.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useComboBreaker = () => {
  const { statsState } = useGlobalStats();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '连击者',
        description: '在单次连击中获得 {n} 个奖励分。',
        goldTitle: '连击破坏者',
        lastDescription: '在单次连击中获得 500 个奖励分。',
        lastTitle: '终极专注',
        platinumTitle: '严肃连击者',
        silverTitle: '火热中',
      },
      de: {
        bronzeTitle: 'Comboist',
        description: 'Verdiene {n} Bonuspunkte in einer einzigen Serie.',
        goldTitle: 'Combo-Brecher',
        lastDescription: '500 Bonuspunkte in einer einzigen Serie verdient.',
        lastTitle: 'Ultimative Konzentration',
        platinumTitle: 'Ernster Serienmeister',
        silverTitle: 'In Flammen',
      },
      en: {
        bronzeTitle: 'Comboist',
        description: 'Earn {n} bonus points in a single streak.',
        goldTitle: 'Combo Breaker',
        lastDescription: 'Earned 500 bonus points in a single streak.',
        lastTitle: 'Ultimate Concentration',
        platinumTitle: 'Serious Streaker',
        silverTitle: 'On Fire',
      },
      es: {
        bronzeTitle: 'Combinador',
        description: 'Gana {n} puntos bonus en una sola racha.',
        goldTitle: 'Rompecombos',
        lastDescription: 'Ganó 500 puntos bonus en una sola racha.',
        lastTitle: 'Concentración ultimate',
        platinumTitle: 'Rachero serio',
        silverTitle: 'En llamas',
      },
      fr: {
        bronzeTitle: 'Combinaison',
        description: 'Gagnez {n} points bonus en une seule série.',
        goldTitle: 'Casseur de combos',
        lastDescription: 'Gagné 500 points bonus en une seule série.',
        lastTitle: 'Concentration ultime',
        platinumTitle: 'Sérieux en série',
        silverTitle: 'En feu',
      },
      it: {
        bronzeTitle: 'Combinatore',
        description: 'Guadagna {n} punti bonus in una singola serie.',
        goldTitle: 'Rompiseries',
        lastDescription: 'Guadagnato 500 punti bonus in una singola serie.',
        lastTitle: 'Concentrazione ultimate',
        platinumTitle: 'Serio in serie',
        silverTitle: 'In fiamme',
      },
      jp: {
        bronzeTitle: 'コンボイスト',
        description: '1回のストリークで{n}ボーナスポイントを獲得する。',
        goldTitle: 'コンボブレイカー',
        lastDescription: '1回のストリークで500ボーナスポイントを獲得した。',
        lastTitle: '究極の集中力',
        platinumTitle: '本格的なストリーカー',
        silverTitle: '炎上中',
      },
      ko: {
        bronzeTitle: '콤보이스트',
        description: '한 번의 스트릭에서 {n} 보너스 포인트를 획득하세요.',
        goldTitle: '콤보 브레이커',
        lastDescription: '한 번의 스트릭에서 500 보너스 포인트를 획득했습니다.',
        lastTitle: '궁극의 집중력',
        platinumTitle: '진지한 스트리커',
        silverTitle: '화염 중',
      },
      pt: {
        bronzeTitle: 'Combinador',
        description: 'Ganhe {n} pontos bônus em uma única sequência.',
        goldTitle: 'Quebra-combos',
        lastDescription: 'Ganhou 500 pontos bônus em uma única sequência.',
        lastTitle: 'Concentração ultimate',
        platinumTitle: 'Sério em sequência',
        silverTitle: 'Em chamas',
      },
      ru: {
        bronzeTitle: 'Комбоист',
        description: 'Заработайте {n} бонусных очков в одной серии.',
        goldTitle: 'Разрушитель комбо',
        lastDescription: 'Заработано 500 бонусных очков в одной серии.',
        lastTitle: 'Ультимативная концентрация',
        platinumTitle: 'Серьезный стрикер',
        silverTitle: 'В огне',
      },
      zh: {
        bronzeTitle: '連擊者',
        description: '在單次連擊中獲得 {n} 個獎勵分。',
        goldTitle: '連擊破壞者',
        lastDescription: '在單次連擊中獲得 500 個獎勵分。',
        lastTitle: '終極專注',
        platinumTitle: '嚴肅連擊者',
        silverTitle: '火熱中',
      },
    },
  });

  return createAchievement({
    category: 'counters',
    getValue: () => statsState.maxComboBonus,
    id: 'comboBreaker',
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
          return t('description', { n: 50 });
        },
        get nextTitle() {
          return t('bronzeTitle');
        },
        rank: 'bronze',
        val: 50,
      },
      {
        get description() {
          return t('description', { n: 100 });
        },
        get nextTitle() {
          return t('silverTitle');
        },
        rank: 'silver',
        val: 100,
      },
      {
        get description() {
          return t('description', { n: 200 });
        },
        get nextTitle() {
          return t('goldTitle');
        },
        rank: 'gold',
        val: 200,
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
