import { types } from '@/data/types.js';
import { useState } from '@/stores/state.js';

export const useCurrentType = () => {
  const { state, setCurrentType: setStateType } = useState();

  const setCurrentType = (type) => {
    setStateType(type);
  };

  const getCurrentType = () => {
    const currentType = state.currentType;

    const foundType = types.find(type => type.id === currentType);
    return foundType ?? null;
  };

  return {
    currentType: state.currentType,
    setCurrentType,
    getCurrentType,
  };
};