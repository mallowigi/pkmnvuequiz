import { reactive, readonly } from 'vue';

const state = reactive({
  gen: null,
});

export const setGen = (id) => {
  state.gen = id;
};

export const useState = () => {
  return {
    state: readonly(state),
    setGen,
  };
};