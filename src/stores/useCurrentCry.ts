import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

import { usePlaySounds } from '@/composables/usePlaySounds.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
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
    const { getRandomPokemon } = usePokemons();
    const { playPokemonCry } = usePlaySounds();
    const pokemon = getRandomPokemon();

    if (!pokemon) {
      clearCurrentCry();
      return;
    }

    setCurrentCry(pokemon);
    playPokemonCry(pokemon.dexNum);
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
