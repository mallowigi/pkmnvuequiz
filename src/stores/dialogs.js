import { reactive, readonly } from 'vue';

const dialogs = reactive({
  dialog: null,
  data: null,
});

export const setDialog = (dialog) => {
  dialogs.dialog = dialog;
};

export const setData = (data) => {
  dialogs.data = data;
};

export const useDialogs = () => {
  return {
    dialogs: readonly(dialogs),
    setDialog,
    setData,
  };
};