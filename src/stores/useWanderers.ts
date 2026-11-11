import { reactive } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';

interface WanderersState {
  enabled: boolean;
}

/** Session-only state for the decorative Wanderers walking in the background. */
export const useWanderers = defineStore('wanderers', () => {
  const state = reactive<WanderersState>({
    enabled: false,
  });

  const toggleWanderers = () => {
    state.enabled = !state.enabled;
  };

  return {
    state,
    toggleWanderers,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWanderers, import.meta.hot));
}
