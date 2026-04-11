import { reactive, readonly } from 'vue';

const state = reactive({
  gen: null,
  isStarted: true,
  isEnded: false,
  isPaused: false,
  showCredits: false,
  roomMessage: null,
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

export const setPaused = (isPaused) => {
  state.isPaused = isPaused;
};

export const setRoomMessage = (message) => {
  state.roomMessage = message;
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
    setStarted,
    setEnded,
    setPaused,
    setRoomMessage,
    setShowCredits,
    setState,
  };
};