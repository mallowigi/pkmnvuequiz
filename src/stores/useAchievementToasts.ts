import { acceptHMRUpdate, defineStore } from 'pinia';
import { reactive } from 'vue';

import type { Achievement } from '@/types.ts';

interface AchivementToastsState {
  achievements: Achievement[];
}

export const useAchievementToasts = defineStore('achievementToasts', () => {
  const state = reactive<AchivementToastsState>({
    achievements: [],
  });

  const showAchievement = (achievement: Achievement) => {
    state.achievements.push({
      ...achievement,
    });

    setTimeout(() => {
      state.achievements = state.achievements.filter((a) => a.id !== achievement.id);
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
