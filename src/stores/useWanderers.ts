import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive, computed } from 'vue';

import { useCurrentDex } from '@/composables/useCurrentDex.ts';
import { animatedSprites } from '@/data/wanderingSprites.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import { sample } from '@/utils/utils.ts';

interface WanderersState {
  wanderers: Set<number>;
  enabled: boolean;
}

const NEW_WANDERER_RATE = 1;

export const useWanderers = defineStore('wanderers', () => {
  const wanderersState = reactive<WanderersState>({
    enabled: true,
    wanderers: new Set<number>(),
  });

  const toggleWanderers = () => {
    wanderersState.enabled = !wanderersState.enabled;
  };

  const addNewWanderer = () => {
    const { getFoundPokemon, numFound } = usePokemons();

    if (numFound % NEW_WANDERER_RATE === 0) {
      const candidates = getFoundPokemon().filter(
        (p) => animatedSprites[p.dexNum] && !wanderersState.wanderers.has(p.dexNum),
      );

      const pick = sample(candidates);
      if (pick) {
        wanderersState.wanderers.add(pick.dexNum);
      }
    }
  };

  const resetWanderers = () => {
    wanderersState.wanderers.clear();
  };

  return {
    addNewWanderer,
    resetWanderers,
    toggleWanderers,
    wanderersState,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWanderers, import.meta.hot));
}
