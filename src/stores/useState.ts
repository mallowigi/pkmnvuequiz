import { reactive, readonly } from 'vue';
import type { State, Gen, GameMode, Mode, Type, Language } from '@/types';

const state: State = reactive({
  currentType: null,
  gameMode: null,
  gen: null,
  isDark: false,
  isEnded: false,
  isPaused: false,
  isStarted: false,
  languages: new Set<Language>(['en', 'ko', 'ja', 'zh', 'cn']),
  mode: 'normal',
  numFound: 0,
  numShadows: 0,
  showCredits: false,
  timer: {
    elapsed: 0,
    endTime: null,
    savedAt: null,
    startTime: null,
  },
  withCycleSprites: true,
  withShadowHelper: false,
  withShadows: false,
  withShinies: false,
  withSound: true,
  withSpelling: false,
  withTypeShuffle: false,
});

export const setGen = (id: Gen | null) => {
  state.gen = id;
};

export const setGameMode = (mode: GameMode | null) => {
  state.gameMode = mode;
};

export const setMode = (mode: Mode) => {
  state.mode = mode;
};

export const setCurrentType = (type: Type | null) => {
  state.currentType = type;
};

export const toggleDarkMode = () => {
  state.isDark = !state.isDark;
};

export const setDarkMode = (isDark: boolean) => {
  state.isDark = isDark;
};

export const setStarted = (isStarted: boolean) => {
  state.isStarted = isStarted;
};

export const setEnded = (isEnded: boolean) => {
  state.isEnded = isEnded;
};

export const setPaused = (isPaused: boolean) => {
  state.isPaused = isPaused;
};

export const setShowCredits = (showCredits: boolean) => {
  state.showCredits = showCredits;
};

export const toggleShowShinies = () => {
  state.withShinies = !state.withShinies;
};

export const toggleSpelling = () => {
  state.withSpelling = !state.withSpelling;
};

export const toggleShadows = () => {
  state.withShadows = !state.withShadows;
};

export const toggleShadowHelper = () => {
  state.withShadowHelper = !state.withShadowHelper;
};

export const toggleTypeShuffle = () => {
  state.withTypeShuffle = !state.withTypeShuffle;
};

export const toggleCycleSprites = () => {
  state.withCycleSprites = !state.withCycleSprites;
};

export const toggleSound = () => {
  state.withSound = !state.withSound;
};

export const toggleLanguage = (language: Language) => {
  if (state.languages.has(language)) {
    state.languages.delete(language);
    return;
  }
  state.languages.add(language);
};

export const addShadow = () => {
  state.numShadows++;
};

export const addFound = () => {
  state.numFound++;
};

export const setStartTime = () => {
  state.timer.startTime = Date.now();
};

export const setEndTime = (minutes: number = 0) => {
  state.timer.endTime = minutes * 60;
};

export const addSecond = () => {
  state.timer.elapsed += 1;
};

export const setState = (newState: Partial<State>) => {
  Object.assign(state, newState);
};

export const resetState = () => {
  Object.assign(state, {
    isEnded: false,
    isPaused: false,
    isStarted: false,
    showCredits: false,
    timer: {
      elapsed: 0,
      endTime: null,
      savedAt: null,
      startTime: null,
    },
  });
};

export const useState = () => {
  return {
    addFound,
    addSecond,
    addShadow,
    resetState,
    setCurrentType,
    setDarkMode,
    setEndTime,
    setEnded,
    setGameMode,
    setGen,
    setMode,
    setPaused,
    setShowCredits,
    setStartTime,
    setStarted,
    setState,
    state: readonly(state),
    toggleCycleSprites,
    toggleDarkMode,
    toggleLanguage,
    toggleShadowHelper,
    toggleShadows,
    toggleShowShinies,
    toggleSound,
    toggleSpelling,
    toggleTypeShuffle,
  };
};
