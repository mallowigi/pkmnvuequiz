import { useState } from '@/stores/state.js';
import { usePkmnData } from '@/stores/pkmnStore.js';
import { useCurrentGen } from '@/stores/gen.js';
import { useCurrentType } from '@/stores/currentType.js';

export const usePokemons = () => {
  const { state } = useState();
  const { getCurrentGen } = useCurrentGen();
  const { getCurrentType } = useCurrentType();
  const { data } = usePkmnData();

  const getCurrentGenPokemon = () => {
    if (!data || !data.pokemon) {
      return [];
    }

    const currentGen = getCurrentGen();
    const boxes = currentGen?.boxes ?? [];
    if (!boxes.length) {
      return [];
    }

    return data.pokemon.filter(pok => boxes.includes(pok.box));
  };

  const getCurrentTypePokemon = () => {
    if (!data || !data.pokemon) {
      return [];
    }

    const currentType = getCurrentType();
    if (!currentType) {
      return [];
    }

    return data.pokemon.filter(pok => {
      const types = [pok.baseType, pok.secondaryType].filter(Boolean);
      return types.includes(currentType.id);
    });
  };

  const getTotalPokemon = () => {
    if (!data || !data.pokemon) {
      return [];
    }

    return data.pokemon;
  };

  const getPokemon = () => {
    const gameMode = state.gameMode;
    switch (gameMode) {
      case 'gen':
        return getCurrentGenPokemon();
      case 'types':
        return getCurrentTypePokemon();
      case 'full':
        return getTotalPokemon();
      default:
        return [];
    }
  };

  return {
    getCurrentGenPokemon,
    getCurrentTypePokemon,
    getTotalPokemon,
    getPokemon,
  };
};