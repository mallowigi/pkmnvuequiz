import { useIntervalFn } from '@vueuse/core';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive, ref } from 'vue';

import { useCurrentDex } from '@/composables/useCurrentDex.ts';
import { usePageTitle } from '@/composables/useTitle.ts';
import { megaTypes } from '@/data/megaTypes.ts';
import { moveTypeInfo } from '@/data/moveTypes.ts';
import { pokemonTypes } from '@/data/pokemonTypes.ts';
import { specialTypes } from '@/data/specialTypes.ts';
import { useSettings } from '@/stores/useSettings.ts';
import { useState } from '@/stores/useState';
import type { Type, TypeInfo, SpecialTypeInfo, MegaTypeInfo, MoveTypeInfo, Attack, PokemonInfo } from '@/types.ts';

type CurrentTypeState = {
  shuffledType: Type | null;
  currentTypes: Set<Type>;
};

export const useCurrentType = defineStore('currentType', () => {
  const { state } = useState();
  const { setTitle } = usePageTitle();
  const { settingsState } = useSettings();

  const currentTypeState = reactive<CurrentTypeState>({
    currentTypes: new Set(),
    shuffledType: null,
  });

  const nextTypeIndex = ref(0);
  const nextType = ref<Type | null>(null);

  // Cycle types of the currentTypes on an interval
  const { pause, resume } = useIntervalFn(() => {
    if (!settingsState.withCycleTypes) return;

    const types = Array.from(currentTypeState.currentTypes);
    if (types.length > 0) {
      nextTypeIndex.value = (nextTypeIndex.value + 1) % types.length;
      nextType.value = types[nextTypeIndex.value];
      setTitle();
    }
  }, 15000);

  const startTypeCycle = () => {
    if (settingsState.withCycleTypes) {
      resume();
    }
  };

  const stopTypeCycle = () => {
    pause();
  };

  const toggleType = (type: Type) => {
    if (currentTypeState.currentTypes.has(type)) {
      currentTypeState.currentTypes.delete(type);
    } else {
      currentTypeState.currentTypes.add(type);
    }
  };

  const setShuffledType = (type: Type | null) => {
    currentTypeState.shuffledType = type;
  };

  const setCurrentTypes = (types: Type[]) => {
    currentTypeState.currentTypes = new Set(types);
    nextTypeIndex.value = 0;
    nextType.value = types[nextTypeIndex.value];
  };

  const clearCurrentTypes = () => {
    currentTypeState.currentTypes.clear();
  };

  const getShuffledType = (): TypeInfo | null => {
    if (!currentTypeState.shuffledType) return null;

    const foundType = pokemonTypes[currentTypeState.shuffledType];
    return foundType ?? null;
  };

  const getCurrentTypes = (): TypeInfo[] => {
    return Array.from(currentTypeState.currentTypes).map((type) => pokemonTypes[type]);
  };

  const getNextType = (): TypeInfo | null => {
    const types = getCurrentTypes();
    if (types.length === 0) return null;

    return types[nextTypeIndex.value % types.length];
  };

  const getSpecialType = (): SpecialTypeInfo => {
    return specialTypes.no;
  };

  const getMegaType = (): MegaTypeInfo => {
    return megaTypes.mega;
  };

  const getMoveType = (): MoveTypeInfo => {
    return moveTypeInfo;
  };

  const getCurrentTypeOrSpecial = (): TypeInfo | SpecialTypeInfo | MegaTypeInfo | MoveTypeInfo | null => {
    const gameMode = state.gameMode;

    if (state.withTypeShuffle) {
      return getShuffledType();
    }

    switch (gameMode) {
      case 'special':
        return getSpecialType();
      case 'mega':
        return getMegaType();
      case 'movetype':
        return getMoveType();
      default:
        return getNextType();
    }
  };

  const getSecondaryType = (): TypeInfo | null => {
    const gameMode = state.gameMode;
    if (gameMode === 'special' || gameMode === 'mega') {
      return getNextType();
    }
    return null;
  };

  const setRandomCurrentType = () => {
    const { getRandomRemaining, isAttackDex } = useCurrentDex();
    const remainingEntry = getRandomRemaining();
    if (!remainingEntry) return;

    if (isAttackDex()) {
      setShuffledType((remainingEntry as Attack).type);
      return;
    }

    const remainingPokemon = remainingEntry as PokemonInfo;
    let randomType;
    if (!remainingPokemon.secondaryType) {
      randomType = remainingPokemon.primaryType;
      setShuffledType(randomType);
      return;
    }

    randomType = Math.random() < 0.5 ? remainingPokemon.primaryType : remainingPokemon.secondaryType;
    setShuffledType(randomType);
  };

  return {
    clearCurrentTypes,
    currentTypeState,
    getCurrentTypeOrSpecial,
    getCurrentTypes,
    getMegaType,
    getMoveType,
    getNextType,
    getSecondaryType,
    getShuffledType,
    getSpecialType,
    setCurrentTypes,
    setRandomCurrentType,
    setShuffledType,
    startTypeCycle,
    stopTypeCycle,
    toggleType,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCurrentType, import.meta.hot));
}
