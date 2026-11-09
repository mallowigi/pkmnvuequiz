import { useI18n } from 'vue-i18n';

import { useGlobalStats } from '@/stores/useGlobalStats.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useGlobalShadows = () => {
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '阴影召唤师',
        description: '总共召唤 {n} 个阴影。',
        goldTitle: '阴影大师',
        lastDescription: '总共召唤了 1000 个阴影。',
        lastTitle: '阴影之神',
        platinumTitle: '阴影专家',
        silverTitle: '阴影学徒',
      },
      de: {
        bronzeTitle: 'Schattenrufer',
        description: 'Rufe insgesamt {n} Schatten herbei.',
        goldTitle: 'Schattenmeister',
        lastDescription: 'Insgesamt 1000 Schatten herbeigerufen.',
        lastTitle: 'Schattengott',
        platinumTitle: 'Schattenexperte',
        silverTitle: 'Schattenlehrling',
      },
      en: {
        bronzeTitle: 'Shadow Summoner',
        description: 'Summon {n} shadows total.',
        goldTitle: 'Shadow Master',
        lastDescription: 'Summoned 1000 shadows total.',
        lastTitle: 'Shadow God',
        platinumTitle: 'Shadow Expert',
        silverTitle: 'Shadow Apprentice',
      },
      es: {
        bronzeTitle: 'Invocador de sombras',
        description: 'Invoca {n} sombras en total.',
        goldTitle: 'Maestro de sombras',
        lastDescription: 'Invocó 1000 sombras en total.',
        lastTitle: 'Dios de las sombras',
        platinumTitle: 'Experto en sombras',
        silverTitle: 'Aprendiz de sombras',
      },
      fr: {
        bronzeTitle: "Invoqueur d'ombres",
        description: 'Invoquez {n} ombres au total.',
        goldTitle: 'Maître des ombres',
        lastDescription: 'Invoqué 1000 ombres au total.',
        lastTitle: 'Dieu des ombres',
        platinumTitle: 'Expert en ombres',
        silverTitle: 'Apprenti des ombres',
      },
      it: {
        bronzeTitle: 'Evocatore di ombre',
        description: 'Evoca {n} ombre in totale.',
        goldTitle: 'Maestro delle ombre',
        lastDescription: 'Evocato 1000 ombre in totale.',
        lastTitle: 'Dio delle ombre',
        platinumTitle: 'Esperto di ombre',
        silverTitle: 'Apprendista di ombre',
      },
      jp: {
        bronzeTitle: 'シャドウ召喚師',
        description: '合計{n}個のシャドウを召喚する。',
        goldTitle: 'シャドウマスター',
        lastDescription: '合計1000個のシャドウを召喚した。',
        lastTitle: 'シャドウ神',
        platinumTitle: 'シャドウエキスパート',
        silverTitle: 'シャドウ見習い',
      },
      ko: {
        bronzeTitle: '섀도우 소환사',
        description: '총 {n}개의 섀도우를 소환하세요.',
        goldTitle: '섀도우 마스터',
        lastDescription: '총 1000개의 섀도우를 소환했습니다.',
        lastTitle: '섀도우 신',
        platinumTitle: '섀도우 전문가',
        silverTitle: '섀도우 견습생',
      },
      pt: {
        bronzeTitle: 'Invocador de sombras',
        description: 'Invoque {n} sombras no total.',
        goldTitle: 'Mestre das sombras',
        lastDescription: 'Invocou 1000 sombras no total.',
        lastTitle: 'Deus das sombras',
        platinumTitle: 'Especialista em sombras',
        silverTitle: 'Aprendiz de sombras',
      },
      ru: {
        bronzeTitle: 'Призыватель теней',
        description: 'Призовите {n} теней.',
        goldTitle: 'Мастер теней',
        lastDescription: 'Призвано 1000 теней.',
        lastTitle: 'Бог теней',
        platinumTitle: 'Эксперт по теням',
        silverTitle: 'Ученик теней',
      },
      zh: {
        bronzeTitle: '陰影召喚師',
        description: '總共召喚 {n} 個陰影。',
        goldTitle: '陰影大師',
        lastDescription: '總共召喚了 1000 個陰影。',
        lastTitle: '陰影之神',
        platinumTitle: '陰影專家',
        silverTitle: '陰影學徒',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'counters',
    getValue: () => {
      const { statsState } = useGlobalStats();
      return statsState.totalInvokedShadows;
    },
    id: 'globalShadows',
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
