import { reactive } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';

import { gens } from '@/data/gens';
import type { Gen } from '@/types.ts';

type CurrentGenState = {
  gen: Gen | null;
};

export const useCurrentGen = defineStore('currentGen', () => {
  const currentGenState = reactive<CurrentGenState>({
    gen: null,
  });

  const setCurrentGen = (gen: Gen | null) => {
    currentGenState.gen = gen;
  };

  const getCurrentGen = () => {
    const currentGen = currentGenState.gen;
    if (!currentGen) return null;

    return gens[currentGen];
  };

  const clearCurrentGen = () => {
    currentGenState.gen = null;
  };

  return {
    clearCurrentGen,
    currentGenState,
    getCurrentGen,
    setCurrentGen,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCurrentGen, import.meta.hot));
}
