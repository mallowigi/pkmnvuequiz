import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

import { pokemonTypes, specialType } from '@/data/pokemonTypes.ts';
import { useState } from '@/stores/useState';
import type { Type } from '@/types.ts';

type CurrentTypeState = {
  currentType: Type | null;
};

export const useCurrentType = defineStore('currentType', () => {
  const { state } = useState();

  const currentTypeState = reactive<CurrentTypeState>({
    currentType: null,
  });

  const setCurrentType = (type: Type | null) => {
    currentTypeState.currentType = type;
  };

  const clearCurrentType = () => {
    currentTypeState.currentType = null;
  };

  const getCurrentType = () => {
    if (!currentTypeState.currentType) return null;

    const foundType = pokemonTypes[currentTypeState.currentType];
    return foundType ?? null;
  };

  const getSpecialType = () => {
    return specialType;
  };

  const getCurrentTypeOrSpecial = () => {
    const gameMode = state.gameMode;
    switch (gameMode) {
      case 'special':
        return getSpecialType();
      default:
        return getCurrentType();
    }
  };

  return {
    clearCurrentType,
    currentTypeState,
    getCurrentType,
    getCurrentTypeOrSpecial,
    getSpecialType,
    setCurrentType,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCurrentType, import.meta.hot));
}
