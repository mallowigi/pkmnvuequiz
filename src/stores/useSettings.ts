import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

import { useTouches } from '@/stores/useTouches.ts';
import type { Settings, Language } from '@/types';

export const useSettings = defineStore('settings', () => {
  const settingsState = reactive<Settings>({
    autoPause: false,
    autoSync: true,
    avatar: null,
    languages: new Set<Language>(['en', 'fr', 'de', 'ko', 'ja', 'zh', 'cn']),
    name: '',
    withCycleSprites: true,
    withShadowHelper: false,
    withShinies: false,
    withSound: true,
    withSpelling: false,
  });

  const {
    toggleSpelling: toggleSpellingHelper,
    toggleShinyCharm: toggleShinyHelper,
    toggleShadowHelper: toggleShadowsHelper,
    toggleAutoPause: toggleAutoPauseHelper,
    toggleLanguage: toggleLanguageHelper,
  } = useTouches();

  const toggleLanguage = (language: Language) => {
    if (settingsState.languages.has(language)) {
      settingsState.languages.delete(language);
      return;
    }
    settingsState.languages.add(language);
  };

  const setLanguages = (languages: Language[]) => {
    settingsState.languages = new Set<Language>(languages);
    toggleLanguageHelper(!!languages?.length);
  };

  const resetLanguages = () => {
    settingsState.languages = new Set<Language>(['en', 'ko', 'ja', 'zh', 'cn']);
  };

  const setName = (name: string | null) => {
    settingsState.name = name;
  };

  const setAvatar = (avatar: string | null) => {
    settingsState.avatar = avatar;
  };

  const toggleShowShinies = () => {
    settingsState.withShinies = !settingsState.withShinies;
    toggleShinyHelper(settingsState.withShinies);
  };

  const toggleSpelling = () => {
    settingsState.withSpelling = !settingsState.withSpelling;
    toggleSpellingHelper(settingsState.withSpelling);
  };

  const toggleShadowHelper = () => {
    settingsState.withShadowHelper = !settingsState.withShadowHelper;
    toggleShadowsHelper(settingsState.withShadowHelper);
  };

  const setCycleSprites = (withCycleSprites: boolean) => {
    settingsState.withCycleSprites = withCycleSprites;
  };

  const setSound = (withSound: boolean) => {
    settingsState.withSound = withSound;
  };

  const toggleAutoPause = (autoPause: boolean) => {
    settingsState.autoPause = autoPause;
    toggleAutoPauseHelper(autoPause);
  };

  const setSaveToCloud = (saveToCloud: boolean) => {
    settingsState.autoSync = saveToCloud;
  };

  const setSettingsState = (settings: Partial<Settings>) => {
    Object.assign(settingsState, settings);
  };

  return {
    resetLanguages,
    setAvatar,
    setCycleSprites,
    setLanguages,
    setName,
    setSaveToCloud,
    setSettingsState,
    setSound,
    settingsState,
    toggleAutoPause,
    toggleLanguage,
    toggleShadowHelper,
    toggleShowShinies,
    toggleSpelling,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettings, import.meta.hot));
}
