import { computed } from 'vue';

export const useFeatureFlags = () => {
  const isDebugMode = computed(() => {
    return import.meta.env.VITE_DEBUG_MODE === 'true';
  });

  return {
    isDebugMode,
  };
};
