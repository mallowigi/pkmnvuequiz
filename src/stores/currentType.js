import { reactive, readonly } from 'vue';
import { types } from '@/data/types.js';

const typeState = reactive({
  currentType: 'ice',
});

const setCurrentType = (type) => {
  typeState.currentType = type;
};

const getCurrentType = () => {
  const currentType = types.find(type => type.id === typeState.currentType);
  return currentType ?? null;
};

export const useCurrentType = () => {
  return {
    typeState: readonly(typeState),
    setCurrentType,
    getCurrentType,
  };
};