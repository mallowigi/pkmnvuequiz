import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

interface WanderersState {
  enabled: boolean;
}

/** Session-only state for the decorative Wanderers walking in the background. */
export const useWanderers = defineStore('wanderers', () => {
  const wanderersState = reactive<WanderersState>({
    enabled: true,
  });

  const toggleWanderers = () => {
    wanderersState.enabled = !wanderersState.enabled;
  };

  return {
    toggleWanderers,
    wanderersState,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWanderers, import.meta.hot));
}
