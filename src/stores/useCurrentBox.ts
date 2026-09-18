import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

import { useCurrentDex } from '@/composables/useCurrentDex.ts';
import type { RegionBox, SpecialType, PokemonInfo, Attack } from '@/types.ts';

type CurrentBoxState = {
  currentBox: RegionBox | null;
  currentSpecialBox: SpecialType | null;
  currentMegaBox: RegionBox | null;
};

export const useCurrentBox = defineStore('currentBox', () => {
  const currentBoxState = reactive<CurrentBoxState>({
    currentBox: null,
    currentMegaBox: null,
    currentSpecialBox: null,
  });

  const setCurrentBox = (box: RegionBox | null) => {
    currentBoxState.currentBox = box;
  };

  const setCurrentSpecialBox = (box: SpecialType | null) => {
    currentBoxState.currentSpecialBox = box;
  };

  const setCurrentMegaBox = (box: RegionBox | null) => {
    currentBoxState.currentMegaBox = box;
  };

  const clearCurrentBox = () => {
    currentBoxState.currentBox = null;
    currentBoxState.currentSpecialBox = null;
    currentBoxState.currentMegaBox = null;
  };

  const setRandomCurrentBox = () => {
    const { getRandomRemaining, isAttackDex } = useCurrentDex();
    const remainingEntry = getRandomRemaining();
    if (!remainingEntry) return;

    if (isAttackDex()) {
      setCurrentBox((remainingEntry as Attack).box);
      return;
    }

    const remainingPokemon = getRandomRemaining() as PokemonInfo | null;
    if (!remainingPokemon) return;

    setCurrentBox(remainingPokemon.box ?? null);
    setCurrentSpecialBox(remainingPokemon.specialType ?? null);
    setCurrentMegaBox(remainingPokemon.box ?? null);
  };

  const getCurrentBoxes = () => {
    return {
      currentBox: currentBoxState.currentBox,
      currentMegaBox: currentBoxState.currentMegaBox,
      currentSpecialBox: currentBoxState.currentSpecialBox,
    };
  };

  return {
    clearCurrentBox,
    currentBoxState,
    getCurrentBoxes,
    setCurrentBox,
    setCurrentMegaBox,
    setCurrentSpecialBox,
    setRandomCurrentBox,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCurrentBox, import.meta.hot));
}
