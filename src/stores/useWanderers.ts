import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive, computed } from 'vue';

import { useCurrentDex } from '@/composables/useCurrentDex.ts';

interface WanderersState {
  wanderers: number[];
  enabled: boolean;
}

// Add a wanderer every 15 found Pokémon, up to a maximum of 10 wanderers.
const NEW_WANDERER_RATE = 15;

/** Session-only state for the decorative Wanderers walking in the background. */
export const useWanderers = defineStore('wanderers', () => {
  const wanderersState = reactive<WanderersState>({
    enabled: true,
    wanderers: [],
  });

  const wandererCount = computed(() => {
    const { numFound } = useCurrentDex();
    return Math.floor(numFound.value / NEW_WANDERER_RATE);
  });

  const toggleWanderers = () => {
    wanderersState.enabled = !wanderersState.enabled;
  };

  return {
    toggleWanderers,
    wandererCount,
    wanderersState,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWanderers, import.meta.hot));
}
