import type { PiniaPluginContext } from 'pinia';

import { useAchievements } from '@/composables/useAchievements.ts';
import { useFirebase } from '@/composables/useFirebase.ts';
import { useSavedData } from '@/composables/useSavedData.ts';

// Re-evaluate achievements after any (debounced) state change, except high-frequency timer ticks.
const checkAchievementsSafely = (storeId: string) => {
  if (storeId === 'timer') return;
  const { firebaseState } = useFirebase();
  const { checkAchievements } = useAchievements();

  try {
    if (!firebaseState.authReady) return;
    checkAchievements();
  } catch (error) {
    console.error('Failed to check achievements', error);
  }
};

export function piniaStorePlugin({ store }: PiniaPluginContext) {
  const { autoSave } = useSavedData();
  let saveTimeout: ReturnType<typeof setTimeout>;

  const excludedStores = [
    'dialogs',
    'alerts',
    'messages',
    'roomMessages',
    'pkmnData',
    'attackData',
    'firebase',
    'tooltips',
    'credits',
    'profile',
    'help',
    'pkmnDetails',
    'attackDetails',
    'achievementToasts',
  ];
  if (excludedStores.includes(store.$id)) {
    return;
  }

  store.$subscribe(
    () => {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        checkAchievementsSafely(store.$id);
        void autoSave(store.$id !== 'timer').catch(() => {
          // autoSave reports persistence failures to the user.
        });
      }, 500);
    },
    { detached: true },
  );
}
