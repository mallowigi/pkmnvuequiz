import { acceptHMRUpdate, defineStore } from 'pinia';
import { reactive } from 'vue';

import type { Achievement } from '@/types.ts';

export interface AchievementToast {
  uid: number;
  achievement: Achievement;
  tier: number;
}

interface AchievementToastsState {
  achievements: AchievementToast[];
}

let nextUid = 0;

export const useAchievementToasts = defineStore('achievementToasts', () => {
  const state = reactive<AchievementToastsState>({
    achievements: [],
  });

  const showAchievement = (achievement: Achievement, tier: number) => {
    const uid = nextUid++;
    state.achievements.push({ achievement, tier, uid });

    setTimeout(() => {
      state.achievements = state.achievements.filter((a) => a.uid !== uid);
    }, 5000);
  };

  const clearAchievements = () => {
    state.achievements = [];
  };

  return {
    clearAchievements,
    showAchievement,
    state,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAchievementToasts, import.meta.hot));
}
