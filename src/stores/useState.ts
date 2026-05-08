import { reactive, readonly } from 'vue';

import type { State, Gen, GameMode, Mode, Language } from '@/types';

const state: State = reactive<State>({
  gameMode: null,
  gen: null,
  isDark: false,
  languages: new Set<Language>(['en', 'ko', 'ja', 'zh', 'cn']),
  mode: 'normal',
  withCycleSprites: true,
  withShadowHelper: false,
  withShadows: false,
  withShinies: false,
  withSound: true,
  withSpelling: false,
  withTypeShuffle: false,
});

const setGen = (id: Gen | null) => {
  state.gen = id;
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

const toggleLanguage = (language: Language) => {
  if (state.languages.has(language)) {
    state.languages.delete(language);
    return;
  }
  state.languages.add(language);
};

const setState = (newState: Partial<State>) => {
  Object.assign(state, newState);
};

const resetState = () => {
  Object.assign(state, {});
};

const setGameOver = () => {
  Object.assign(state, {
    gameMode: null,
    gen: null,
  });
};

export const useState = () => {
  return {
    resetState,
    setCycleSprites,
    setDarkMode,
    setGameMode,
    setGameOver,
    setGen,
    setMode,
    setSound,
    setState,
    setTypeShuffle,
    state: readonly(state),
    toggleDarkMode,
    toggleLanguage,
    toggleShadowHelper,
    toggleShadows,
    toggleShowShinies,
    toggleSpelling,
  };
};
