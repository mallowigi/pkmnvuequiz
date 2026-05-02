import { reactive, readonly } from 'vue';

import type { Dialog } from '@/types.ts';

interface DialogsState {
  data: any;
  dialog: Dialog | null;
  callback: (() => void) | null;
}

const dialogs: DialogsState = reactive({
  callback: null,
  data: null,
  dialog: null,
});

const setDialog = (dialog: Dialog | null, callback?: () => void) => {
  dialogs.dialog = dialog;
  if (callback) {
    dialogs.callback = callback;
  }
};

const setData = <T>(data: T) => {
  dialogs.data = data;
};

export const useDialogs = () => {
  return {
    dialogs: readonly(dialogs),
    setData,
    setDialog,
  };
};
