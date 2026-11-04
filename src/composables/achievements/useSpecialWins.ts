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
        goldTitle: '神话通',
        lastDescription: '完成了超过 500 场传说模式游戏。',
        lastTitle: '弑神者',
        platinumTitle: '神明智者',
        silverTitle: '传说专家',
      },
      de: {
        bronzeTitle: 'Legendenkundler in Ausbildung',
        description: 'Schließe {n} Legenden-Spiele ab.',
        goldTitle: 'Mythenkenner',
        lastDescription: 'Mehr als 500 Legenden-Spiele abgeschlossen.',
        lastTitle: 'Götterschlächter',
        platinumTitle: 'Götterweiser',
        silverTitle: 'Legendenexperte',
      },
      en: {
        bronzeTitle: 'Lore Student',
        description: 'Finish {n} special mode games.',
        goldTitle: 'Myth Savant',
        lastDescription: 'Finished more than 500 special mode games.',
        lastTitle: 'God Slayer',
        platinumTitle: 'Deity Sage',
        silverTitle: 'Legend Expert',
      },
      es: {
        bronzeTitle: 'Aprendiz erudito',
        description: 'Completa {n} partidas de modo legendario.',
        goldTitle: 'Erudito mítico',
        lastDescription: 'Más de 500 partidas de modo legendario completadas.',
        lastTitle: 'Matadioses',
        platinumTitle: 'Sabio divino',
        silverTitle: 'Experto legendario',
      },
      fr: {
        bronzeTitle: 'Apprenti érudit',
        description: 'Terminez {n} parties en mode légendaire.',
        goldTitle: 'Érudit mythique',
        lastDescription: 'Plus de 500 parties en mode légendaire terminées.',
        lastTitle: 'Déicide',
        platinumTitle: 'Sage divin',
        silverTitle: 'Expert légendaire',
      },
      it: {
        bronzeTitle: 'Studioso di leggende',
        description: 'Completa {n} partite in modalità leggendaria.',
        goldTitle: 'Sapiente dei miti',
        lastDescription: 'Più di 500 partite in modalità leggendaria completate.',
        lastTitle: 'Uccisore di dèi',
        platinumTitle: 'Saggio delle divinità',
        silverTitle: 'Esperto di leggende',
      },
      jp: {
        bronzeTitle: '伝承の研究生',
        description: '伝説モードを{n}回クリア。',
        goldTitle: '神話の博識者',
        lastDescription: '伝説モードを500回以上クリア。',
        lastTitle: '神殺し',
        platinumTitle: '神々の賢者',
        silverTitle: '伝説の専門家',
      },
      ko: {
        bronzeTitle: '전승 연구생',
        description: '전설 모드 게임을 {n}회 완료하세요.',
        goldTitle: '신화 박식가',
        lastDescription: '전설 모드 게임을 500회 이상 완료.',
        lastTitle: '신살자',
        platinumTitle: '신들의 현자',
        silverTitle: '전설 전문가',
      },
      pt: {
        bronzeTitle: 'Estudante de lendas',
        description: 'Complete {n} partidas no modo lendário.',
        goldTitle: 'Erudito de mitos',
        lastDescription: 'Mais de 500 partidas no modo lendário completadas.',
        lastTitle: 'Matador de deuses',
        platinumTitle: 'Sábio das divindades',
        silverTitle: 'Especialista em lendas',
      },
      ru: {
        bronzeTitle: 'Ученик преданий',
        description: 'Завершите {n} игр в режиме легенд.',
        goldTitle: 'Знаток мифов',
        lastDescription: 'Завершено более 500 игр в режиме легенд.',
        lastTitle: 'Убийца богов',
        platinumTitle: 'Мудрец божеств',
        silverTitle: 'Эксперт легенд',
      },
      zh: {
        bronzeTitle: '傳說學者',
        description: '完成 {n} 場傳說模式遊戲。',
        goldTitle: '神話通',
        lastDescription: '完成了超過 500 場傳說模式遊戲。',
        lastTitle: '弒神者',
        platinumTitle: '神祇智者',
        silverTitle: '傳說專家',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'total',
    getValue: getSpecialWins,
    id: 'specialWins',
    get lastDescription() {
      return t('lastDescription');
    },
    get lastTitle() {
      return t('lastTitle');
    },
    priority: 30,
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
