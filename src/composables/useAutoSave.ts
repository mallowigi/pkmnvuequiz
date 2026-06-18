import { useSavedData } from '@/composables/useSavedData.ts';
import { useState } from '@/stores/useState.ts';
import { useCurrentGen } from '@/stores/useCurrentGen.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import { useLanguages } from '@/stores/useLanguages.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';

export const useAutoSave = () => {
  const { loadAutoSave, autoSave } = useSavedData();

  const initSavedState = () => {
    // 1. Try to load progress first
    loadAutoSave();

    // 2. Debounce setup (wait 500ms after the last action to save)
    let saveTimeout: ReturnType<typeof setTimeout>;

    const triggerAutoSave = () => {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        autoSave();
      }, 500);
    };

    // 3. Subscribe to the essential stores
    const storesToWatch = [useState(), useCurrentGen(), useCurrentType(), usePokemons(), useLanguages(), useGameFlow()];

    for (const store of storesToWatch) {
      store.$subscribe(
        () => {
          triggerAutoSave();
        },
        { detached: true },
      );
    }
  };

  return {
    initSavedState,
  };
};
