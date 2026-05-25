import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

import { usePlaySounds } from '@/composables/usePlaySounds.ts';
import type { GameFlowState, GameSelectionState } from '@/types.ts';

export const useGameFlow = defineStore('gameFlow', () => {
  const { playFanfare } = usePlaySounds();

  const flowState = reactive<GameFlowState>({
    gameSelectionState: 'gen',
    isEnded: false,
    isGivenUp: false,
    isPaused: false,
    isStarted: false,
    lastInput: null,
  });

  const startGame = () => {
    flowState.isStarted = true;
    flowState.isEnded = false;
    flowState.gameSelectionState = null;
    flowState.isGivenUp = false;
    flowState.lastInput = null;
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
    flowState.lastInput = null;

    playFanfare();
  };

  const giveUp = () => {
    flowState.isGivenUp = true;
    flowState.lastInput = null;
  };

  const setGameSelectionState = (state: GameSelectionState) => {
    flowState.gameSelectionState = state;
    flowState.lastInput = null;
  };

  const resetFlowState = () => {
    flowState.isEnded = false;
    flowState.isGivenUp = false;
    flowState.isPaused = false;
    flowState.isStarted = false;
    flowState.lastInput = null;
  };

  const setFlowState = (state: Partial<GameFlowState>) => {
    Object.assign(flowState, state);
  };

  const updateInput = (input: string | null) => {
    flowState.lastInput = input;
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
    updateInput,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameFlow, import.meta.hot));
}
