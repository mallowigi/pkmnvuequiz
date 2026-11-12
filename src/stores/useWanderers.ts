import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

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

  const pickWanderer = () => {
    const { getFoundPokemon } = usePokemons();
    const candidates = getFoundPokemon().filter(
      (p) => animatedSprites[p.dexNum] && !wanderersState.wanderers.has(p.dexNum),
    );

    const pick = sample(candidates);
    if (pick) {
      wanderersState.wanderers.add(pick.dexNum);
    }
  };

  const addNewWanderer = () => {
    const { numFound } = usePokemons();
    if (numFound % NEW_WANDERER_RATE === 0) {
      pickWanderer();
    }
  };

  const addWanderers = () => {
    const { numFound } = usePokemons();
    resetWanderers();

    for (let i = 0; i < Math.floor(numFound / NEW_WANDERER_RATE); i++) {
      pickWanderer();
    }
  };

  const resetWanderers = () => {
    wanderersState.wanderers.clear();
  };

  return {
    addNewWanderer,
    addWanderers,
    resetWanderers,
    toggleWanderers,
    wanderersState,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWanderers, import.meta.hot));
}
