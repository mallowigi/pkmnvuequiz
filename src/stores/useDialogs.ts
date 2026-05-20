import { reactive } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';

import type { Dialog } from '@/types.ts';

interface DialogsState {
  dialog: Dialog | null;
  callback: (() => void) | null;
}

export const useDialogs = defineStore('dialogs', () => {
  const dialogs = reactive<DialogsState>({
    callback: null,
    dialog: null,
  });

  const setDialog = (dialog: Dialog | null, callback?: () => void) => {
    dialogs.dialog = dialog;
    if (callback) {
      dialogs.callback = callback;
    }
  };

  return {
    dialogs,
    setDialog,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDialogs, import.meta.hot));
}
