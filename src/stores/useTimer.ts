import { reactive } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';

import type { TimerState } from '@/types.ts';

export const useTimer = defineStore('timer', () => {
  const timerState = reactive<TimerState>({
    elapsed: 0,
    isLimited: false,
    minutes: 35,
    savedAt: null,
    startTime: null,
  });

  const setStartTime = () => {
    timerState.startTime = Date.now();
  };

  const setIsLimited = (isLimited: boolean) => {
    timerState.isLimited = isLimited;
  };

  const setMinutes = (minutes: number) => {
    timerState.minutes = minutes;
  };

  const addSecond = () => {
    timerState.elapsed += 1;
  };

  const setTimerState = (newState: Partial<TimerState>) => {
    Object.assign(timerState, newState);
  };

  const resetTimer = () => {
    Object.assign(timerState, {
      elapsed: 0,
      isLimited: false,
      minutes: 35,
      savedAt: null,
      startTime: null,
    });
  };

  return {
    addSecond,
    resetTimer,
    setIsLimited,
    setMinutes,
    setStartTime,
    setTimerState,
    timerState,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTimer, import.meta.hot));
}
