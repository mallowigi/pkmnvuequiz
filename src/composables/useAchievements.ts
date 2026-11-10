import { useAchievementsRegistry } from '@/composables/achievements/useAchievementsRegistry.ts';
import { useAchievementToasts } from '@/stores/useAchievementToasts.ts';
import { useTouches } from '@/stores/useTouches.ts';
import { useProfile } from '@/stores/useProfile.ts';
import type { AchievementRank } from '@/types.ts';

const NOT_UNLOCKED_TIER = 999;

export const toRank = (tier: number): AchievementRank | null => {
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

export const useAchievements = () => {
  const { addAchievement, removeAchievement } = useProfile();
  const achievements = useAchievementsRegistry();

  const getAchievementTier = (achievementId: string): number => {
    const achievement = achievements[achievementId];
    if (!achievement) return NOT_UNLOCKED_TIER;

    const { profileState } = useProfile();
    if (!profileState.achievements) return NOT_UNLOCKED_TIER;

    return profileState.achievements[achievementId] || NOT_UNLOCKED_TIER;
  };

  const checkAchievements = ({ silent = false }: { silent?: boolean } = {}) => {
    const { showAchievement } = useAchievementToasts();

    Object.values(achievements).forEach((achievement) => {
      const ownAchievementTier = getAchievementTier(achievement.id);
      // If the user already has the highest tier for this achievement, no need to check further
      if (ownAchievementTier === 1) return;

      // Tiers are ranked 1 (platinum) to 4 (bronze): unlock only the best satisfied tier, and only if it's an upgrade.
      const bestTier = achievement.conditions
        .filter((condition) => condition.tier < ownAchievementTier && condition.isSatisfied())
        .reduce<number>((best, condition) => Math.min(best, condition.tier), NOT_UNLOCKED_TIER);

      if (bestTier === NOT_UNLOCKED_TIER) return;

      addAchievement(achievement.id, bestTier);
      if (!silent) {
        showAchievement(achievement);
      }
    });
  };

  // Testing helper: forget a saved tier (and the per-game counter behind it) so it can unlock again.
  const resetManyTouches = () => {
    const { touchesState } = useTouches();
    touchesState.summonedCries = 0;
    removeAchievement('manyTouches');
  };

  return {
    achievements,
    checkAchievements,
    getAchievementTier,
    resetManyTouches,
    toRank,
  };
};
