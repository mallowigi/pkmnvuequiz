import { reactive, readonly } from 'vue';

const state = reactive({
  data: null,
});

export const useState = () => {
  return {
    state: readonly(state),

  };
};