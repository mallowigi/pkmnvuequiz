import { useCurrentDex } from '@/composables/useCurrentDex.ts';
import { useCurrentBox } from '@/stores/useCurrentBox.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { useState } from '@/stores/useState.ts';
import type { Attack, PokemonInfo } from '@/types.ts';

export const useShuffles = () => {
  const { state } = useState();
  const { setShuffledType } = useCurrentType();
  const { setCurrentBox, setCurrentSpecialBox, setCurrentMegaBox } = useCurrentBox();
  const { getRandomRemaining, isAttackDex } = useCurrentDex();

  const updateShuffles = () => {
    if (!state.withTypeShuffle && !state.withBoxShuffle) return;

    const remainingEntry = getRandomRemaining();
    if (!remainingEntry) return;

    if (isAttackDex()) {
      if (state.withTypeShuffle) {
        setShuffledType((remainingEntry as Attack).type);
      }

      if (state.withBoxShuffle) {
        setCurrentBox((remainingEntry as Attack).box ?? null);
      }
      return;
    }

    const remainingPokemon = remainingEntry as PokemonInfo;

    if (state.withTypeShuffle) {
      let randomType;
      if (!remainingPokemon.secondaryType) {
        randomType = remainingPokemon.primaryType;
      } else {
        randomType = Math.random() < 0.5 ? remainingPokemon.primaryType : remainingPokemon.secondaryType;
      }
      setShuffledType(randomType);
    }

    if (state.withBoxShuffle) {
      setCurrentBox(remainingPokemon.box ?? null);
      setCurrentSpecialBox(remainingPokemon.specialType ?? null);
      setCurrentMegaBox(remainingPokemon.box ?? null);
    }
  };

  return {
    updateShuffles,
  };
};
