import { useAchievementsRegistry } from '@/composables/achievements/useAchievementsRegistry.ts';
import { useProfile } from '@/stores/useProfile.ts';
import type { AchievementRank } from '@/types.ts';

const NOT_UNLOCKED_TIER = 999;

export const useAchievements = () => {
  const { addAchievement } = useProfile();
  const achievements = useAchievementsRegistry();

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

  const toRank = (tier: number): AchievementRank | null => {
    switch (tier) {
      case 1:
        return 'platinum';
      case 2:
        return 'gold';
      case 3:
        return 'silver';
      case 4:
        return 'bronze';
      default:
        return null;
    }
  };

  return {
    achievements,
    checkAchievements,
    getAchievementTier,
    toRank,
  };
};
