import { useCurrentDex } from '@/composables/useCurrentDex.ts';
import { useCurrentBox } from '@/stores/useCurrentBox.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { useState } from '@/stores/useState.ts';
import { useCurrentStrategy } from '@/strategies/useCurrentStrategy.ts';
import { useCurrentCry } from '@/stores/useCurrentCry.ts';

export const useShuffles = () => {
  const { state } = useState();
  const { setShuffledType } = useCurrentType();
  const { setCurrentBox, setCurrentSpecialBox, setCurrentMegaBox } = useCurrentBox();
  const { clearCurrentCry, setRandomCurrentCry } = useCurrentCry();
  const { getRandomRemaining } = useCurrentDex();
  const strategy = useCurrentStrategy();

  const updateShuffles = () => {
    if (!state.withTypeShuffle && !state.withBoxShuffle && !state.withCriesShuffle) return;

    const remainingEntry = getRandomRemaining();
    if (!remainingEntry) {
      clearCurrentCry();
      return;
    }

    if (state.withTypeShuffle) {
      setShuffledType(strategy.value.getShuffleType(remainingEntry));
    }

    if (state.withBoxShuffle) {
      const { box, specialBox, megaBox } = strategy.value.getShuffleBoxes(remainingEntry);
      setCurrentBox(box);
      setCurrentSpecialBox(specialBox);
      setCurrentMegaBox(megaBox);
    }

    if (state.withCriesShuffle && strategy.value.capabilities.hasCries) {
      setRandomCurrentCry();
    } else {
      clearCurrentCry();
    }
  };

  return {
    updateShuffles,
  };
};
