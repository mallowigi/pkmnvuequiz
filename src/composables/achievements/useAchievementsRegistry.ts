import { useFirstWin } from '@/composables/achievements/useFirstWin.ts';
import { useNumWins } from '@/composables/achievements/useNumWins.ts';
import type { Achievement } from '@/types.ts';

export const useAchievementsRegistry = (): Record<string, Achievement> => {
  return {
    firstWin: useFirstWin(),
    numWins: useNumWins(),
  };
};
