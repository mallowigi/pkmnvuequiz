import { reactive, readonly } from 'vue';

const dialogs = reactive({
  dialog: null,
});

export const setDialog = (dialog) => {
  dialogs.dialog = dialog;
};

export const useDialogs = () => {
  return {
    dialogs: readonly(dialogs),
    setDialog,
  };
};