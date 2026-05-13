import { reactive } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';

import type { GameFlowState, GameSelectionState } from '@/types.ts';

export const useGameFlow = defineStore('gameFlow', () => {
  const flowState = reactive<GameFlowState>({
    gameSelectionState: 'gen',
    isEnded: false,
    isPaused: false,
    isStarted: false,
  });

  const setStarted = (isStarted: boolean) => {
    flowState.isStarted = isStarted;
    flowState.gameSelectionState = null;
  };

  const setPaused = (isPaused: boolean) => {
    flowState.isPaused = isPaused;
  };

  const setEnded = (isEnded: boolean) => {
    flowState.isEnded = isEnded;
  };

  const setGameSelectionState = (state: GameSelectionState) => {
    flowState.gameSelectionState = state;
  };

  const setFlowState = (newState: Partial<GameFlowState>) => {
    Object.assign(flowState, newState);
  };

  const resetFlowState = () => {
    Object.assign(flowState, {
      gameSelectionState: 'gen',
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
    setGameSelectionState,
    setPaused,
    setStarted,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameFlow, import.meta.hot));
}
