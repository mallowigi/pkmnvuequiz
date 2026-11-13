import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

import { animatedSprites, loadAnimatedSprites, toSpriteKey } from '@/data/wanderingSprites.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import { sample } from '@/utils/utils.ts';

interface WanderersState {
  wanderers: Set<string>;
}

const NEW_WANDERER_RATE = 15;

export const useWanderers = defineStore('wanderers', () => {
  const wanderersState = reactive<WanderersState>({
    wanderers: new Set<string>(),
  });

  const pickWanderer = async () => {
    await loadAnimatedSprites();
    const { getFoundPokemon, getStatus } = usePokemons();
    const candidates = getFoundPokemon()
      .filter((p) => animatedSprites[p.id])
      .map((p) => toSpriteKey(p.id, getStatus(p).isShiny))
      .filter((key) => !wanderersState.wanderers.has(key));

    const pick = sample(candidates);
    if (pick) {
      wanderersState.wanderers.add(pick);
    }
  };

  const addNewWanderer = async () => {
    const { numFound } = usePokemons();
    if (numFound % NEW_WANDERER_RATE === 0) {
      await pickWanderer();
    }
  };

  const addWanderers = async () => {
    const { numFound } = usePokemons();
    resetWanderers();

    for (let i = 0; i < Math.floor(numFound / NEW_WANDERER_RATE); i++) {
      await pickWanderer();
    }
  };

  // Easter egg: every found Pokémon that has a sheet joins the party
  const addAllWanderers = async () => {
    await loadAnimatedSprites();
    const { getFoundPokemon, getStatus } = usePokemons();

    getFoundPokemon()
      .filter((p) => animatedSprites[p.id])
      .forEach((p) => wanderersState.wanderers.add(toSpriteKey(p.id, getStatus(p).isShiny)));
  };

  const resetWanderers = () => {
    wanderersState.wanderers.clear();
  };

  return {
    addAllWanderers,
    addNewWanderer,
    addWanderers,
    resetWanderers,
    wanderersState,
  };
};);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWanderers, import.meta.hot));
}
