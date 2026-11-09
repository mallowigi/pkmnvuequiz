import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

import { useBufferedTotalStats } from '@/composables/useBufferedTotalStats.ts';
import { useGlobalStats } from '@/stores/useGlobalStats.ts';
import { useSkips } from '@/stores/useSkips.ts';
import type { Bonus } from '@/types.ts';

export const useBonus = defineStore('bonus', () => {
  const { incrementInvokedSpelling, addComboBonus, startComboTimer } = useGlobalStats();
  const bonusState = reactive<Bonus>({
    bonus: 1,
    score: 0,
    spellCheckerTriggered: false,
  });

  let timeouts: ReturnType<typeof setTimeout>[] = [];

  const clearTimeouts = () => {
    timeouts.forEach((t) => clearTimeout(t));
    timeouts = [];
  };

  const startBonusSequence = () => {
    clearTimeouts();
    startComboTimer();
    bonusState.bonus = 5;

    timeouts.push(
      setTimeout(() => {
        bonusState.bonus = 4;
      }, 3000),
    );

    timeouts.push(
      setTimeout(() => {
        bonusState.bonus = 3;
      }, 7000),
    );

    timeouts.push(
      setTimeout(() => {
        bonusState.bonus = 2;
      }, 15000),
    );

    timeouts.push(
      setTimeout(() => {
        bonusState.bonus = 1;
      }, 30000),
    );
  };

  const addScore = (isShadowed: boolean) => {
    const { addSkipScore } = useSkips();
    const { addToTotalScore } = useBufferedTotalStats();
    if (bonusState.spellCheckerTriggered || isShadowed) {
      bonusState.spellCheckerTriggered = false;
      return;
    }

    bonusState.score += bonusState.bonus;
    bonusState.spellCheckerTriggered = false;
    addSkipScore(bonusState.bonus);
    addToTotalScore(bonusState.bonus);
    addComboBonus(bonusState.bonus);
    startBonusSequence();
  };

  const setScore = (score: number) => {
    bonusState.score = score;
  };

  const setSpellCheckerTriggered = () => {
    bonusState.spellCheckerTriggered = true;
    incrementInvokedSpelling();
  };

  const resetBonus = () => {
    bonusState.score = 0;
    bonusState.bonus = 1;
    bonusState.spellCheckerTriggered = false;
  };

  return {
    addScore,
    bonusState,
    resetBonus,
    setScore,
    setSpellCheckerTriggered,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBonus, import.meta.hot));
}
