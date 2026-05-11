import { reactive } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';

import type { GameFlowState } from '@/types.ts';

export const useGameFlow = defineStore('gameFlow', () => {
  const flowState = reactive<GameFlowState>({
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

  return {
    flowState,
    resetFlowState,
    setEnded,
    setFlowState,
    setPaused,
    setStarted,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameFlow, import.meta.hot));
}
