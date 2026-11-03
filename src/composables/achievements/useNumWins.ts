import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useNumWins = () => {
  const { getTotalWins } = useProfile();

  return createAchievement({
    category: 'total',
    getValue: getTotalWins,
    id: 'numWins',
    lastDescription: 'Won more than 500 games.',
    lastTitle: 'Professor',
    thresholds: [
      {
        description: 'Win a total of 10 games.',
        nextTitle: 'Skilled',
        rank: 'bronze',
        val: 10,
      },
      {
        description: 'Win a total of 50 games.',
        nextTitle: 'Aficionado',
        rank: 'silver',
        val: 50,
      },
      {
        description: 'Win a total of 100 games.',
        nextTitle: 'Expert',
        rank: 'gold',
        val: 100,
      },
      {
        description: 'Win a total of 500 games.',
        nextTitle: 'Master',
        rank: 'platinum',
        val: 500,
      },
    ],
  });
};
