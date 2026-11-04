import { useI18n } from 'vue-i18n';

import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useMegaWins = () => {
  const { getMegaWins } = useProfile();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: 'mega爱好者',
        description: '完成 {n} 场mega模式游戏。',
        goldTitle: 'mega专家',
        lastDescription: '完成了超过 500 场mega模式游戏。',
        lastTitle: 'mega狂热者',
        platinumTitle: 'mega大师',
        silverTitle: 'mega学者',
      },
      de: {
        bronzeTitle: 'Mega-Enthusiast',
        description: 'Schließe {n} Mega-Spiele ab.',
        goldTitle: 'Mega-Experte',
        lastDescription: 'Mehr als 500 Mega-Spiele abgeschlossen.',
        lastTitle: 'Mega-Fanatiker',
        platinumTitle: 'Mega-Meister',
        silverTitle: 'Mega-Forscher',
      },
      en: {
        bronzeTitle: 'Mega Enthusiast',
        description: 'Finish {n} mega mode games.',
        goldTitle: 'Mega Expert',
        lastDescription: 'Finished more than 500 mega mode games.',
        lastTitle: 'Mega Fanatic',
        platinumTitle: 'Mega Master',
        silverTitle: 'Mega Scholar',
      },
      es: {
        bronzeTitle: 'Entusiasta mega',
        description: 'Completa {n} partidas de modo mega.',
        goldTitle: 'Experto mega',
        lastDescription: 'Más de 500 partidas de modo mega completadas.',
        lastTitle: 'Fanático mega',
        platinumTitle: 'Maestro mega',
        silverTitle: 'Erudito mega',
      },
      fr: {
        bronzeTitle: 'Passionné mega',
        description: 'Terminez {n} parties en mode mega.',
        goldTitle: 'Expert mega',
        lastDescription: 'Plus de 500 parties en mode mega terminées.',
        lastTitle: 'Fanatique mega',
        platinumTitle: 'Maître mega',
        silverTitle: 'Érudit mega',
      },
      it: {
        bronzeTitle: 'Appassionato mega',
        description: 'Completa {n} partite in modalità mega.',
        goldTitle: 'Esperto mega',
        lastDescription: 'Più di 500 partite in modalità mega completate.',
        lastTitle: 'Fanatico mega',
        platinumTitle: 'Maestro mega',
        silverTitle: 'Studioso mega',
      },
      jp: {
        bronzeTitle: 'メガ愛好家',
        description: 'メガモードを{n}回クリア。',
        goldTitle: 'メガエキスパート',
        lastDescription: 'メガモードを500回以上クリア。',
        lastTitle: 'メガ熱狂者',
        platinumTitle: 'メガマスター',
        silverTitle: 'メガ学者',
      },
      ko: {
        bronzeTitle: '메가 애호가',
        description: '메가 모드 게임을 {n}회 완료하세요.',
        goldTitle: '메가 전문가',
        lastDescription: '메가 모드 게임을 500회 이상 완료.',
        lastTitle: '메가 열성 팬',
        platinumTitle: '메가 마스터',
        silverTitle: '메가 학자',
      },
      pt: {
        bronzeTitle: 'Entusiasta mega',
        description: 'Complete {n} partidas no modo mega.',
        goldTitle: 'Especialista mega',
        lastDescription: 'Mais de 500 partidas no modo mega completadas.',
        lastTitle: 'Fanático mega',
        platinumTitle: 'Mestre mega',
        silverTitle: 'Erudito mega',
      },
      ru: {
        bronzeTitle: 'Энтузиаст мега',
        description: 'Завершите {n} игр в режиме мега.',
        goldTitle: 'Эксперт мега',
        lastDescription: 'Завершено более 500 игр в режиме мега.',
        lastTitle: 'Фанатик мега',
        platinumTitle: 'Мастер мега',
        silverTitle: 'Ученый мега',
      },
      zh: {
        bronzeTitle: 'mega愛好者',
        description: '完成 {n} 場mega模式遊戲。',
        goldTitle: 'mega專家',
        lastDescription: '完成了超過 500 場mega模式遊戲。',
        lastTitle: 'mega狂熱者',
        platinumTitle: 'mega大師',
        silverTitle: 'mega學者',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'game',
    getValue: getMegaWins,
    id: 'megaResearcher',
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
