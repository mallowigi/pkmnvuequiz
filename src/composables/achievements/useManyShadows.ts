import { useI18n } from 'vue-i18n';

import { useTouches } from '@/stores/useTouches.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useManyShadows = () => {
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '阴影召唤师',
        description: '在一场比赛中召唤 {n} 个阴影。',
        goldTitle: '阴影大师',
        lastDescription: '在一场比赛中召唤了 100 个阴影。',
        lastTitle: '记忆空白',
        platinumTitle: '阴影之神',
        silverTitle: '阴影专家',
      },
      de: {
        bronzeTitle: 'Schattenrufer',
        description: 'Rufe {n} Schatten in einem Spiel herbei.',
        goldTitle: 'Schattenmeister',
        lastDescription: '100 Schatten in einem Spiel herbeigerufen.',
        lastTitle: 'Leeres Gedächtnis',
        platinumTitle: 'Schattengott',
        silverTitle: 'Schattenexperte',
      },
      en: {
        bronzeTitle: 'Shadow Summoner',
        description: 'Summon {n} shadows in a single game.',
        goldTitle: 'Shadow Master',
        lastDescription: 'Summoned 100 shadows in a single game.',
        lastTitle: 'Blank Memory',
        platinumTitle: 'Shadow God',
        silverTitle: 'Shadow Expert',
      },
      es: {
        bronzeTitle: 'Invocador de sombras',
        description: 'Invoca {n} sombras en una sola partida.',
        goldTitle: 'Maestro de sombras',
        lastDescription: 'Invocó 100 sombras en una sola partida.',
        lastTitle: 'Memoria en blanco',
        platinumTitle: 'Dios de las sombras',
        silverTitle: 'Experto en sombras',
      },
      fr: {
        bronzeTitle: "Invoqueur d'ombres",
        description: 'Invoquez {n} ombres en une seule partie.',
        goldTitle: 'Maître des ombres',
        lastDescription: 'Invoqué 100 ombres en une seule partie.',
        lastTitle: 'Mémoire en blanc',
        platinumTitle: 'Dieu des ombres',
        silverTitle: 'Expert en ombres',
      },
      it: {
        bronzeTitle: 'Evocatore di ombre',
        description: 'Evoca {n} ombre in una singola partita.',
        goldTitle: 'Maestro delle ombre',
        lastDescription: 'Evocato 100 ombre in una singola partita.',
        lastTitle: 'Memoria vuota',
        platinumTitle: 'Dio delle ombre',
        silverTitle: 'Esperto di ombre',
      },
      jp: {
        bronzeTitle: 'シャドウ召喚師',
        description: '1つのゲームで{n}個のシャドウを召喚する。',
        goldTitle: 'シャドウマスター',
        lastDescription: '1つのゲームで100個のシャドウを召喚した。',
        lastTitle: '記憶空白',
        platinumTitle: 'シャドウ神',
        silverTitle: 'シャドウエキスパート',
      },
      ko: {
        bronzeTitle: '섀도우 소환사',
        description: '한 게임에서 {n}개의 섀도우를 소환하세요.',
        goldTitle: '섀도우 마스터',
        lastDescription: '한 게임에서 100개의 섀도우를 소환했습니다.',
        lastTitle: '기억 공백',
        platinumTitle: '섀도우 신',
        silverTitle: '섀도우 전문가',
      },
      pt: {
        bronzeTitle: 'Invocador de sombras',
        description: 'Invoque {n} sombras em uma única partida.',
        goldTitle: 'Mestre das sombras',
        lastDescription: 'Invocou 100 sombras em uma única partida.',
        lastTitle: 'Memória em branco',
        platinumTitle: 'Deus das sombras',
        silverTitle: 'Especialista em sombras',
      },
      ru: {
        bronzeTitle: 'Призыватель теней',
        description: 'Призовите {n} теней в одной игре.',
        goldTitle: 'Мастер теней',
        lastDescription: 'Призвано 100 теней в одной игре.',
        lastTitle: 'Пустая память',
        platinumTitle: 'Бог теней',
        silverTitle: 'Эксперт по теням',
      },
      zh: {
        bronzeTitle: '陰影召喚師',
        description: '在一場比賽中召喚 {n} 個陰影。',
        goldTitle: '陰影大師',
        lastDescription: '在一場比賽中召喚了 100 個陰影。',
        lastTitle: '記憶空白',
        platinumTitle: '陰影之神',
        silverTitle: '陰影專家',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'game',
    getValue: () => {
      const { touchesState } = useTouches();
      return touchesState.summonedShadows;
    },
    id: 'manyShadows',
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
