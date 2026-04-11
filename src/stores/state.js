import { reactive, readonly } from 'vue';

const state = reactive({
  gen: null,
  currentType: null,
  isDark: false,
  isStarted: true,
  isEnded: false,
  isPaused: false,
  showCredits: false,
});

export const setGen = (id) => {
  state.gen = id;
};

export const setCurrentType = (type) => {
  state.currentType = type;
};

export const setDarkMode = (isDark) => {
  state.isDark = isDark;
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

export const setState = (newState) => {
  Object.assign(state, newState);
};

export const useState = () => {
  return {
    state: readonly(state),
    setGen,
    setCurrentType,
    setDarkMode,
    setEnded,
    setPaused,
    setShowCredits,
    setState,
  };
};