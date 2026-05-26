import type { PiniaPluginContext } from 'pinia';

import { useSavedData } from '@/composables/useSavedData.ts';

export function piniaStorePlugin({ store }: PiniaPluginContext) {
  const { autoSave } = useSavedData();
  let saveTimeout: ReturnType<typeof setTimeout>;

  const excludedStores = ['dialogs', 'messages', 'roomMessages', 'pkmnData'];
  if (excludedStores.includes(store.$id)) {
    return;
  }

  store.$subscribe(
    () => {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        autoSave();
      }, 500);
    },
    { detached: true },
  );
}
