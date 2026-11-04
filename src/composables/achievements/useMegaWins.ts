import { useI18n } from 'vue-i18n';

import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useMegaWins = () => {
  const { getMegaWins } = useProfile();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: 'mega学者',
        description: '完成 {n} 场mega模式游戏。',
        goldTitle: 'mega专家',
        lastDescription: '完成了超过 500 场mega模式游戏。',
        lastTitle: 'mega教授',
        platinumTitle: 'mega大师',
        silverTitle: 'mega爱好者',
      },
      de: {
        bronzeTitle: 'Mega-Forscher',
        description: 'Schließe {n} Mega-Spiele ab.',
        goldTitle: 'Mega-Experte',
        lastDescription: 'Mehr als 500 Mega-Spiele abgeschlossen.',
        lastTitle: 'Mega-Professor',
        platinumTitle: 'Mega-Meister',
        silverTitle: 'Mega-Fan',
      },
      en: {
        bronzeTitle: 'Mega Scholar',
        description: 'Finish {n} mega mode games.',
        goldTitle: 'Mega Expert',
        lastDescription: 'Finished more than 500 mega mode games.',
        lastTitle: 'Mega Professor',
        platinumTitle: 'Mega Master',
        silverTitle: 'Mega Aficionado',
      },
      es: {
        bronzeTitle: 'Erudito mega',
        description: 'Completa {n} partidas de modo mega.',
        goldTitle: 'Experto mega',
        lastDescription: 'Más de 500 partidas de modo mega completadas.',
        lastTitle: 'Profesor mega',
        platinumTitle: 'Maestro mega',
        silverTitle: 'Aficionado mega',
      },
      fr: {
        bronzeTitle: 'Érudit mega',
        description: 'Terminez {n} parties en mode mega.',
        goldTitle: 'Expert mega',
        lastDescription: 'Plus de 500 parties en mode mega terminées.',
        lastTitle: 'Professeur mega',
        platinumTitle: 'Maître mega',
        silverTitle: 'Connaisseur mega',
      },
      it: {
        bronzeTitle: 'Eretto mega',
        description: 'Completa {n} partite in modalità mega.',
        goldTitle: 'Esperto mega',
        lastDescription: 'Più di 500 partite in modalità mega completate.',
        lastTitle: 'Professore mega',
        platinumTitle: 'Maestro mega',
        silverTitle: 'Appassionato mega',
      },
      jp: {
        bronzeTitle: 'メガ学者',
        description: 'メガモードを{n}回クリア。',
        goldTitle: 'メガエキスパート',
        lastDescription: 'メガモードを500回以上クリア。',
        lastTitle: 'メガ博士',
        platinumTitle: 'メガマスター',
        silverTitle: 'メガ愛好家',
      },
      ko: {
        bronzeTitle: '메가 학자',
        description: '메가 모드 게임을 {n}회 완료하세요.',
        goldTitle: '메가 전문가',
        lastDescription: '메가 모드 게임을 500회 이상 완료.',
        lastTitle: '메가 박사',
        platinumTitle: '메가 마스터',
        silverTitle: '메가 애호가',
      },
      pt: {
        bronzeTitle: 'Erudito mega',
        description: 'Complete {n} partidas no modo mega.',
        goldTitle: 'Especialista mega',
        lastDescription: 'Mais de 500 partidas no modo mega completadas.',
        lastTitle: 'Professor mega',
        platinumTitle: 'Mestre mega',
        silverTitle: 'Aficionado mega',
      },
      ru: {
        bronzeTitle: 'Ученый мега',
        description: 'Завершите {n} игр в режиме мега.',
        goldTitle: 'Эксперт мега',
        lastDescription: 'Завершено более 500 игр в режиме мега.',
        lastTitle: 'Профессор мега',
        platinumTitle: 'Мастер мега',
        silverTitle: 'Знаток мега',
      },
      zh: {
        bronzeTitle: 'mega學者',
        description: '完成 {n} 場mega模式遊戲。',
        goldTitle: 'mega專家',
        lastDescription: '完成了超過 500 場mega模式遊戲。',
        lastTitle: 'mega教授',
        platinumTitle: 'mega大師',
        silverTitle: 'mega愛好者',
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
