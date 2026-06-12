import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

import type { Settings, Language } from '@/types';
import { useState } from '@/stores/useState.ts';

export const useSettings = defineStore('settings', () => {
  const { state } = useState();

  const settingsState = reactive<Settings>({
    autoPause: false,
    languages: new Set<Language>(['en', 'fr', 'de', 'ko', 'ja', 'zh', 'cn']),
    name: '',
    profilePic: '',
    withCycleSprites: true,
    withShadowHelper: false,
    withShinies: false,
    withSound: true,
    withSpelling: false,
  });

  const toggleLanguage = (language: Language) => {
    if (settingsState.languages.has(language)) {
      settingsState.languages.delete(language);
      return;
    }
    settingsState.languages.add(language);
  };

  const setLanguages = (languages: Language[]) => {
    settingsState.languages = new Set<Language>(languages);
  };

  const resetLanguages = () => {
    settingsState.languages = new Set<Language>(['en', 'ko', 'ja', 'zh', 'cn']);
  };

  const setName = (name: string | null) => {
    settingsState.name = name;
  };

  const toggleShowShinies = () => {
    settingsState.withShinies = !settingsState.withShinies;
  };

  const toggleSpelling = () => {
    settingsState.withSpelling = !settingsState.withSpelling;
    state.usedSpelling = true;
  };

  const toggleShadowHelper = () => {
    settingsState.withShadowHelper = !settingsState.withShadowHelper;
    state.usedShadowHelper = true;
  };

  const setCycleSprites = (withCycleSprites: boolean) => {
    settingsState.withCycleSprites = withCycleSprites;
  };

  const setSound = (withSound: boolean) => {
    settingsState.withSound = withSound;
  };

  const setAutoPause = (autoPause: boolean) => {
    settingsState.autoPause = autoPause;
    state.usedAutoPause = true;
  };

  const setSettingsState = (settings: Partial<Settings>) => {
    Object.assign(settingsState, settings);
  };

  const setProfilePic = (myPhotoUrl: string) => {
    settingsState.profilePic = myPhotoUrl;
  };

  return {
    resetLanguages,
    setAutoPause,
    setCycleSprites,
    setLanguages,
    setName,
    setProfilePic,
    setSettingsState,
    setSound,
    settingsState,
    toggleLanguage,
    toggleShadowHelper,
    toggleShowShinies,
    toggleSpelling,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettings, import.meta.hot));
}
