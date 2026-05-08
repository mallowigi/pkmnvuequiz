import { gens } from '@/data/gens';
import { useState } from '@/stores/useState';
import type { Gen } from '@/types.ts';

export const useCurrentGen = () => {
  const { state, setGen } = useState();

  const setCurrentGen = (gen: Gen | null) => {
    setGen(gen);
  };

  const getCurrentGen = () => {
    const currentGen = state.gen;
    if (!currentGen) return [];

    return gens[currentGen];
  };

  return {
    currentGen: state.gen,
    getCurrentGen,
    setCurrentGen,
  };
};
