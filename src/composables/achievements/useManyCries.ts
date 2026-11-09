import { useI18n } from 'vue-i18n';

import { useTouches } from '@/stores/useTouches.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useManyCries = () => {
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '好奇的听众',
        description: '在一场比赛中播放 {n} 个叫声。',
        goldTitle: '叫声爱好者',
        lastDescription: '在一场比赛中播放了 100 个叫声。',
        lastTitle: '叫声教授',
        platinumTitle: '叫声专家',
        silverTitle: '专注的听众',
      },
      de: {
        bronzeTitle: 'Neugieriger Zuhörer',
        description: 'Spiele {n} Rufe in einem Spiel ab.',
        goldTitle: 'Ruf-Enthusiast',
        lastDescription: '100 Rufe in einem Spiel abgespielt.',
        lastTitle: 'Ruf-Professor',
        platinumTitle: 'Ruf-Experte',
        silverTitle: 'Aufmerksamer Zuhörer',
      },
      en: {
        bronzeTitle: 'Curious Listener',
        description: 'Play {n} cries in a single game.',
        goldTitle: 'Cry Enthusiast',
        lastDescription: 'Played 100 cries in a single game.',
        lastTitle: 'Cry Professor',
        platinumTitle: 'Cry Expert',
        silverTitle: 'Keen Listener',
      },
      es: {
        bronzeTitle: 'Oyente curioso',
        description: 'Reproduce {n} gritos en una sola partida.',
        goldTitle: 'Entusiasta de los gritos',
        lastDescription: 'Reprodujo 100 gritos en una sola partida.',
        lastTitle: 'Profesor de gritos',
        platinumTitle: 'Experto en gritos',
        silverTitle: 'Oyente atento',
      },
      fr: {
        bronzeTitle: 'Auditeur curieux',
        description: 'Écoutez {n} cris en une seule partie.',
        goldTitle: 'Passionné de cris',
        lastDescription: 'Écouté 100 cris en une seule partie.',
        lastTitle: 'Professeur des cris',
        platinumTitle: 'Expert en cris',
        silverTitle: 'Auditeur attentif',
      },
      it: {
        bronzeTitle: 'Ascoltatore curioso',
        description: 'Riproduci {n} urla in una singola partita.',
        goldTitle: 'Appassionato di urla',
        lastDescription: 'Riprodotte 100 urla in una singola partita.',
        lastTitle: 'Professore di urla',
        platinumTitle: 'Esperto di urla',
        silverTitle: 'Ascoltatore attento',
      },
      jp: {
        bronzeTitle: 'なきごえに興味津々な聞き手',
        description: '1つのゲームで{n}個のなきごえを再生する。',
        goldTitle: 'なきごえ愛好家',
        lastDescription: '1つのゲームで100個のなきごえを再生した。',
        lastTitle: 'なきごえ教授',
        platinumTitle: 'なきごえエキスパート',
        silverTitle: 'なきごえに熱心な聞き手',
      },
      ko: {
        bronzeTitle: '호기심 많은 청취자',
        description: '한 게임에서 {n}개의 울음소리를 재생하세요.',
        goldTitle: '울음소리 애호가',
        lastDescription: '한 게임에서 100개의 울음소리를 재생했습니다.',
        lastTitle: '울음소리 교수',
        platinumTitle: '울음소리 전문가',
        silverTitle: '귀 기울이는 청취자',
      },
      pt: {
        bronzeTitle: 'Ouvinte curioso',
        description: 'Reproduza {n} gritos em uma única partida.',
        goldTitle: 'Entusiasta de gritos',
        lastDescription: 'Reproduziu 100 gritos em uma única partida.',
        lastTitle: 'Professor de gritos',
        platinumTitle: 'Especialista em gritos',
        silverTitle: 'Ouvinte atento',
      },
      ru: {
        bronzeTitle: 'Любознательный слушатель',
        description: 'Воспроизведите {n} криков в одной игре.',
        goldTitle: 'Энтузиаст криков',
        lastDescription: 'Воспроизведено 100 криков в одной игре.',
        lastTitle: 'Профессор криков',
        platinumTitle: 'Эксперт по крикам',
        silverTitle: 'Внимательный слушатель',
      },
      zh: {
        bronzeTitle: '好奇的聽眾',
        description: '在一場比賽中播放 {n} 個叫聲。',
        goldTitle: '叫聲愛好者',
        lastDescription: '在一場比賽中播放了 100 個叫聲。',
        lastTitle: '叫聲教授',
        platinumTitle: '叫聲專家',
        silverTitle: '專注的聽眾',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'game',
    getValue: () => {
      const { touchesState } = useTouches();
      return touchesState.summonedCries;
    },
    id: 'manyCries',
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
          return t('description', { n: 20 });
        },
        get nextTitle() {
          return t('silverTitle');
        },
        rank: 'silver',
        val: 20,
      },
      {
        get description() {
          return t('description', { n: 50 });
        },
        get nextTitle() {
          return t('goldTitle');
        },
        rank: 'gold',
        val: 50,
      },
      {
        get description() {
          return t('description', { n: 100 });
        },
        get nextTitle() {
          return t('platinumTitle');
        },
        rank: 'platinum',
        val: 100,
      },
    ],
  });
};
