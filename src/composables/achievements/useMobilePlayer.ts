import { useI18n } from 'vue-i18n';

import { useGlobalStats } from '@/stores/useGlobalStats.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useMobilePlayer = () => {
  const { t } = useI18n({
    messages: {
      cn: {
        lastDescription: '在手机上玩过游戏。',
        lastTitle: '手机玩家',
      },
      de: {
        lastDescription: 'Ein Spiel auf dem Handy gespielt.',
        lastTitle: 'Handy-Spieler',
      },
      en: {
        lastDescription: 'Played a game on mobile.',
        lastTitle: 'Mobile Player',
      },
      es: {
        lastDescription: 'Jugó una partida en el móvil.',
        lastTitle: 'Jugador móvil',
      },
      fr: {
        lastDescription: 'Joué une partie sur mobile.',
        lastTitle: 'Joueur mobile',
      },
      it: {
        lastDescription: 'Giocato una partita da cellulare.',
        lastTitle: 'Giocatore mobile',
      },
      jp: {
        lastDescription: 'モバイルでゲームをプレイした。',
        lastTitle: 'モバイルプレイヤー',
      },
      ko: {
        lastDescription: '모바일에서 게임을 플레이했습니다.',
        lastTitle: '모바일 플레이어',
      },
      pt: {
        lastDescription: 'Jogou uma partida no celular.',
        lastTitle: 'Jogador móvel',
      },
      ru: {
        lastDescription: 'Сыграна партия на мобильном.',
        lastTitle: 'Мобильный игрок',
      },
      zh: {
        lastDescription: '在手機上玩過遊戲。',
        lastTitle: '手機玩家',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'misc',
    getValue: () => {
      const { statsState } = useGlobalStats();
      return statsState.mobilePlays;
    },
    id: 'mobilePlayer',
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
          return t('lastDescription');
        },
        get nextTitle() {
          return t('lastTitle');
        },
        rank: 'platinum',
        val: 1,
      },
    ],
  });
};
