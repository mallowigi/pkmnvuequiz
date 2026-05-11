import { reactive } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';

interface CreditsState {
  showCredits: boolean;
}

export const useCredits = defineStore('credits', () => {
  const credits = reactive<CreditsState>({
    showCredits: false,
  });

  const toggleShowCredits = () => {
    credits.showCredits = !credits.showCredits;
  };

  return {
    credits,
    toggleShowCredits,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCredits, import.meta.hot));
}
