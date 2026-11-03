import { useI18n } from 'vue-i18n';

import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useFirstWin = () => {
  const { getTotalWins } = useProfile();
  const { t } = useI18n({
    messages: {
      cn: {
        lastDescription: '赢得了你的第一场比赛。',
        lastTitle: '首次获胜',
      },
      de: {
        lastDescription: 'Gewann dein erstes Spiel.',
        lastTitle: 'Erster Sieg',
      },
      en: {
        lastDescription: 'Won your first game.',
        lastTitle: 'First Win',
      },
      es: {
        lastDescription: 'Ganaste tu primer juego.',
        lastTitle: 'Primer victoria',
      },
      fr: {
        lastDescription: 'A remporté votre premier jeu.',
        lastTitle: 'Première victoire',
      },
      it: {
        lastDescription: 'Hai vinto la tua prima partita.',
        lastTitle: 'Prima vittoria',
      },
      jp: {
        lastDescription: '最初のゲームに勝利しました。',
        lastTitle: '初勝利',
      },
      ko: {
        lastDescription: '첫 번째 게임에서 승리했습니다.',
        lastTitle: '첫 승리',
      },
      pt: {
        lastDescription: 'Ganhou o seu primeiro jogo.',
        lastTitle: 'Primeira vitória',
      },
      ru: {
        lastDescription: 'Выиграл свою первую игру.',
        lastTitle: 'Первая победа',
      },
      zh: {
        lastDescription: '赢得了你的第一场比赛。',
        lastTitle: '首次获胜',
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
