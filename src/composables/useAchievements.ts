import { useProfile } from '@/stores/useProfile.ts';
// import { useTouches } from '@/stores/useTouches.ts';
import type { Achievement } from '@/types.ts';

const NOT_UNLOCKED_TIER = 999;

export const useAchievements = () => {
  // const { touchesState } = useTouches();
  const { getTotalWins, addAchievement } = useProfile();

  // todo use i18n
  const achievements: Record<string, Achievement> = {
    firstWin: {
      category: 'wins',
      conditions: [
        {
          isSatisfied: () => getTotalWins() >= 1,
          rank: 'gold',
          tier: 1,
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
          isSatisfied: () => getTotalWins() >= 10,
          rank: 'bronze',
          tier: 4,
        },
        {
          isSatisfied: () => getTotalWins() >= 50,
          rank: 'silver',
          tier: 3,
        },
        {
          isSatisfied: () => getTotalWins() >= 100,
          rank: 'gold',
          tier: 2,
        },
        {
          isSatisfied: () => getTotalWins() >= 500,
          rank: 'platinum',
          tier: 1,
        },
      ],
      description: 'Win a total of 10, 50, 100, and 500 games.',
      id: 'numWins',
      name: 'Number of Wins',
    },
  };

  const getAchievementTier = (achievementId: string): number => {
    const achievement = achievements[achievementId];
    if (!achievement) return NOT_UNLOCKED_TIER;

    const { profileState } = useProfile();
    if (!profileState.achievements) return NOT_UNLOCKED_TIER;

    return profileState.achievements[achievementId] || NOT_UNLOCKED_TIER;
  };

  const checkAchievements = () => {
    Object.values(achievements).forEach((achievement) => {
      const ownAchievementTier = getAchievementTier(achievement.id);
      // If the user already has the highest tier for this achievement, no need to check further
      if (ownAchievementTier === 1) return;

      for (const condition of achievement.conditions) {
        // Only check for conditions whose tier is higher than the user's current tier for this achievement
        if (condition.tier < ownAchievementTier && condition.isSatisfied()) {
          addAchievement(achievement.id, condition.tier);
          // Show a toast or something
        }
      }
    });
  };

  return {
    achievements,
    checkAchievements,
    getAchievementTier,
  };
};
