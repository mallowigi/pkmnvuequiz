import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

import type { State, GameMode, Mode } from '@/types';

export const useState = defineStore('state', () => {
  const state = reactive<State>({
    autoPause: false,
    gameMode: null,
    isDark: false,
    mode: 'normal',
    withCycleSprites: true,
    withShadowHelper: false,
    withShadows: false,
    withShinies: false,
    withSound: true,
    withSpelling: false,
    withTypeShuffle: false,
  });

  const setGameMode = (mode: GameMode | null) => {
    state.gameMode = mode;
  };

  const setMode = (mode: Mode) => {
    state.mode = mode;
  };

  const toggleDarkMode = () => {
    state.isDark = !state.isDark;
  };

  const setDarkMode = (isDark: boolean) => {
    state.isDark = isDark;
  };

  const toggleShowShinies = () => {
    state.withShinies = !state.withShinies;
  };

  const toggleSpelling = () => {
    state.withSpelling = !state.withSpelling;
  };

  const toggleShadows = () => {
    state.withShadows = !state.withShadows;
  };

  const toggleShadowHelper = () => {
    state.withShadowHelper = !state.withShadowHelper;
  };

  const setTypeShuffle = (withTypeShuffle: boolean) => {
    state.withTypeShuffle = withTypeShuffle;
  };

  const setCycleSprites = (withCycleSprites: boolean) => {
    state.withCycleSprites = withCycleSprites;
  };

  const setSound = (withSound: boolean) => {
    state.withSound = withSound;
  };

  const setAutoPause = (autoPause: boolean) => {
    state.autoPause = autoPause;
  };

  const setState = (newState: Partial<State>) => {
    Object.assign(state, newState);
  };

  const resetState = () => {
    Object.assign(state, {
      gameMode: null,
    });
  };

  const setGameOver = () => {
    state.gameMode = null;
  };

  return {
    resetState,
    setAutoPause,
    setCycleSprites,
    setDarkMode,
    setGameMode,
    setGameOver,
    setMode,
    setSound,
    setState,
    setTypeShuffle,
    state,
    toggleDarkMode,
    toggleShadowHelper,
    toggleShadows,
    toggleShowShinies,
    toggleSpelling,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useState, import.meta.hot));
}
