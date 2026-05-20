import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

import type { GameFlowState, GameSelectionState } from '@/types.ts';

export const useGameFlow = defineStore('gameFlow', () => {
  const flowState = reactive<GameFlowState>({
    gameSelectionState: 'gen',
    isEnded: false,
    isGivenUp: false,
    isPaused: false,
    isStarted: false,
  });

  const startGame = () => {
    flowState.isStarted = true;
    flowState.isEnded = false;
    flowState.gameSelectionState = null;
    flowState.isGivenUp = false;
  };

  const pauseGame = () => {
    flowState.isPaused = true;
  };

  const resumeGame = () => {
    flowState.isPaused = false;
  };

  const endGame = () => {
    flowState.isEnded = true;
    flowState.isStarted = false;
    flowState.gameSelectionState = null;
    flowState.isGivenUp = false;
  };

  const giveUp = () => {
    flowState.isGivenUp = true;
  };

  const setGameSelectionState = (state: GameSelectionState) => {
    flowState.gameSelectionState = state;
  };

  const setFlowState = (newState: Partial<GameFlowState>) => {
    Object.assign(flowState, newState);
  };

  const resetFlowState = () => {
    flowState.isEnded = false;
    flowState.isGivenUp = false;
    flowState.isPaused = false;
  };

  return {
    endGame,
    flowState,
    giveUp,
    pauseGame,
    resetFlowState,
    resumeGame,
    setFlowState,
    setGameSelectionState,
    startGame,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameFlow, import.meta.hot));
}
