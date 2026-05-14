// noinspection JSUnfilteredForInLoop

import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive, computed } from 'vue';

import { useCurrentGen } from '@/stores/useCurrentGen';
import { useCurrentType } from '@/stores/useCurrentType';
import { useLanguages } from '@/stores/useLanguages.ts';
import { usePkmnData } from '@/stores/usePkmnStore';
import { useState } from '@/stores/useState';
import type {
  PokemonInfo,
  PokemonProgressState,
  RegionBox,
  SpecialType,
  Type,
  Language,
  PokemonStatus,
} from '@/types.ts';
import { normalizeName, upsert } from '@/utils/utils.ts';

type PokemonMaps = {
  all: Map<string, Array<PokemonInfo>>;
  special: Record<SpecialType, Map<string, Array<PokemonInfo>>>;
  languages: Record<Language, Map<string, Array<PokemonInfo>>>;
  types: Record<Type, Map<string, Array<PokemonInfo>>>;
  boxes: Record<RegionBox, Map<string, Array<PokemonInfo>>>;
};

export const usePokemons = defineStore('pokemons', () => {
  const pokemonMaps: PokemonMaps = {
    all: new Map<string, Array<PokemonInfo>>(),
    boxes: {
      alola: new Map<string, Array<PokemonInfo>>(),
      areazero: new Map<string, Array<PokemonInfo>>(),
      galar: new Map<string, Array<PokemonInfo>>(),
      gmax: new Map<string, Array<PokemonInfo>>(),
      hisui: new Map<string, Array<PokemonInfo>>(),
      hoenn: new Map<string, Array<PokemonInfo>>(),
      hoennmega: new Map<string, Array<PokemonInfo>>(),
      hyperspace: new Map<string, Array<PokemonInfo>>(),
      johto: new Map<string, Array<PokemonInfo>>(),
      kalos: new Map<string, Array<PokemonInfo>>(),
      kalosmega: new Map<string, Array<PokemonInfo>>(),
      kanto: new Map<string, Array<PokemonInfo>>(),
      lumiose: new Map<string, Array<PokemonInfo>>(),
      paldea: new Map<string, Array<PokemonInfo>>(),
      pokemongo: new Map<string, Array<PokemonInfo>>(),
      sinnoh: new Map<string, Array<PokemonInfo>>(),
      unova: new Map<string, Array<PokemonInfo>>(),
    },
    languages: {
      cn: new Map<string, Array<PokemonInfo>>(),
      de: new Map<string, Array<PokemonInfo>>(),
      en: new Map<string, Array<PokemonInfo>>(),
      fr: new Map<string, Array<PokemonInfo>>(),
      ja: new Map<string, Array<PokemonInfo>>(),
      ko: new Map<string, Array<PokemonInfo>>(),
      zh: new Map<string, Array<PokemonInfo>>(),
    },
    special: {
      legendary: new Map<string, Array<PokemonInfo>>(),
      mythical: new Map<string, Array<PokemonInfo>>(),
      no: new Map<string, Array<PokemonInfo>>(),
      paradox: new Map<string, Array<PokemonInfo>>(),
      sublegendary: new Map<string, Array<PokemonInfo>>(),
      ultrabeast: new Map<string, Array<PokemonInfo>>(),
    },
    types: {
      bug: new Map<string, Array<PokemonInfo>>(),
      dark: new Map<string, Array<PokemonInfo>>(),
      dragon: new Map<string, Array<PokemonInfo>>(),
      electric: new Map<string, Array<PokemonInfo>>(),
      fairy: new Map<string, Array<PokemonInfo>>(),
      fighting: new Map<string, Array<PokemonInfo>>(),
      fire: new Map<string, Array<PokemonInfo>>(),
      flying: new Map<string, Array<PokemonInfo>>(),
      ghost: new Map<string, Array<PokemonInfo>>(),
      grass: new Map<string, Array<PokemonInfo>>(),
      ground: new Map<string, Array<PokemonInfo>>(),
      ice: new Map<string, Array<PokemonInfo>>(),
      normal: new Map<string, Array<PokemonInfo>>(),
      poison: new Map<string, Array<PokemonInfo>>(),
      psychic: new Map<string, Array<PokemonInfo>>(),
      rock: new Map<string, Array<PokemonInfo>>(),
      steel: new Map<string, Array<PokemonInfo>>(),
      water: new Map<string, Array<PokemonInfo>>(),
    },
  };

  const pokemonState = reactive<PokemonProgressState>({
    lastPokemon: null,
    pokemonStatuses: new Map<string, PokemonStatus>(),
  });

  const { state } = useState();
  const { getCurrentGen } = useCurrentGen();
  const { getCurrentType } = useCurrentType();
  const { languagesState } = useLanguages();

  const numFound = computed(() => {
    let count = 0;
    for (const status of pokemonState.pokemonStatuses.values()) {
      if (status.isFound) count++;
    }
    return count;
  });

  const numShadows = computed(() => {
    let count = 0;
    for (const status of pokemonState.pokemonStatuses.values()) {
      if (status.isShadowed) count++;
    }
    return count;
  });

  const remaining = computed(() => {
    const currentGameModePokemon = getCurrentGameModePokemon();
    const result = new Set<string>();

    for (const [name] of currentGameModePokemon) {
      const status = pokemonState.pokemonStatuses.get(name);
      if (status && !status.isFound) {
        result.add(name);
      }
    }
    return result;
  });

  const remainingShadow = computed(() => {
    const currentGameModePokemon = getCurrentGameModePokemon();
    const result = new Set<string>();

    for (const [name] of currentGameModePokemon) {
      const status = pokemonState.pokemonStatuses.get(name);
      if (status && !status.isShadowed) {
        result.add(name);
      }
    }
    return result;
  });

  const initializePokemonMaps = () => {
    const { data } = usePkmnData();
    if (pokemonMaps.all.size > 0) return;

    if (!data || !data.isLoaded || !data.pokemon || !data.translations) {
      throw new Error('Pokemon data or translations not loaded');
    }

    data.pokemon.forEach((pok) => {
      const pokemonKey = normalizeName(pok.baseName);
      if (!pokemonKey) return;

      upsert(pokemonMaps.all, pokemonKey, pok);

      if (!pokemonState.pokemonStatuses.has(pokemonKey)) {
        pokemonState.pokemonStatuses.set(pokemonKey, { isFound: false, isShadowed: false });
      }

      if (pok.box) {
        upsert(pokemonMaps.boxes[pok.box], pokemonKey, pok);
      }

      if (pok.specialType) {
        upsert(pokemonMaps.special[pok.specialType], pokemonKey, pok);
      } else {
        upsert(pokemonMaps.special.no, pokemonKey, pok);
      }

      if (pok.primaryType) {
        upsert(pokemonMaps.types[pok.primaryType], pokemonKey, pok);
      }

      if (pok.secondaryType) {
        upsert(pokemonMaps.types[pok.secondaryType], pokemonKey, pok);
      }

      for (const lang in pokemonMaps.languages) {
        const translations = data.translations![pokemonKey];
        const translation = translations?.[lang as Language];
        if (translation) {
          const translationKey = normalizeName(translation);
          if (translationKey) {
            upsert(pokemonMaps.languages[lang as Language], translationKey, pok);
          }
        }
      }
    });
  };

  const addFound = (pokemon: string) => {
    const normalizedPokemon = normalizeName(pokemon);
    const status = pokemonState.pokemonStatuses.get(normalizedPokemon);

    if (status) {
      status.isFound = true;
    }
  };

  const addShadow = (pokemon: string) => {
    const normalizedPokemon = normalizeName(pokemon);
    const status = pokemonState.pokemonStatuses.get(normalizedPokemon);

    if (status) {
      status.isShadowed = true;
    }
  };

  const setLastPokemon = (pokemon: string) => {
    pokemonState.lastPokemon = normalizeName(pokemon);
  };

  const addRandomShadow = () => {
    const remainingArray = Array.from(remaining.value);
    if (remainingArray.length === 0) return;

    let nextShadowPokemon = null;
    let maxIterations = 100;
    let iterationCount = 0;

    while (!nextShadowPokemon && iterationCount < maxIterations) {
      const randomIndex = Math.floor(Math.random() * remainingArray.length);
      const randomPokemon = remainingArray[randomIndex];

      const status = pokemonState.pokemonStatuses.get(randomPokemon);
      if (status?.isShadowed) {
        iterationCount++;
        continue;
      }

      nextShadowPokemon = randomPokemon;
    }

    if (nextShadowPokemon) {
      addShadow(nextShadowPokemon);
    }
  };

  const setPokemonState = (newState: Partial<PokemonProgressState>) => {
    Object.assign(pokemonState, newState);
  };

  const resetPokemonState = () => {
    pokemonState.lastPokemon = null;
    pokemonState.pokemonStatuses.forEach((status) => {
      status.isFound = false;
      status.isShadowed = false;
    });
  };

  const getGenPokemon = (boxId: RegionBox): Map<string, PokemonInfo[]> => {
    return pokemonMaps.boxes[boxId] ?? new Map();
  };

  const getTypedBoxPokemon = (typeId: Type, boxId: RegionBox): Map<string, PokemonInfo[]> => {
    const boxPokemon = pokemonMaps.boxes[boxId];
    if (!boxPokemon) return new Map();

    const result = new Map<string, PokemonInfo[]>();

    for (const [key, pokemons] of boxPokemon) {
      const filtered = pokemons.filter((p) => p.primaryType === typeId || p.secondaryType === typeId);
      if (filtered.length > 0) {
        result.set(key, filtered);
      }
    }

    return result;
  };

  const getCurrentGenPokemon = (): Map<string, PokemonInfo[]> => {
    const currentGen = getCurrentGen();
    const currentGenBoxes = currentGen?.boxes ?? [];
    const result = new Map<string, PokemonInfo[]>();

    for (const boxId of currentGenBoxes) {
      const box = pokemonMaps.boxes[boxId];
      if (box) {
        for (const [key, pokemons] of box) {
          result.set(key, pokemons);
        }
      }
    }

    return result;
  };

  const getTypePokemon = (typeId: Type): Map<string, PokemonInfo[]> => {
    return pokemonMaps.types[typeId] ?? new Map();
  };

  const getCurrentTypePokemon = (): Map<string, PokemonInfo[]> => {
    const currentType = getCurrentType();
    if (!currentType) return new Map();

    return getTypePokemon(currentType.id as Type);
  };

  const getSpecialTypePokemon = (specialTypeId?: SpecialType): Map<string, PokemonInfo[]> => {
    return (specialTypeId ? pokemonMaps.special[specialTypeId] : pokemonMaps.special.no) ?? new Map();
  };

  const getAllPokemon = (): Map<string, PokemonInfo[]> => {
    return pokemonMaps.all;
  };

  const getCurrentGameModePokemon = (): Map<string, PokemonInfo[]> => {
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
        return new Map();
    }
  };

  const getCurrentGameModeBoxPokemon = (boxId: RegionBox): Map<string, PokemonInfo[]> => {
    const gameMode = state.gameMode;
    switch (gameMode) {
      case 'gen': {
        return getGenPokemon(boxId);
      }
      case 'types': {
        const typeId = getCurrentType()?.id;
        if (!typeId) {
          return getGenPokemon(boxId);
        }

        return getTypedBoxPokemon(typeId, boxId);
      }
      case 'full':
        return getGenPokemon(boxId);
      default:
        return new Map();
    }
  };

  const isPokemonInCurrentGameMode = (pokemons: PokemonInfo[]) => {
    return pokemons.some((pokemon: PokemonInfo) => {
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
          return pokemon.specialType !== undefined && pokemon.specialType !== 'no';
        case 'full':
          return true;
        default:
          return false;
      }
    });
  };

  const isInRemaining = (pokemons: PokemonInfo[]) => {
    return pokemons.some((pokemon) => {
      const pokemonKey = normalizeName(pokemon.baseName);
      return Array.from(remaining.value.values()).some((remainingKey) => {
        return remainingKey.startsWith(pokemonKey) && remainingKey !== pokemonKey;
      });
    });
  };

  const isAlreadyFound = (pokemons: PokemonInfo[]) => {
    return pokemons.some((pokemon) => {
      const status = pokemonState.pokemonStatuses.get(normalizeName(pokemon.baseName));
      return status?.isFound;
    });
  };

  const findPokemon = (input: string) => {
    const pokemonKey = normalizeName(input);

    for (const lang of languagesState.languages) {
      const foundPokemon = pokemonMaps.languages[lang].get(pokemonKey);
      if (foundPokemon) {
        return foundPokemon;
      }
    }
  };

  const isPokemonFound = (pokemon: PokemonInfo) => {
    return pokemonState.pokemonStatuses.get(normalizeName(pokemon.baseName))?.isFound ?? false;
  };

  const isPokemonShadowed = (pokemon: PokemonInfo) => {
    return pokemonState.pokemonStatuses.get(normalizeName(pokemon.baseName))?.isShadowed ?? false;
  };

  return {
    addFound,
    addRandomShadow,
    addShadow,
    findPokemon,
    getAllPokemon,
    getCurrentGameModeBoxPokemon,
    getCurrentGameModePokemon,
    getCurrentGenPokemon,
    getCurrentTypePokemon,
    getGenPokemon,
    getSpecialTypePokemon,
    getTypePokemon,
    initializePokemonMaps,
    isAlreadyFound,
    isInRemaining,
    isPokemonFound,
    isPokemonInCurrentGameMode,
    isPokemonShadowed,
    numFound,
    numShadows,
    pokemonState,
    remaining,
    remainingShadow,
    resetPokemonState,
    setLastPokemon,
    setPokemonState,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePokemons, import.meta.hot));
}
