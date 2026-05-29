import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

import type { State, GameMode, Mode } from '@/types';

export const useState = defineStore('state', () => {
  const state = reactive<State>({
    autoPause: false,
    gameMode: null,
    isDark: false,
    mode: 'normal',
    name: '',

    usedAutoPause: false,
    usedDisplayShadows: false,
    usedShadowHelper: false,
    usedSpelling: false,
    usedTypeShuffle: false,

    withCycleSprites: true,
    withShadowHelper: false,
    withShadows: false,
    withShinies: false,
    withSound: true,
    withSpelling: false,
    withTypeShuffle: false,
  });

  const setName = (name: string) => {
    state.name = name;
  };

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
    state.usedSpelling = true;
  };

  const displayShadows = () => {
    state.withShadows = true;
    state.usedDisplayShadows = true;
  };

  const hideShadows = () => {
    state.withShadows = false;
  };

  const toggleShadowHelper = () => {
    state.withShadowHelper = !state.withShadowHelper;
    state.usedShadowHelper = true;
  };

  const setTypeShuffle = (withTypeShuffle: boolean) => {
    state.withTypeShuffle = withTypeShuffle;
    state.usedTypeShuffle = true;
  };

  const setCycleSprites = (withCycleSprites: boolean) => {
    state.withCycleSprites = withCycleSprites;
  };

  const setSound = (withSound: boolean) => {
    state.withSound = withSound;
  };

  const setAutoPause = (autoPause: boolean) => {
    state.autoPause = autoPause;
    state.usedAutoPause = true;
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
    displayShadows,
    hideShadows,
    resetState,
    setAutoPause,
    setCycleSprites,
    setDarkMode,
    setGameMode,
    setGameOver,
    setMode,
    setName,
    setSound,
    setState,
    setTypeShuffle,
    state,
    toggleDarkMode,
    toggleShadowHelper,
    toggleShowShinies,
    toggleSpelling,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useState, import.meta.hot));
}
