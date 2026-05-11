import { reactive } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';

import type { Dialog } from '@/types.ts';

interface DialogsState {
  data: any;
  dialog: Dialog | null;
  callback: (() => void) | null;
}

export const useDialogs = defineStore('dialogs', () => {
  const dialogs = reactive<DialogsState>({
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

  return {
    dialogs,
    setData,
    setDialog,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDialogs, import.meta.hot));
}
