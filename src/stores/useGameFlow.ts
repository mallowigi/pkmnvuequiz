import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

import { useFirebase } from '@/composables/useFirebase.ts';
import { usePlaySounds } from '@/composables/usePlaySounds.ts';
import { useSavedData } from '@/composables/useSavedData.ts';
import type { GameFlowState, GameSelectionState } from '@/types.ts';
import { usePokemons } from '@/stores/usePokemons.ts';

export const useGameFlow = defineStore('gameFlow', () => {
  const { playFanfare } = usePlaySounds();
  const { removeAutoSave } = useSavedData();
  const { createRecord } = useFirebase();
  const { showRemaining } = usePokemons();

  const flowState = reactive<GameFlowState>({
    gameSelectionState: 'new',
    isEnded: false,
    isGivenUp: false,
    isPaused: false,
    isSettingsOpen: false,
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

    removeAutoSave();
    createRecord();
    playFanfare();
  };

  const giveUp = () => {
    flowState.isGivenUp = true;
    flowState.lastInput = null;

    createRecord();
    removeAutoSave();
    showRemaining();
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

  const toggleSettings = () => {
    flowState.isSettingsOpen = !flowState.isSettingsOpen;
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
    toggleSettings,
    updateInput,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameFlow, import.meta.hot));
}
