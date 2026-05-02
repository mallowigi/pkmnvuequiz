import { reactive, readonly } from 'vue';

import type { Dialog } from '@/types.ts';

interface DialogsState {
  data: any;
  dialog: Dialog | null;
}

const dialogs: DialogsState = reactive({
  data: null,
  dialog: null,
});

export const setDialog = (dialog: Dialog | null) => {
  dialogs.dialog = dialog;
};

export const setData = <T>(data: T) => {
  dialogs.data = data;
};

export const useDialogs = () => {
  return {
    dialogs: readonly(dialogs),
    setData,
    setDialog,
  };
};
