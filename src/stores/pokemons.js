import { useState } from '@/stores/state.js';
import { usePkmnData } from '@/stores/pkmnStore.js';
import { useCurrentGen } from '@/stores/gen.js';
import { useCurrentType } from '@/stores/currentType.js';

const removeDuplicates = (pokemons) => {
  const seen = new Set();

  return pokemons.filter((pok) => {
    if (seen.has(pok.baseName)) {
      return false;
    }
    seen.add(pok.baseName);
    return true;
  });
};

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

    const filtered = data.pokemon.filter(pok => boxes.includes(pok.box));
    return removeDuplicates(filtered);
  };

  const getCurrentTypePokemon = () => {
    if (!data || !data.pokemon) {
      return [];
    }

    const currentType = getCurrentType();
    if (!currentType) {
      return [];
    }

    const filtered = data.pokemon.filter(pok => {
      const types = [pok.primaryType, pok.secondaryType].filter(Boolean);
      return types.includes(currentType.id);
    });

    return removeDuplicates(filtered);
  };

  const getSpecialTypePokemon = () => {
    if (!data || !data.pokemon) {
      return [];
    }

    const filtered = data.pokemon.filter(pok => {
      const types = ['legendary', 'sub-legendary', 'mythical'].filter(Boolean);
      return types.includes(pok.specialType);
    });

    return removeDuplicates(filtered);
  };

  const getTotalPokemon = () => {
    if (!data || !data.pokemon) {
      return [];
    }

    return removeDuplicates(data.pokemon);
  };

  const getPokemon = () => {
    const gameMode = state.gameMode;
    switch (gameMode) {
      case 'gen':
        return getCurrentGenPokemon();
      case 'types':
        return getCurrentTypePokemon();
      case 'special':
        return getSpecialTypePokemon();
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