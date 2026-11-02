import { useProfile } from '@/stores/useProfile.ts';
// import { useTouches } from '@/stores/useTouches.ts';
import type { Achievement } from '@/types.ts';

export const useAchievements = () => {
  // const { touchesState } = useTouches();
  const { getTotalWins } = useProfile();

  // todo use i18n
  const achievements: Record<string, Achievement> = {
    firstWin: {
      category: 'wins',
      conditions: [
        {
          condition: () => getTotalWins() >= 1,
          type: 'gold',
        },
      ],
      description: 'Win your first game.',
      id: 'firstWin',
      name: 'First Win',
    },
    numWins: {
      category: 'counter',
      conditions: [
        {
          condition: () => getTotalWins() >= 10,
          type: 'bronze',
        },
        {
          condition: () => getTotalWins() >= 50,
          type: 'silver',
        },
        {
          condition: () => getTotalWins() >= 100,
          type: 'gold',
        },
      ],
      description: 'Win a total of 10, 50, and 100 games.',
      id: 'numWins',
      name: 'Number of Wins',
    },
  };

  return {
    achievements,
  };
};
