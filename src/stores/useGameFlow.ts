import { reactive, readonly } from 'vue';

import type { GameFlowState } from '@/types.ts';

const flowState: GameFlowState = reactive<GameFlowState>({
  isEnded: false,
  isPaused: false,
  isStarted: false,
});

const setStarted = (isStarted: boolean) => {
  flowState.isStarted = isStarted;
};

const setPaused = (isPaused: boolean) => {
  flowState.isPaused = isPaused;
};

const setEnded = (isEnded: boolean) => {
  flowState.isEnded = isEnded;
};

const setFlowState = (newState: Partial<GameFlowState>) => {
  Object.assign(flowState, newState);
};

const resetFlowState = () => {
  Object.assign(flowState, {
    isEnded: false,
    isPaused: false,
    isStarted: false,
  });
};

export const useGameFlow = () => {
  return {
    flowState: readonly(flowState),
    resetFlowState,
    setEnded,
    setFlowState,
    setPaused,
    setStarted,
  };
};
