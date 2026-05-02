import { reactive, readonly } from 'vue';

interface CreditsState {
  showCredits: boolean;
}

const credits: CreditsState = reactive({
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
