import { reactive, readonly, computed } from 'vue';

import { useCurrentGen } from '@/stores/useCurrentGen';
import { useCurrentType } from '@/stores/useCurrentType';
import { useLanguages } from '@/stores/useLanguages.ts';
import { useMessages } from '@/stores/useMessages.ts';
import { usePkmnData } from '@/stores/usePkmnStore';
import { useState } from '@/stores/useState';
import type { PokemonInfo, PokemonProgressState, RegionBox, SpecialType, Type, Language } from '@/types.ts';

type PokemonMaps = {
  all: Map<string, PokemonInfo>;
  special: Record<SpecialType, Map<string, PokemonInfo>>;
  languages: Record<Language, Map<string, PokemonInfo>>;
  types: Record<Type, Map<string, PokemonInfo>>;
  boxes: Record<RegionBox, Map<string, PokemonInfo>>;
};

// Create these lookup maps once and then use them for fast retrieval in the various functions.
// This is a big optimization over filtering the entire list of pokemon every time we want to get a subset based on gen, type, etc.
const pokemonMaps: PokemonMaps = {
  all: new Map<string, PokemonInfo>(),
  boxes: {
    alola: new Map<string, PokemonInfo>(),
    areazero: new Map<string, PokemonInfo>(),
    galar: new Map<string, PokemonInfo>(),
    gmax: new Map<string, PokemonInfo>(),
    hisui: new Map<string, PokemonInfo>(),
    hoenn: new Map<string, PokemonInfo>(),
    hoennmega: new Map<string, PokemonInfo>(),
    hyperspace: new Map<string, PokemonInfo>(),
    johto: new Map<string, PokemonInfo>(),
    kalos: new Map<string, PokemonInfo>(),
    kalosmega: new Map<string, PokemonInfo>(),
    kanto: new Map<string, PokemonInfo>(),
    lumiose: new Map<string, PokemonInfo>(),
    paldea: new Map<string, PokemonInfo>(),
    pokemongo: new Map<string, PokemonInfo>(),
    sinnoh: new Map<string, PokemonInfo>(),
    unova: new Map<string, PokemonInfo>(),
  },
  languages: {
    cn: new Map<string, PokemonInfo>(),
    de: new Map<string, PokemonInfo>(),
    en: new Map<string, PokemonInfo>(),
    fr: new Map<string, PokemonInfo>(),
    ja: new Map<string, PokemonInfo>(),
    ko: new Map<string, PokemonInfo>(),
    zh: new Map<string, PokemonInfo>(),
  },
  special: {
    legendary: new Map<string, PokemonInfo>(),
    mythical: new Map<string, PokemonInfo>(),
    no: new Map<string, PokemonInfo>(),
    paradox: new Map<string, PokemonInfo>(),
    special: new Map<string, PokemonInfo>(),
    sublegendary: new Map<string, PokemonInfo>(),
    ultrabeast: new Map<string, PokemonInfo>(),
  },
  types: {
    bug: new Map<string, PokemonInfo>(),
    dark: new Map<string, PokemonInfo>(),
    dragon: new Map<string, PokemonInfo>(),
    electric: new Map<string, PokemonInfo>(),
    fairy: new Map<string, PokemonInfo>(),
    fighting: new Map<string, PokemonInfo>(),
    fire: new Map<string, PokemonInfo>(),
    flying: new Map<string, PokemonInfo>(),
    ghost: new Map<string, PokemonInfo>(),
    grass: new Map<string, PokemonInfo>(),
    ground: new Map<string, PokemonInfo>(),
    ice: new Map<string, PokemonInfo>(),
    normal: new Map<string, PokemonInfo>(),
    poison: new Map<string, PokemonInfo>(),
    psychic: new Map<string, PokemonInfo>(),
    rock: new Map<string, PokemonInfo>(),
    steel: new Map<string, PokemonInfo>(),
    water: new Map<string, PokemonInfo>(),
  },
};

const pokemonState: PokemonProgressState = reactive<PokemonProgressState>({
  lastPokemon: null,
  pokemonFound: new Set<string>(),
  pokemonShadowed: new Set<string>(),
  remaining: new Set<string>(),
  remainingShadow: new Set<string>(),
});

const numFound = computed(() => pokemonState.pokemonFound.size);

const numShadows = computed(() => pokemonState.pokemonShadowed.size);

const normalizeName = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

