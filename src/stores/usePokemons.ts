import { reactive, readonly } from 'vue';

import { useCurrentGen } from '@/stores/useCurrentGen';
import { useCurrentType } from '@/stores/useCurrentType';
import { useMessages } from '@/stores/useMessages.ts';
import { usePkmnData } from '@/stores/usePkmnStore';
import { useState } from '@/stores/useState';
import type { PokemonInfo, PokemonProgressState, RegionBox, Type } from '@/types.ts';

const pokemonState: PokemonProgressState = reactive<PokemonProgressState>({
  numFound: 0,
  numShadows: 0,
  pokemonFound: new Set<string>(),
  pokemonShadowed: new Set<string>(),
});

const removeDuplicates = (pokemons: PokemonInfo[] | readonly PokemonInfo[]) => {
  const seen = new Set();

  return pokemons.filter((pok: PokemonInfo) => {
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
  const { showUserMessage } = useMessages();

  const addFound = () => {
    pokemonState.numFound += 1;
  };

  const addShadow = () => {
    pokemonState.numShadows += 1;
  };

  const setPokemonState = (newState: Partial<PokemonProgressState>) => {
    Object.assign(pokemonState, newState);
  };

  const resetPokemonState = () => {
    Object.assign(pokemonState, {
      numFound: 0,
      numShadows: 0,
      pokemonFound: new Set<string>(),
      pokemonShadowed: new Set<string>(),
    });
  };

  const getGenPokemon = (genId: RegionBox) => {
    if (!data || !data.pokemon) {
      return [];
    }

    const filtered = data.pokemon.filter((pok) => pok.box === genId);
    return removeDuplicates(filtered);
  };

  const getCurrentGenPokemon = () => {
    if (!data || !data.pokemon) {
      return [];
    }

    const currentGen = getCurrentGen();
    const boxes = currentGen?.boxes ?? [];
    if (!boxes.length) {
      return [];
    }

    const filtered = data.pokemon.filter((pok) => boxes.includes(pok.box));
    return removeDuplicates(filtered);
  };

  const getTypePokemon = (typeId: Type) => {
    if (!data || !data.pokemon) {
      return [];
    }

    const filtered = data.pokemon.filter((pok) => {
      const types = [pok.primaryType, pok.secondaryType].filter(Boolean);
      return types.includes(typeId);
    });

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

    const filtered = data.pokemon.filter((pok) => {
      const types = [pok.primaryType, pok.secondaryType].filter(Boolean);
      return types.includes(currentType.id);
    });

    return removeDuplicates(filtered);
  };

  const getSpecialTypePokemon = () => {
    if (!data || !data.pokemon) {
      return [];
    }

    const filtered = data.pokemon.filter((pok) => {
      const types = ['legendary', 'sub-legendary', 'mythical'].filter(Boolean);
      return types.includes(pok.specialType);
    });

    return removeDuplicates(filtered);
  };

  const getAllPokemon = () => {
    if (!data || !data.pokemon) {
      return [];
    }

    return removeDuplicates(data.pokemon);
  };

  const getCurrentGameModePokemon = () => {
    const gameMode = state.gameMode;
    switch (gameMode) {
      case 'gen':
        return getCurrentGenPokemon();
      case 'types':
        return getCurrentTypePokemon();
      case 'special':
        return getSpecialTypePokemon();
      case 'full':
        return getAllPokemon();
      default:
        return [];
    }
  };

  const findPokemon = (name: string) => {
    if (pokemonState.pokemonFound.has(name.toLowerCase())) {
      showUserMessage(`You've already found ${name}!`);
      return;
    }

    // TODO: Need to know how to handle pokemon that contain other pokemons in their name
    return getCurrentGameModePokemon().find((pok) => pok.baseName.toLowerCase() === name.toLowerCase());
  };

  return {
    addFound,
    addShadow,
    findPokemon,
    getCurrentGameModePokemon,
    getCurrentGenPokemon,
    getCurrentTypePokemon,
    getGenPokemon,
    getTotalPokemon: getAllPokemon,
    getTypePokemon,
    pokemonState: readonly(pokemonState),
    resetPokemonState,
    setPokemonState,
  };
};
