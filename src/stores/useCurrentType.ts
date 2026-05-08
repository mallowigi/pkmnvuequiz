import { reactive, readonly } from 'vue';

import { types, specialType } from '@/data/types';
import { useState } from '@/stores/useState';
import type { Type } from '@/types.ts';

type CurrentTypeState = {
  currentType: Type | null;
};

const currentTypeState = reactive<CurrentTypeState>({
  currentType: null,
});

export const useCurrentType = () => {
  const { state } = useState();

  const setCurrentType = (type: Type | null) => {
    currentTypeState.currentType = type;
  };

  const clearCurrentType = () => {
    currentTypeState.currentType = null;
  };

  const getCurrentType = () => {
    if (!currentTypeState.currentType) return null;

    const foundType = types[currentTypeState.currentType];
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
    currentTypeState: readonly(currentTypeState),
    getCurrentType,
    getCurrentTypeOrSpecial,
    getSpecialType,
    setCurrentType,
  };
};
