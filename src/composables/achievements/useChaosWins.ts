import { useI18n } from 'vue-i18n';

import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useChaosWins = () => {
  const { getChaosWins } = useProfile();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '混乱爱好者',
        description: '完成 {n} 场混乱模式游戏。',
        goldTitle: '混乱专家',
        lastDescription: '完成了超过 500 场混乱模式游戏。',
        lastTitle: '混乱狂热者',
        platinumTitle: '混乱大师',
        silverTitle: '混乱学者',
      },
      de: {
        bronzeTitle: 'Chaos-Enthusiast',
        description: 'Schließe {n} Chaos-Spiele ab.',
        goldTitle: 'Chaos-Experte',
        lastDescription: 'Mehr als 500 Chaos-Spiele abgeschlossen.',
        lastTitle: 'Chaos-Fanatiker',
        platinumTitle: 'Chaos-Meister',
        silverTitle: 'Chaos-Forscher',
      },
      en: {
        bronzeTitle: 'Chaos Enthusiast',
        description: 'Finish {n} chaos mode games.',
        goldTitle: 'Chaos Expert',
        lastDescription: 'Finished more than 500 chaos mode games.',
        lastTitle: 'Chaos Fanatic',
        platinumTitle: 'Chaos Master',
        silverTitle: 'Chaos Scholar',
      },
      es: {
        bronzeTitle: 'Entusiasta del caos',
        description: 'Completa {n} partidas de modo caos.',
        goldTitle: 'Experto del caos',
        lastDescription: 'Más de 500 partidas de modo caos completadas.',
        lastTitle: 'Fanático del caos',
        platinumTitle: 'Maestro del caos',
        silverTitle: 'Erudito del caos',
      },
      fr: {
        bronzeTitle: 'Passionné du chaos',
        description: 'Terminez {n} parties en mode chaos.',
        goldTitle: 'Expert du chaos',
        lastDescription: 'Plus de 500 parties en mode chaos terminées.',
        lastTitle: 'Fanatique du chaos',
        platinumTitle: 'Maître du chaos',
        silverTitle: 'Érudit du chaos',
      },
      it: {
        bronzeTitle: 'Appassionato del caos',
        description: 'Completa {n} partite in modalità caos.',
        goldTitle: 'Esperto del caos',
        lastDescription: 'Più di 500 partite in modalità caos completate.',
        lastTitle: 'Fanatico del caos',
        platinumTitle: 'Maestro del caos',
        silverTitle: 'Studioso del caos',
      },
      jp: {
        bronzeTitle: 'カオス愛好家',
        description: 'カオスモードを{n}回クリア。',
        goldTitle: 'カオスエキスパート',
        lastDescription: 'カオスモードを500回以上クリア。',
        lastTitle: 'カオス熱狂者',
        platinumTitle: 'カオスマスター',
        silverTitle: 'カオス学者',
      },
      ko: {
        bronzeTitle: '카오스 애호가',
        description: '카오스 모드 게임을 {n}회 완료하세요.',
        goldTitle: '카오스 전문가',
        lastDescription: '카오스 모드 게임을 500회 이상 완료.',
        lastTitle: '카오스 열성 팬',
        platinumTitle: '카오스 마스터',
        silverTitle: '카오스 학자',
      },
      pt: {
        bronzeTitle: 'Entusiasta do caos',
        description: 'Complete {n} partidas no modo caos.',
        goldTitle: 'Especialista do caos',
        lastDescription: 'Mais de 500 partidas no modo caos completadas.',
        lastTitle: 'Fanático do caos',
        platinumTitle: 'Mestre do caos',
        silverTitle: 'Erudito do caos',
      },
      ru: {
        bronzeTitle: 'Энтузиаст хаоса',
        description: 'Завершите {n} игр в режиме хаоса.',
        goldTitle: 'Эксперт хаоса',
        lastDescription: 'Завершено более 500 игр в режиме хаоса.',
        lastTitle: 'Фанатик хаоса',
        platinumTitle: 'Мастер хаоса',
        silverTitle: 'Ученый хаоса',
      },
      zh: {
        bronzeTitle: '混亂愛好者',
        description: '完成 {n} 場混亂模式遊戲。',
        goldTitle: '混亂專家',
        lastDescription: '完成了超過 500 場混亂模式遊戲。',
        lastTitle: '混亂狂熱者',
        platinumTitle: '混亂大師',
        silverTitle: '混亂學者',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'total',
    getValue: getChaosWins,
    id: 'chaosWins',
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
