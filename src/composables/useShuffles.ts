import { useCurrentDex } from '@/composables/useCurrentDex.ts';
import { useCurrentBox } from '@/stores/useCurrentBox.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { useState } from '@/stores/useState.ts';
import { useCurrentStrategy } from '@/strategies/useCurrentStrategy.ts';

export const useShuffles = () => {
  const { state } = useState();
  const { setShuffledType } = useCurrentType();
  const { setCurrentBox, setCurrentSpecialBox, setCurrentMegaBox } = useCurrentBox();
  const { getRandomRemaining } = useCurrentDex();
  const strategy = useCurrentStrategy();

  const updateShuffles = () => {
    if (!state.withTypeShuffle && !state.withBoxShuffle) return;

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
  };

  return {
    updateShuffles,
  };
};
