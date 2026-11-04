import { useI18n } from 'vue-i18n';

import { useTouches } from '@/stores/useTouches.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useManyCries = () => {
  const { touchesState } = useTouches();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '叫声尝试者',
        description: '在一场比赛中播放 {n} 个叫声。',
        goldTitle: '叫声专家',
        lastDescription: '在一场比赛中播放了 100 个叫声。',
        lastTitle: '叫声专家',
        platinumTitle: '叫声大师',
        silverTitle: '叫声爱好者',
      },
      de: {
        bronzeTitle: 'Ruf-Experimentator',
        description: 'Spiele {n} Rufe in einem Spiel ab.',
        goldTitle: 'Ruf-Experte',
        lastDescription: '100 Rufe in einem Spiel abgespielt.',
        lastTitle: 'Ruf-Experte',
        platinumTitle: 'Ruf-Meister',
        silverTitle: 'Ruf-Fan',
      },
      en: {
        bronzeTitle: 'Cry Tryout',
        description: 'Play {n} cries in a single game.',
        goldTitle: 'Cry Expert',
        lastDescription: 'Played 100 cries in a single game.',
        lastTitle: 'Cry Expert',
        platinumTitle: 'Cry Master',
        silverTitle: 'Cry Enthusiast',
      },
      es: {
        bronzeTitle: 'Probador de gritos',
        description: 'Reproduce {n} gritos en una sola partida.',
        goldTitle: 'Experto en gritos',
        lastDescription: 'Reprodujo 100 gritos en una sola partida.',
        lastTitle: 'Experto en gritos',
        platinumTitle: 'Maestro de gritos',
        silverTitle: 'Entusiasta de gritos',
      },
      fr: {
        bronzeTitle: 'Essayeur de cris',
        description: 'Écoutez {n} cris en une seule partie.',
        goldTitle: 'Expert en cris',
        lastDescription: 'Écouté 100 cris en une seule partie.',
        lastTitle: 'Expert en cris',
        platinumTitle: 'Maître des cris',
        silverTitle: 'Passionné de cris',
      },
      it: {
        bronzeTitle: 'Provatore di urla',
        description: 'Riproduci {n} urla in una singola partita.',
        goldTitle: 'Esperto di urla',
        lastDescription: 'Riprodotte 100 urla in una singola partita.',
        lastTitle: 'Esperto di urla',
        platinumTitle: 'Maestro delle urla',
        silverTitle: 'Appassionato di urla',
      },
      jp: {
        bronzeTitle: 'なきごえ挑戦者',
        description: '1つのゲームで{n}個のなきごえを再生する。',
        goldTitle: 'なきごえエキスパート',
        lastDescription: '1つのゲームで100個のなきごえを再生した。',
        lastTitle: 'なきごえエキスパート',
        platinumTitle: 'なきごえマスター',
        silverTitle: 'なきごえ愛好家',
      },
      ko: {
        bronzeTitle: '울음소리 도전자',
        description: '한 게임에서 {n}개의 울음소리를 재생하세요.',
        goldTitle: '울음소리 전문가',
        lastDescription: '한 게임에서 100개의 울음소리를 재생했습니다.',
        lastTitle: '울음소리 전문가',
        platinumTitle: '울음소리 마스터',
        silverTitle: '울음소리 애호가',
      },
      pt: {
        bronzeTitle: 'Experimentador de gritos',
        description: 'Reproduza {n} gritos em uma única partida.',
        goldTitle: 'Especialista em gritos',
        lastDescription: 'Reproduziu 100 gritos em uma única partida.',
        lastTitle: 'Especialista em gritos',
        platinumTitle: 'Mestre dos gritos',
        silverTitle: 'Entusiasta de gritos',
      },
      ru: {
        bronzeTitle: 'Исследователь криков',
        description: 'Воспроизведите {n} криков в одной игре.',
        goldTitle: 'Эксперт по крикам',
        lastDescription: 'Воспроизведено 100 криков в одной игре.',
        lastTitle: 'Эксперт по крикам',
        platinumTitle: 'Мастер криков',
        silverTitle: 'Энтузиаст криков',
      },
      zh: {
        bronzeTitle: '叫聲嘗試者',
        description: '在一場比賽中播放 {n} 個叫聲。',
        goldTitle: '叫聲專家',
        lastDescription: '在一場比賽中播放了 100 個叫聲。',
        lastTitle: '叫聲專家',
        platinumTitle: '叫聲大師',
        silverTitle: '叫聲愛好者',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'game',
    getValue: () => touchesState.summonedCries,
    id: 'manyCries',
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
