import { useI18n } from 'vue-i18n';

import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useBestTimeFull = () => {
  const { getBestTimeFull } = useProfile();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '快速',
        description: '在 {n} 分钟内完成完整模式游戏。',
        goldTitle: '极速',
        lastDescription: '在 30 分钟内完成了完整模式游戏。',
        lastTitle: '光速',
        platinumTitle: '闪电',
        silverTitle: '迅速',
      },
      de: {
        bronzeTitle: 'Schnell',
        description: 'Beende ein Full-Mode-Spiel in unter {n} Minuten.',
        goldTitle: 'Blitzschnell',
        lastDescription: 'Full-Mode-Spiel in unter 30 Minuten beendet.',
        lastTitle: 'Lichtgeschwindigkeit',
        platinumTitle: 'Blitz',
        silverTitle: 'Flott',
      },
      en: {
        bronzeTitle: 'Fast',
        description: 'Finish a Full mode game under {n} minutes.',
        goldTitle: 'Lightning',
        lastDescription: 'Finished a Full mode game under 30 minutes.',
        lastTitle: 'Light Speed',
        platinumTitle: 'Flash',
        silverTitle: 'Quick',
      },
      es: {
        bronzeTitle: 'Rápido',
        description: 'Termina un juego de modo Completo en menos de {n} minutos.',
        goldTitle: 'Relámpago',
        lastDescription: 'Terminó un juego de modo Completo en menos de 30 minutos.',
        lastTitle: 'Velocidad de la luz',
        platinumTitle: 'Destello',
        silverTitle: 'Ágil',
      },
      fr: {
        bronzeTitle: 'Rapide',
        description: 'Terminez un jeu en mode Complet en moins de {n} minutes.',
        goldTitle: 'Éclair',
        lastDescription: 'Terminé un jeu en mode Complet en moins de 30 minutes.',
        lastTitle: 'Vitesse lumière',
        platinumTitle: 'Flash',
        silverTitle: 'Vite',
      },
      it: {
        bronzeTitle: 'Veloce',
        description: 'Completa una partita in modalità Completa in meno di {n} minuti.',
        goldTitle: 'Fulmineo',
        lastDescription: 'Completata una partita in modalità Completa in meno di 30 minuti.',
        lastTitle: 'Velocità della luce',
        platinumTitle: 'Lampo',
        silverTitle: 'Presto',
      },
      jp: {
        bronzeTitle: '速い',
        description: 'フルモードを{n}分以内にクリアする。',
        goldTitle: '稲妻',
        lastDescription: 'フルモードを30分以内にクリアした。',
        lastTitle: '光速',
        platinumTitle: '閃光',
        silverTitle: '素早い',
      },
      ko: {
        bronzeTitle: '빠른',
        description: '풀 모드 게임을 {n}분 이내에 완료하세요.',
        goldTitle: '번개',
        lastDescription: '풀 모드 게임을 30분 이내에 완료했습니다.',
        lastTitle: '광속',
        platinumTitle: '플래시',
        silverTitle: '민첩한',
      },
      pt: {
        bronzeTitle: 'Rápido',
        description: 'Termine um jogo no modo Completo em menos de {n} minutos.',
        goldTitle: 'Relâmpago',
        lastDescription: 'Terminou um jogo no modo Completo em menos de 30 minutos.',
        lastTitle: 'Velocidade da luz',
        platinumTitle: 'Flash',
        silverTitle: 'Ágil',
      },
      ru: {
        bronzeTitle: 'Быстрый',
        description: 'Завершите игру в полном режиме менее чем за {n} минут.',
        goldTitle: 'Молниеносный',
        lastDescription: 'Завершена игра в полном режиме менее чем за 30 минут.',
        lastTitle: 'Скорость света',
        platinumTitle: 'Вспышка',
        silverTitle: 'Скорый',
      },
      zh: {
        bronzeTitle: '快速',
        description: '在 {n} 分鐘內完成完整模式遊戲。',
        goldTitle: '極速',
        lastDescription: '在 30 分鐘內完成了完整模式遊戲。',
        lastTitle: '光速',
        platinumTitle: '閃電',
        silverTitle: '迅速',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'timer',
    getValue: () => {
      const best = getBestTimeFull();
      if (best === 0) return 0;
      if (best <= 1800) return 4; // 30 minutes
      if (best <= 3600) return 3; // 1 hour
      if (best <= 7200) return 2; // 2 hours
      if (best <= 14400) return 1; // 4 hours
      return 0;
    },
    id: 'bestTimeFull',
    get lastDescription() {
      return t('lastDescription');
    },
    get lastTitle() {
      return t('lastTitle');
    },
    priority: 1,
    thresholds: [
      {
        get description() {
          return t('description', { n: 240 });
        },
        get nextTitle() {
          return t('bronzeTitle');
        },
        rank: 'bronze',
        val: 1,
      },
      {
        get description() {
          return t('description', { n: 120 });
        },
        get nextTitle() {
          return t('silverTitle');
        },
        rank: 'silver',
        val: 2,
      },
      {
        get description() {
          return t('description', { n: 60 });
        },
        get nextTitle() {
          return t('goldTitle');
        },
        rank: 'gold',
        val: 3,
      },
      {
        get description() {
          return t('description', { n: 30 });
        },
        get nextTitle() {
          return t('platinumTitle');
        },
        rank: 'platinum',
        val: 4,
      },
    ],
  });
};
