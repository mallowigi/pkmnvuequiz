import { useCurrentDex } from '@/composables/useCurrentDex.ts';
import { useCurrentBox } from '@/stores/useCurrentBox.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { useState } from '@/stores/useState.ts';
import { useCurrentStrategy } from '@/strategies/useCurrentStrategy.ts';
import { useCurrentCry } from '@/stores/useCurrentCry.ts';
import type { PokemonInfo } from '@/types.ts';

export const useShuffles = () => {
  const { state } = useState();
  const { setShuffledType } = useCurrentType();
  const { setCurrentBox, setCurrentSpecialBox, setCurrentMegaBox } = useCurrentBox();
  const { setCurrentCry } = useCurrentCry();
  const { getRandomRemaining } = useCurrentDex();
  const strategy = useCurrentStrategy();

  const updateShuffles = () => {
    if (!state.withTypeShuffle && !state.withBoxShuffle && !state.withCriesShuffle) return;

    const remainingEntry = getRandomRemaining();
    if (!remainingEntry) return;

    if (state.withTypeShuffle) {
      setShuffledType(strategy.value.getShuffleType(remainingEntry));
    }

    if (state.withBoxShuffle) {
      const { box, specialBox, megaBox } = strategy.value.getShuffleBoxes(remainingEntry);
      setCurrentBox(box);
      setCurrentSpecialBox(specialBox);
      setCurrentMegaBox(megaBox);
    }

    if (state.withCriesShuffle) {
      const pokemon = strategy.value.getShufflePokemon(remainingEntry);
      setCurrentCry(pokemon as PokemonInfo);
    }
  };

  return {
    updateShuffles,
  };
};
