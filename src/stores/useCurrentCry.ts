import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

import { useCurrentDex } from '@/composables/useCurrentDex.ts';
import { useCurrentStrategy } from '@/strategies/useCurrentStrategy.ts';
import type { PokemonInfo } from '@/types.ts';

type CurrentCryState = {
  currentPokemonCry: PokemonInfo | null;
};

export const useCurrentCry = defineStore('currentCry', () => {
  const currentCryState = reactive<CurrentCryState>({
    currentPokemonCry: null,
  });

  const setCurrentCry = (pokemon: PokemonInfo | null) => {
    currentCryState.currentPokemonCry = pokemon;
  };

  const clearCurrentCry = () => {
    currentCryState.currentPokemonCry = null;
  };

  const setRandomCurrentCry = () => {
    const { getRandomRemaining } = useCurrentDex();
    const strategy = useCurrentStrategy();
    const remainingEntry = getRandomRemaining();
    if (!remainingEntry) return;

    const pokemon = strategy.value.getShufflePokemon(remainingEntry);
    setCurrentCry(pokemon as PokemonInfo);
  };

  return {
    clearCurrentCry,
    currentCryState,
    setCurrentCry,
    setRandomCurrentCry,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCurrentCry, import.meta.hot));
}
