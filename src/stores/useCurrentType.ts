import { types, specialType } from '@/data/types';
import { useState } from '@/stores/useState';
import type { Type } from '@/types.ts';

export const useCurrentType = () => {
  const { state, setCurrentType: setStateType } = useState();

  const setCurrentType = (type: Type | null) => {
    setStateType(type);
  };

  const getCurrentType = () => {
    const currentType = state.currentType;
    if (!currentType) return null;

    const foundType = types[currentType];
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
    currentType: state.currentType,
    getCurrentType,
    getCurrentTypeOrSpecial,
    getSpecialType,
    setCurrentType,
  };
};
