import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

import type { TimerState } from '@/types.ts';

export const useTimer = defineStore('timer', () => {
  const timerState = reactive<TimerState>({
    elapsed: 0,
    isLimited: false,
    minutes: 35,
    savedAt: null,
    startTime: null,
  });

  const incElapsed = () => {
    timerState.elapsed++;
  };

  const save = () => {
    timerState.savedAt = Date.now();
  };

  const startTimer = () => {
    if (timerState.startTime) {
      return;
    }
    timerState.startTime = Date.now();
  };

  const setIsLimited = (isLimited: boolean) => {
    timerState.isLimited = isLimited;
  };

  const setMinutes = (minutes: number) => {
    timerState.minutes = minutes;
  };

  const setTimerState = (newState: Partial<TimerState>) => {
    Object.assign(timerState, newState);
  };

  const resetTimer = () => {
    timerState.startTime = null;
    timerState.savedAt = null;
    timerState.elapsed = 0;
  };

  return {
    incElapsed,
    resetTimer,
    save,
    setIsLimited,
    setMinutes,
    setTimerState,
    startTimer,
    timerState,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTimer, import.meta.hot));
}
