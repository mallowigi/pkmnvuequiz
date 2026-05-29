import { ref } from 'vue';

const isScrolling = ref(false);

export const useScrollState = () => {
  return { isScrolling };
};
