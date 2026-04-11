import { reactive, readonly } from 'vue';

const state = reactive({
  gen: null,
  isStarted: true,
  isEnded: false,
  showCredits: false,
});

export const setGen = (id) => {
  state.gen = id;
};

export const setStarted = (isStarted) => {
  state.isStarted = isStarted;
};

export const setEnded = (isEnded) => {
  state.isEnded = isEnded;
};

export const setShowCredits = (showCredits) => {
  state.showCredits = showCredits;
};

export const useState = () => {
  return {
    state: readonly(state),
    setGen,
    setStarted,
    setEnded,
    setShowCredits,
  };
};