import { gens } from '@/data/gens.js';
import { useState } from '@/stores/useState.js';

export const useCurrentGen = () => {
  const { state, setGen } = useState();

  const setCurrentGen = (gen) => {
    setGen(gen);
  };

  const getCurrentGen = () => {
    const currentGen = state.gen;
    return gens.find((g) => g.id === currentGen);
  };

  return {
    currentGen: state.gen,
    getCurrentGen,
    setCurrentGen,
  };
};
