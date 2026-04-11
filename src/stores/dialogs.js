import { reactive, readonly } from 'vue';

const dialogs = reactive({
  showChaos: false,
  showOrder: false,
  showShadows: false,
  showGiveUp: false,
  showReset: false,
});

export const toggleShowChaos = () => {
  dialogs.showChaos = !dialogs.showChaos;
};

export const toggleShowOrder = () => {
  dialogs.showOrder = !dialogs.showOrder;
};

export const toggleShowShadows = () => {
  dialogs.showShadows = !dialogs.showShadows;
};

export const toggleShowGiveUp = () => {
  dialogs.showGiveUp = !dialogs.showGiveUp;
};

export const toggleShowReset = () => {
  dialogs.showReset = !dialogs.showReset;
};

export const useDialogs = () => {
  return {
    dialogs: readonly(dialogs),
    toggleShowChaos,
    toggleShowOrder,
    toggleShowShadows,
    toggleShowGiveUp,
    toggleShowReset,
  };
};