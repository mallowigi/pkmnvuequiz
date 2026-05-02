import { types } from '@/data/types.js';
import { useState } from '@/stores/useState.js';

export const useCurrentType = () => {
  const { state, setCurrentType: setStateType } = useState();

  const setCurrentType = (type) => {
    setStateType(type);
  };

  const getCurrentType = () => {
    const currentType = state.currentType;
    console.log('getCurrentType', currentType);

    const foundType = types[currentType];
    return foundType ?? null;
  };

  const getSpecialType = () => {
    const foundType = types['special'];
    return foundType ?? null;
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
