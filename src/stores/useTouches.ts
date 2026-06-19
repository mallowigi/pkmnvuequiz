import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

import type { Touches } from '@/types';

export const useTouches = defineStore('touches', () => {
  const touchesState = reactive<Touches>({
    toggledAutoPause: false,
    toggledDisplayShadows: false,
    toggledLanguage: false,
    toggledShadowHelper: false,
    toggledShinyCharm: false,
    toggledSpelling: false,
    typeShuffleClicks: 0,
  });

  const toggleAutoPause = (usedAutoPause: boolean) => {
    touchesState.toggledAutoPause = usedAutoPause;
  };

  const toggleDisplayShadows = (usedDisplayShadows: boolean) => {
    touchesState.toggledDisplayShadows = usedDisplayShadows;
  };

  const toggleLanguage = (usedLanguage: boolean) => {
    touchesState.toggledLanguage = usedLanguage;
  };

  const toggleShadowHelper = (usedShadowHelper: boolean) => {
    touchesState.toggledShadowHelper = usedShadowHelper;
  };

  const toggleSpelling = (usedSpelling: boolean) => {
    touchesState.toggledSpelling = usedSpelling;
  };

  const toggleShinyCharm = (usedShinyCharm: boolean) => {
    touchesState.toggledShinyCharm = usedShinyCharm;
  };

  const toggleTypeShuffle = (usedTypeShuffle: boolean) => {
    if (usedTypeShuffle) {
      touchesState.typeShuffleClicks += 1;
    }
  };

  return {
    toggleAutoPause,
    toggleDisplayShadows,
    toggleLanguage,
    toggleShadowHelper,
    toggleShinyCharm,
    toggleSpelling,
    toggleTypeShuffle,
    touchesState,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTouches, import.meta.hot));
}
