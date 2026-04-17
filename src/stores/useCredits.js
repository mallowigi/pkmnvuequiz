import { reactive, readonly } from 'vue';

const credits = reactive({
  showCredits: false,
});

export const toggleShowCredits = () => {
  credits.showCredits = !credits.showCredits;
};

export const useCredits = () => {
  return {
    credits: readonly(credits),
    toggleShowCredits,
  };
};
