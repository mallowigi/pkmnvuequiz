import { useI18n } from 'vue-i18n';

import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useFirstWin = () => {
  const { getTotalWins } = useProfile();
  const { t } = useI18n({
    messages: {
      cn: {
        lastDescription: '赢得第一场比赛。',
        lastTitle: '首次获胜',
      },
      de: {
        lastDescription: 'Erstes Spiel gewonnen.',
        lastTitle: 'Erster Sieg',
      },
      en: {
        lastDescription: 'Won your first game.',
        lastTitle: 'First Win',
      },
      es: {
        lastDescription: 'Primera partida ganada.',
        lastTitle: 'Primera victoria',
      },
      fr: {
        lastDescription: 'Première partie remportée.',
        lastTitle: 'Première victoire',
      },
      it: {
        lastDescription: 'Prima partita vinta.',
        lastTitle: 'Prima vittoria',
      },
      jp: {
        lastDescription: '最初のゲームに勝利。',
        lastTitle: '初勝利',
      },
      ko: {
        lastDescription: '첫 번째 게임 승리.',
        lastTitle: '첫 승리',
      },
      pt: {
        lastDescription: 'Primeira partida ganha.',
        lastTitle: 'Primeira vitória',
      },
      ru: {
        lastDescription: 'Выиграна первая игра.',
        lastTitle: 'Первая победа',
      },
      zh: {
        lastDescription: '贏得第一場比賽。',
        lastTitle: '首次獲勝',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'total',
    getValue: getTotalWins,
    id: 'firstWin',
    get lastDescription() {
      return t('lastDescription');
    },
    get lastTitle() {
      return t('lastTitle');
    },
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