const initializePokemonMaps = () => {
  const { data } = usePkmnData();
  if (pokemonMaps.all.size > 0) return;

  if (!data || !data.pokemon || !data.translations) {
    throw new Error('Pokemon data or translations not loaded');
  }

  data.pokemon.forEach((pok) => {
    // todo find a way to incorporate different versions of the same poke
    const pokemonKey = normalizeName(pok.baseName);

    // Add to the all map
    pokemonMaps.all.set(pokemonKey, pok);

    // Group by box
    if (pok.box) {
      pokemonMaps.boxes[pok.box].set(pokemonKey, pok);
    }

    // Group by special
    if (pok.specialType) {
      pokemonMaps.special[pok.specialType].set(pokemonKey, pok);
    } else {
      pokemonMaps.special.no.set(pokemonKey, pok);
    }

    if (pok.primaryType) {
      pokemonMaps.types[pok.primaryType].set(pokemonKey, pok);
    }

    if (pok.secondaryType) {
      pokemonMaps.types[pok.secondaryType].set(pokemonKey, pok);
    }

    for (const lang in pokemonMaps.languages) {
      const translations: Record<Language, string> = data.translations![pokemonKey];
      const translationKey = normalizeName(translations[lang as Language]);
      pokemonMaps.languages[lang as Language].set(translationKey, pok);
    }
  });
};

const addFound = (pokemon: string) => {
  pokemonState.pokemonFound.add(pokemon.toLowerCase());
};

const addShadow = (pokemon: string) => {
  pokemonState.pokemonShadowed.add(pokemon.toLowerCase());
};

const setLastPokemon = (pokemon: string) => {
  pokemonState.lastPokemon = pokemon.toLowerCase();
};

const addRandomShadow = () => {};

const setPokemonState = (newState: Partial<PokemonProgressState>) => {
  Object.assign(pokemonState, newState);
};

const resetPokemonState = () => {
  Object.assign<PokemonProgressState, PokemonProgressState>(pokemonState, {
    lastPokemon: null,
    pokemonFound: new Set<string>(),
    pokemonShadowed: new Set<string>(),
    remaining: new Set<string>(),
    remainingShadow: new Set<string>(),
  });
};

const getGenPokemon = (boxId: RegionBox) => {
  return pokemonMaps.boxes[boxId];
};

export const usePokemons = () => {
  const { state } = useState();
  const { getCurrentGen } = useCurrentGen();
  const { getCurrentType } = useCurrentType();
  const { showUserMessage } = useMessages();
  const { languagesState } = useLanguages();

  const getCurrentGenPokemon = () => {
    const currentGen = getCurrentGen();
    const boxes = currentGen?.boxes ?? [];
    if (!boxes.length) {
      return [];
    }

    return boxes.flatMap((boxId) => pokemonMaps.boxes[boxId] ?? []);
  };

  const getTypePokemon = (typeId: Type) => {
    return pokemonMaps.types[typeId];
  };

  const getCurrentTypePokemon = () => {
    const currentType = getCurrentType();
    return currentType ? pokemonMaps.types[currentType.id as Type] : [];
  };

  const getSpecialTypePokemon = (specialTypeId?: SpecialType) => {
    return specialTypeId ? pokemonMaps.special[specialTypeId as SpecialType] : pokemonMaps.special.no;
  };

  const getAllPokemon = () => {
    return pokemonMaps.all;
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

  const isPokemonInCurrentGameMode = (pokemon: PokemonInfo) => {
    const gameMode = state.gameMode;
    switch (gameMode) {
      case 'gen': {
        const currentGen = getCurrentGen();
        return currentGen ? currentGen.boxes.includes(pokemon.box) : false;
      }
      case 'types': {
        const currentType = getCurrentType();
        if (!currentType) return false;

        const types = [pokemon.primaryType, pokemon.secondaryType].filter(Boolean);
        return types.includes(currentType.id);
      }
      case 'special':
        return pokemon.specialType !== undefined;
      case 'full':
        return true;
      default:
        return false;
    }
  };

  const findPokemon = (input: string) => {
    const pokemonKey = normalizeName(input);
    const languages = Array.from(languagesState.languages);
    const remaining = Array.from(pokemonState.remaining);

    const foundInLanguage = languages.find((lang) => pokemonMaps.languages[lang].has(pokemonKey));
    if (!foundInLanguage) {
      return;
    }

    const foundPokemon = pokemonMaps.languages[foundInLanguage].get(pokemonKey);
    if (!foundPokemon) {
      return;
    }

    if (pokemonState.pokemonFound.has(pokemonKey)) {
      // Before returning, check if the pokemon exists as part of the name of one of the remaining
      const isInRemaining = remaining.find((pok) => pok.toLowerCase().startsWith(pokemonKey));
      if (isInRemaining) {
        return;
      }

      showUserMessage(`You've already found ${input}!`);
      return;
    }

    // Next check if its in the current boxes
    const isInCurrentGameBox = isPokemonInCurrentGameMode(foundPokemon);
    if (!isInCurrentGameBox) {
      showUserMessage(`${input} is not in the current game mode!`);
      return;
    }

    return foundPokemon;
  };

  return {
    addFound,
    addRandomShadow,
    addShadow,
    findPokemon,
    getAllPokemon,
    getCurrentGameModePokemon,
    getCurrentGenPokemon,
    getCurrentTypePokemon,
    getGenPokemon,
    getSpecialTypePokemon,
    getTypePokemon,
    initializePokemonMaps,
    numFound,
    numShadows,
    pokemonState: readonly(pokemonState),
    resetPokemonState,
    setLastPokemon,
    setPokemonState,
  };
};
