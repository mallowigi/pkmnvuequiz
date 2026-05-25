import type { PiniaPluginContext } from 'pinia';
import { useStorage } from '@vueuse/core';

export function storagePlugin({ store }: PiniaPluginContext) {
  const excludedStores = ['dialogs', 'messages', 'roomMessages', 'pkmnData'];

  if (excludedStores.includes(store.$id)) {
    return;
  }

  const storageKey = `pkmnquiz-${store.$id}`;
  const storedState = useStorage(storageKey, store.$state);

  // Hydrate the store with the initial saved state (if any exists)
  store.$patch(storedState.value);

  // when saving anything in the store, update the stored state
  store.$subscribe(
    () => {
      storedState.value = store.$state;
    },
    // detached: true ensures the subscription outlives the component it was created in
    { detached: true },
  );
}
