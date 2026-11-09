// Global cries counter achievement
import { useI18n } from 'vue-i18n';

import { useGlobalStats } from '@/stores/useGlobalStats.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useGlobalCries = () => {
  const { statsState } = useGlobalStats();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '好奇的听众',
        description: '总共播放 {n} 个叫声。',
        goldTitle: '叫声爱好者',
        lastDescription: '总共播放了 1000 个叫声。',
        lastTitle: '叫声教授',
        platinumTitle: '叫声专家',
        silverTitle: '敏锐的听众',
      },
      de: {
        bronzeTitle: 'Neugieriger Zuhörer',
        description: 'Spiele insgesamt {n} Rufe ab.',
        goldTitle: 'Ruf-Enthusiast',
        lastDescription: 'Insgesamt 1000 Rufe abgespielt.',
        lastTitle: 'Ruf-Professor',
        platinumTitle: 'Ruf-Experte',
        silverTitle: 'Aufmerksamer Zuhörer',
      },
      en: {
        bronzeTitle: 'Curious Listener',
        description: 'Play {n} cries total.',
        goldTitle: 'Cry Enthusiast',
        lastDescription: 'Played 1000 cries total.',
        lastTitle: 'Cry Professor',
        platinumTitle: 'Cry Expert',
        silverTitle: 'Keen Listener',
      },
      es: {
        bronzeTitle: 'Oyente curioso',
        description: 'Reproduce {n} gritos en total.',
        goldTitle: 'Entusiasta de gritos',
        lastDescription: 'Reprodujo 1000 gritos en total.',
        lastTitle: 'Profesor de gritos',
        platinumTitle: 'Experto en gritos',
        silverTitle: 'Oyente atento',
      },
      fr: {
        bronzeTitle: 'Auditeur curieux',
        description: 'Jouez {n} cris au total.',
        goldTitle: 'Enthousiaste des cris',
        lastDescription: 'Joué 1000 cris au total.',
        lastTitle: 'Professeur des cris',
        platinumTitle: 'Expert en cris',
        silverTitle: 'Auditeur attentif',
      },
      it: {
        bronzeTitle: 'Ascoltatore curioso',
        description: 'Riproduci {n} grida in totale.',
        goldTitle: 'Entusiasta delle grida',
        lastDescription: 'Riprodotta 1000 grida in totale.',
        lastTitle: 'Professore delle grida',
        platinumTitle: 'Esperto di grida',
        silverTitle: 'Ascoltatore attento',
      },
      jp: {
        bronzeTitle: '好奇心旺盛なリスナー',
        description: '合計{n}回の声を再生する。',
        goldTitle: '声の愛好家',
        lastDescription: '合計1000回の声を再生した。',
        lastTitle: '声の教授',
        platinumTitle: '声のエキスパート',
        silverTitle: '鋭いリスナー',
      },
      ko: {
        bronzeTitle: '호기심 많은 청취자',
        description: '총 {n}개의 울음소리를 재생하세요.',
        goldTitle: '울음소리 열성가',
        lastDescription: '총 1000개의 울음소리를 재생했습니다.',
        lastTitle: '울음소리 교수',
        platinumTitle: '울음소리 전문가',
        silverTitle: '예리한 청취자',
      },
      pt: {
        bronzeTitle: 'Ouvinte curioso',
        description: 'Reproduza {n} gritos no total.',
        goldTitle: 'Entusiasta de gritos',
        lastDescription: 'Reproduziu 1000 gritos no total.',
        lastTitle: 'Professor de gritos',
        platinumTitle: 'Especialista em gritos',
        silverTitle: 'Ouvinte atento',
      },
      ru: {
        bronzeTitle: 'Любопытный слушатель',
        description: 'Воспроизведите {n} криков всего.',
        goldTitle: 'Энтузиаст криков',
        lastDescription: 'Воспроизведено 1000 криков всего.',
        lastTitle: 'Профессор криков',
        platinumTitle: 'Эксперт по крикам',
        silverTitle: 'Внимательный слушатель',
      },
      zh: {
        bronzeTitle: '好奇的聽眾',
        description: '總共播放 {n} 個叫聲。',
        goldTitle: '叫聲愛好者',
        lastDescription: '總共播放了 1000 個叫聲。',
        lastTitle: '叫聲教授',
        platinumTitle: '叫聲專家',
        silverTitle: '敏銳的聽眾',
      },
    },
  });

  return createAchievement({
    category: 'counters',
    getValue: () => statsState.totalInvokedCries,
    id: 'globalCries',
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
          return t('description', { n: 200 });
        },
        get nextTitle() {
          return t('silverTitle');
        },
        rank: 'silver',
        val: 200,
      },
      {
        get description() {
          return t('description', { n: 500 });
        },
        get nextTitle() {
          return t('goldTitle');
        },
        rank: 'gold',
        val: 500,
      },
      {
        get description() {
          return t('description', { n: 1000 });
        },
        get nextTitle() {
          return t('platinumTitle');
        },
        rank: 'platinum',
        val: 1000,
      },
    ],
  });
};
