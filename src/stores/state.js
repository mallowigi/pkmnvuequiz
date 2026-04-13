import { reactive, readonly } from 'vue';

const state = reactive({
  gen: null,
  mode: 'normal',
  currentType: null,
  isDark: false,
  isStarted: false,
  isEnded: false,
  isPaused: false,
  showCredits: false,

  withTypeShuffle: false,
  withShinies: false,
  withShadows: false,
  withSpelling: false,
  withShadowHelper: false,
  withCycleSprites: true,
  withSound: true,

  languages: new Set(['en', 'ko', 'jp', 'zh', 'cn']),
  timer: {
    startTime: null,
    endTime: null,
    savedAt: null,
    elapsed: 0,
  },
});

export const setGen = (id) => {
  state.gen = id;
};

export const setMode = (mode) => {
  state.mode = mode;
};

export const setCurrentType = (type) => {
  state.currentType = type;
};

export const toggleDarkMode = () => {
  state.isDark = !state.isDark;
};

export const setStarted = (isStarted) => {
  state.isStarted = isStarted;
};

export const setEnded = (isEnded) => {
  state.isEnded = isEnded;
};

export const setPaused = (isPaused) => {
  state.isPaused = isPaused;
};

export const setShowCredits = (showCredits) => {
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

export const toggleLanguage = (language) => {
  if (state.languages.has(language)) {
    state.languages.delete(language);
    return;
  }
  state.languages.add(language);
};

export const setStartTime = () => {
  state.timer.startTime = Date.now();
};

export const setEndTime = () => {
  state.timer.endTime = Date.now();
};

export const addSecond = () => {
  state.timer.elapsed += 1;
};

export const setState = (newState) => {
  Object.assign(state, newState);
};

export const resetState = () => {
  Object.assign(state, {
    gen: null,
    mode: 'normal',
    currentType: null,
    isDark: false,
    isStarted: false,
    isEnded: false,
    isPaused: false,
    showCredits: false,
    withTypeShuffle: false,
    withShinies: false,
    withShadows: false,
    withSpelling: false,
    withShadowHelper: false,
    withCycleSprites: true,
    withSound: true,

    languages: new Set(['en', 'ko', 'jp', 'zh', 'cn']),
    timer: {
      startTime: null,
      endTime: null,
      savedAt: null,
      elapsed: 0,
    },
  });
};

export const useState = () => {
  return {
    state: readonly(state),
    setGen,
    setMode,
    setCurrentType,
    toggleDarkMode,
    setStarted,
    setEnded,
    setPaused,
    setShowCredits,
    toggleShowShinies,
    toggleSpelling,
    toggleShadows,
    toggleShadowHelper,
    toggleTypeShuffle,
    toggleCycleSprites,
    toggleSound,
    toggleLanguage,
    setStartTime,
    setEndTime,
    addSecond,
    setState,
    resetState,
  };
};