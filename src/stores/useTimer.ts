import { reactive, readonly } from 'vue';

import type { TimerState } from '@/types.ts';

const timerState: TimerState = reactive<TimerState>({
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

export const useTimer = () => {
  return {
    addSecond,
    resetTimer,
    setIsLimited,
    setMinutes,
    setStartTime,
    setTimerState,
    timerState: readonly(timerState),
  };
};
