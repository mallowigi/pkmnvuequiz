import { useI18n } from 'vue-i18n';

import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useMegaWins = () => {
  const { getMegaWins } = useProfile();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: 'Mega爱好者',
        description: '完成 {n} 场Mega模式游戏。',
        goldTitle: 'Mega专家',
        lastDescription: '完成了超过 500 场Mega模式游戏。',
        lastTitle: 'Mega狂热者',
        platinumTitle: 'Mega大师',
        silverTitle: 'Mega学者',
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
        description: 'Finish {n} Mega mode games.',
        goldTitle: 'Mega Expert',
        lastDescription: 'Finished more than 500 Mega mode games.',
        lastTitle: 'Mega Fanatic',
        platinumTitle: 'Mega Master',
        silverTitle: 'Mega Scholar',
      },
      es: {
        bronzeTitle: 'Entusiasta Mega',
        description: 'Completa {n} partidas de modo Mega.',
        goldTitle: 'Experto Mega',
        lastDescription: 'Más de 500 partidas de modo Mega completadas.',
        lastTitle: 'Fanático Mega',
        platinumTitle: 'Maestro Mega',
        silverTitle: 'Erudito Mega',
      },
      fr: {
        bronzeTitle: 'Passionné Mega',
        description: 'Terminez {n} parties en mode Mega.',
        goldTitle: 'Expert Mega',
        lastDescription: 'Plus de 500 parties en mode Mega terminées.',
        lastTitle: 'Fanatique Mega',
        platinumTitle: 'Maître Mega',
        silverTitle: 'Érudit Mega',
      },
      it: {
        bronzeTitle: 'Appassionato Mega',
        description: 'Completa {n} partite in modalità Mega.',
        goldTitle: 'Esperto Mega',
        lastDescription: 'Più di 500 partite in modalità Mega completate.',
        lastTitle: 'Fanatico Mega',
        platinumTitle: 'Maestro Mega',
        silverTitle: 'Studioso Mega',
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
        bronzeTitle: 'Entusiasta Mega',
        description: 'Complete {n} partidas no modo Mega.',
        goldTitle: 'Especialista Mega',
        lastDescription: 'Mais de 500 partidas no modo Mega completadas.',
        lastTitle: 'Fanático Mega',
        platinumTitle: 'Mestre Mega',
        silverTitle: 'Erudito Mega',
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
        bronzeTitle: 'Mega愛好者',
        description: '完成 {n} 場Mega模式遊戲。',
        goldTitle: 'Mega專家',
        lastDescription: '完成了超過 500 場Mega模式遊戲。',
        lastTitle: 'Mega狂熱者',
        platinumTitle: 'Mega大師',
        silverTitle: 'Mega學者',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'game',
    getValue: getMegaWins,
    id: 'megaWins',
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
