import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

import { useProfile } from '@/stores/useProfile.ts';
import { useTouches } from '@/stores/useTouches.ts';
import type { Settings, Language } from '@/types';

export const useSettings = defineStore('settings', () => {
  const { updateSettings } = useProfile();

  const settingsState = reactive<Settings>({
    autoPause: false,
    autoSync: true,
    avatar: null,
    languages: new Set<Language>(['en', 'fr', 'de', 'ko', 'ja', 'zh', 'cn']),
    name: '',
    withCriesHelper: false,
    withCycleRegions: true,
    withCycleSprites: true,
    withCycleTypes: true,
    withInitialsHelper: false,
    withScrollIntoView: true,
    withShadowHelper: false,
    withShinies: false,
    withSound: true,
    withSpelling: false,
  });

  const {
    toggledAutoPause,
    toggledLanguage,
    toggledShadowHelper,
    toggledSpelling,
    toggledShinyCharm,
    toggledCriesHelper,
    toggledInitialsHelper,
  } = useTouches();

  const applySettings = (settings: Partial<Settings>) => {
    const newSettings = {
      ...settings,
      languages: new Set<Language>(settings.languages || []),
    };

    Object.assign(settingsState, newSettings);
  };

  const toggleLanguage = (language: Language) => {
    if (settingsState.languages.has(language)) {
      settingsState.languages.delete(language);
      updateSettings({ languages: settingsState.languages });
      return;
    }
    settingsState.languages.add(language);
    toggledLanguage();
    updateSettings({ languages: settingsState.languages });
  };

  const setLanguages = (languages: Language[]) => {
    settingsState.languages = new Set<Language>(languages);
    toggledLanguage();
    updateSettings({ languages: settingsState.languages });
  };

  const resetLanguages = () => {
    settingsState.languages = new Set<Language>(['en', 'ko', 'ja', 'zh', 'cn']);
    updateSettings({ languages: settingsState.languages });
  };

  const setName = (name: string | null) => {
    settingsState.name = name;
  };

  const setAvatar = (avatar: string | null) => {
    settingsState.avatar = avatar;
  };

  const toggleShowShinies = () => {
    settingsState.withShinies = !settingsState.withShinies;
    toggledShinyCharm();
    updateSettings({ withShinies: settingsState.withShinies });
  };

  const toggleSpelling = () => {
    settingsState.withSpelling = !settingsState.withSpelling;
    toggledSpelling();
    updateSettings({ withSpelling: settingsState.withSpelling });
  };

  const toggleShadowHelper = () => {
    settingsState.withShadowHelper = !settingsState.withShadowHelper;
    toggledShadowHelper();
    updateSettings({ withShadowHelper: settingsState.withShadowHelper });
  };

  const toggleCriesHelper = () => {
    settingsState.withCriesHelper = !settingsState.withCriesHelper;
    toggledCriesHelper();
    updateSettings({ withCriesHelper: settingsState.withCriesHelper });
  };

  const toggleInitialsHelper = () => {
    settingsState.withInitialsHelper = !settingsState.withInitialsHelper;
    toggledInitialsHelper();
    updateSettings({ withInitialsHelper: settingsState.withInitialsHelper });
  };

  const setCycleSprites = (withCycleSprites: boolean) => {
    settingsState.withCycleSprites = withCycleSprites;
    updateSettings({ withCycleSprites });
  };

  const setCycleTypes = (withCycleTypes: boolean) => {
    settingsState.withCycleTypes = withCycleTypes;
    updateSettings({ withCycleTypes });
  };

  const setCycleRegions = (withCycleRegions: boolean) => {
    settingsState.withCycleRegions = withCycleRegions;
    updateSettings({ withCycleRegions });
  };

  const setScrollIntoView = (withScrollIntoView: boolean) => {
    settingsState.withScrollIntoView = withScrollIntoView;
    updateSettings({ withScrollIntoView });
  };

  const setSound = (withSound: boolean) => {
    settingsState.withSound = withSound;
    updateSettings({ withSound });
  };

  const toggleAutoPause = (autoPause: boolean) => {
    settingsState.autoPause = autoPause;
    toggledAutoPause();
    updateSettings({ autoPause });
  };

  const setSaveToCloud = (saveToCloud: boolean) => {
    settingsState.autoSync = saveToCloud;
    updateSettings({ autoSync: settingsState.autoSync });
  };

  const setSettingsState = (settings: Partial<Settings>) => {
    Object.assign(settingsState, settings);
    const newSettings = {
      ...settings,
      languages: new Set<Language>(settings.languages || []),
    };
    updateSettings(newSettings);
  };

  return {
    applySettings,
    resetLanguages,
    setAvatar,
    setCycleRegions,
    setCycleSprites,
    setCycleTypes,
    setLanguages,
    setName,
    setSaveToCloud,
    setScrollIntoView,
    setSettingsState,
    setSound,
    settingsState,
    toggleAutoPause,
    toggleCriesHelper,
    toggleInitialsHelper,
    toggleLanguage,
    toggleShadowHelper,
    toggleShowShinies,
    toggleSpelling,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettings, import.meta.hot));
}
