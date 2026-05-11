import { reactive, readonly } from 'vue';

import { gens } from '@/data/gens';
import type { Gen } from '@/types.ts';

type CurrentGenState = {
  gen: Gen | null;
};

const currentGenState = reactive<CurrentGenState>({
  gen: null,
});

export const useCurrentGen = () => {
  const setCurrentGen = (gen: Gen | null) => {
    currentGenState.gen = gen;
  };

  const getCurrentGen = () => {
    const currentGen = currentGenState.gen;
    if (!currentGen) return null;

    return gens[currentGen];
  };

  return {
    currentGenState: readonly(currentGenState),
    getCurrentGen,
    setCurrentGen,
  };
};
