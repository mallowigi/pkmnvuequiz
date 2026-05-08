import { reactive, readonly } from 'vue';
import type { State, Gen, GameMode, Mode, Language } from '@/types';

const state: State = reactive<State>({
  gameMode: null,
  gen: null,
  isDark: false,
  languages: new Set<Language>(['en', 'ko', 'ja', 'zh', 'cn']),
  mode: 'normal',
  numFound: 0,
  numShadows: 0,
  pokemonFound: new Set<string>(),
  pokemonShadowed: new Set<string>(),
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

const toggleCycleSprites = () => {
  state.withCycleSprites = !state.withCycleSprites;
};

const toggleSound = () => {
  state.withSound = !state.withSound;
};

const toggleLanguage = (language: Language) => {
  if (state.languages.has(language)) {
    state.languages.delete(language);
    return;
  }
  state.languages.add(language);
};

const addShadow = () => {
  state.numShadows++;
};

const addFound = () => {
  state.numFound++;
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
    numFound: 0,
    numShadows: 0,
  });
};

export const useState = () => {
  return {
    addFound,
    addShadow,
    resetState,
    setDarkMode,
    setGameMode,
    setGameOver,
    setGen,
    setMode,
    setState,
    setTypeShuffle,
    state: readonly(state),
    toggleCycleSprites,
    toggleDarkMode,
    toggleLanguage,
    toggleShadowHelper,
    toggleShadows,
    toggleShowShinies,
    toggleSound,
    toggleSpelling,
  };
};
