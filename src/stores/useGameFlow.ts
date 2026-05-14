import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

import type { GameFlowState, GameSelectionState } from '@/types.ts';

export const useGameFlow = defineStore('gameFlow', () => {
  const flowState = reactive<GameFlowState>({
    gameSelectionState: 'gen',
    isEnded: false,
    isPaused: false,
    isStarted: false,
  });

  const startGame = (isStarted: boolean) => {
    flowState.isStarted = isStarted;
    flowState.gameSelectionState = null;
  };

  const pauseGame = (isPaused: boolean) => {
    flowState.isPaused = isPaused;
  };

  const endGame = (isEnded: boolean) => {
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
    endGame,
    flowState,
    pauseGame,
    resetFlowState,
    setFlowState,
    setGameSelectionState,
    startGame,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameFlow, import.meta.hot));
}
