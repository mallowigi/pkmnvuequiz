import { useProfile } from '@/stores/useProfile.ts';
import type { Achievement, AchievementRank, AchievementConfig } from '@/types.ts';

const NOT_UNLOCKED_TIER = 999;

export const useAchievements = () => {
  const { getTotalWins, addAchievement } = useProfile();

  const createAchievement = (achievement: AchievementConfig): Achievement => {
    const { id, category, getValue, thresholds, lastTitle, lastDescription } = achievement;
    const count = Object.entries(thresholds).length;

    return {
      category,
      conditions: thresholds.map((threshold, i) => ({
        isSatisfied: () => getValue() >= threshold.val,
        tier: count - i,
      })),
      get description() {
        const found = thresholds.find((threshold) => getValue() < threshold.val);
        return found ? found.description : lastDescription;
      },
      id,
      get name() {
        const found = thresholds.find((threshold) => getValue() < threshold.val);
        return found ? found.nextTitle : lastTitle;
      },
      get nextStep() {
        const found = thresholds.find((threshold) => getValue() < threshold.val);
        return found ? found.val : undefined;
      },
      get progress() {
        return getValue();
      },
    };
  };

  // todo use i18n
  const achievements: Record<string, Achievement> = {
    firstWin: createAchievement({
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
    }),
    numWins: createAchievement({
      category: 'total',
      getValue: getTotalWins,
      id: 'numWins',
      lastDescription: 'Won a total of 500 games.',
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
    }),
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
