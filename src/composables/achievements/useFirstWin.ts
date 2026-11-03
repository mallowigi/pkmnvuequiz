import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useFirstWin = () => {
  const { getTotalWins } = useProfile();

  return createAchievement({
    category: 'total',
    getValue: getTotalWins,
    id: 'firstWin',
    lastDescription: 'Won your first game.',
    lastTitle: 'First Win',
    thresholds: [
      {
        description: 'Win your first game.',
        nextTitle: 'First Win',
        rank: 'platinum',
        val: 1,
      },
    ],
  });
};
