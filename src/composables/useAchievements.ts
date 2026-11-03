import { useProfile } from '@/stores/useProfile.ts';
// import { useTouches } from '@/stores/useTouches.ts';
import type { Achievement, AchievementRank } from '@/types.ts';

const NOT_UNLOCKED_TIER = 999;

export const useAchievements = () => {
  // const { touchesState } = useTouches();
  const { getTotalWins, addAchievement } = useProfile();

  // todo use i18n
  const achievements: Record<string, Achievement> = {
    firstWin: {
      category: 'total',
      conditions: [
        {
          isSatisfied: () => getTotalWins() >= 1,
          tier: 1,
        },
      ],
      description: 'Win your first game.',
      id: 'firstWin',
      name: 'First Win',
    },
    numWins: {
      category: 'total',
      conditions: [
        {
          isSatisfied: () => getTotalWins() >= 10,
          tier: 4,
        },
        {
          isSatisfied: () => getTotalWins() >= 50,
          tier: 3,
        },
        {
          isSatisfied: () => getTotalWins() >= 100,
          tier: 2,
        },
        {
          isSatisfied: () => getTotalWins() >= 500,
          tier: 1,
        },
      ],
      get description() {
        return `Win a total of ${this.nextStep} games.`;
      },
      id: 'numWins',
      get name() {
        const totalWins = getTotalWins();
        if (totalWins < 10) return 'Player';
        if (totalWins < 50) return 'Aficionado';
        if (totalWins < 100) return 'Expert';
        if (totalWins < 500) return 'Master';
        return 'Professor';
      },
      get nextStep() {
        const totalWins = getTotalWins();
        if (totalWins < 10) return 10;
        if (totalWins < 50) return 50;
        if (totalWins < 100) return 100;
        if (totalWins < 500) return 500;
        return totalWins; // Already maxed out
      },
      get progress() {
        return getTotalWins();
      },
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
