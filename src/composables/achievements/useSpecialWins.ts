import { useI18n } from 'vue-i18n';

import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useSpecialWins = () => {
  const { getSpecialWins } = useProfile();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '传说学者',
        description: '完成 {n} 场传说模式游戏。',
        goldTitle: '传说专家',
        lastDescription: '完成了超过 500 场传说模式游戏。',
        lastTitle: '传说教授',
        platinumTitle: '传说大师',
        silverTitle: '传说爱好者',
      },
      de: {
        bronzeTitle: 'Legenden-Forscher',
        description: 'Schließe {n} Legenden-Spiele ab.',
        goldTitle: 'Legenden-Experte',
        lastDescription: 'Mehr als 500 Legenden-Spiele abgeschlossen.',
        lastTitle: 'Legenden-Professor',
        platinumTitle: 'Legenden-Meister',
        silverTitle: 'Legenden-Fan',
      },
      en: {
        bronzeTitle: 'Legendary Scholar',
        description: 'Finish {n} special mode games.',
        goldTitle: 'Legendary Expert',
        lastDescription: 'Finished more than 500 special mode games.',
        lastTitle: 'Legendary Professor',
        platinumTitle: 'Legendary Master',
        silverTitle: 'Legendary Aficionado',
      },
      es: {
        bronzeTitle: 'Erudito legendario',
        description: 'Completa {n} partidas de modo legendario.',
        goldTitle: 'Experto legendario',
        lastDescription: 'Más de 500 partidas de modo legendario completadas.',
        lastTitle: 'Profesor legendario',
        platinumTitle: 'Maestro legendario',
        silverTitle: 'Aficionado legendario',
      },
      fr: {
        bronzeTitle: 'Érudit légendaire',
        description: 'Terminez {n} parties en mode légendaire.',
        goldTitle: 'Expert légendaire',
        lastDescription: 'Plus de 500 parties en mode légendaire terminées.',
        lastTitle: 'Professeur légendaire',
        platinumTitle: 'Maître légendaire',
        silverTitle: 'Connaisseur légendaire',
      },
      it: {
        bronzeTitle: 'Studioso leggendario',
        description: 'Completa {n} partite in modalità leggendaria.',
        goldTitle: 'Esperto leggendario',
        lastDescription: 'Più di 500 partite in modalità leggendaria completate.',
        lastTitle: 'Professore leggendario',
        platinumTitle: 'Maestro leggendario',
        silverTitle: 'Appassionato leggendario',
      },
      jp: {
        bronzeTitle: '伝説学者',
        description: '伝説モードを{n}回クリア。',
        goldTitle: '伝説エキスパート',
        lastDescription: '伝説モードを500回以上クリア。',
        lastTitle: '伝説博士',
        platinumTitle: '伝説マスター',
        silverTitle: '伝説愛好家',
      },
      ko: {
        bronzeTitle: '전설 학자',
        description: '전설 모드 게임을 {n}회 완료하세요.',
        goldTitle: '전설 전문가',
        lastDescription: '전설 모드 게임을 500회 이상 완료.',
        lastTitle: '전설 박사',
        platinumTitle: '전설 마스터',
        silverTitle: '전설 애호가',
      },
      pt: {
        bronzeTitle: 'Erudito lendário',
        description: 'Complete {n} partidas no modo lendário.',
        goldTitle: 'Especialista lendário',
        lastDescription: 'Mais de 500 partidas no modo lendário completadas.',
        lastTitle: 'Professor lendário',
        platinumTitle: 'Mestre lendário',
        silverTitle: 'Aficionado lendário',
      },
      ru: {
        bronzeTitle: 'Ученый легенд',
        description: 'Завершите {n} игр в режиме легенд.',
        goldTitle: 'Эксперт легенд',
        lastDescription: 'Завершено более 500 игр в режиме легенд.',
        lastTitle: 'Профессор легенд',
        platinumTitle: 'Мастер легенд',
        silverTitle: 'Знаток легенд',
      },
      zh: {
        bronzeTitle: '傳說學者',
        description: '完成 {n} 場傳說模式遊戲。',
        goldTitle: '傳說專家',
        lastDescription: '完成了超過 500 場傳說模式遊戲。',
        lastTitle: '傳說教授',
        platinumTitle: '傳說大師',
        silverTitle: '傳說愛好者',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'game',
    getValue: getSpecialWins,
    id: 'legendaryCollector',
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
