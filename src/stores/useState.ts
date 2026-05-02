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

const setGen = (id: Gen | null) => {
  state.gen = id;
};

const setGameMode = (mode: GameMode | null) => {
  state.gameMode = mode;
};

const setMode = (mode: Mode) => {
  state.mode = mode;
};

const setCurrentType = (type: Type | null) => {
  state.currentType = type;
};

const toggleDarkMode = () => {
  state.isDark = !state.isDark;
};

const setDarkMode = (isDark: boolean) => {
  state.isDark = isDark;
};

const setStarted = (isStarted: boolean) => {
  state.isStarted = isStarted;
};

const setEnded = (isEnded: boolean) => {
  state.isEnded = isEnded;
};

const setPaused = (isPaused: boolean) => {
  state.isPaused = isPaused;
};

const setShowCredits = (showCredits: boolean) => {
  state.showCredits = showCredits;
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

const toggleTypeShuffle = () => {
  state.withTypeShuffle = !state.withTypeShuffle;
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

const setStartTime = () => {
  state.timer.startTime = Date.now();
};

const setEndTime = (minutes: number = 0) => {
  state.timer.endTime = minutes * 60;
};

const addSecond = () => {
  state.timer.elapsed += 1;
};

const setState = (newState: Partial<State>) => {
  Object.assign(state, newState);
};

const resetState = () => {
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
