import { doc, getDoc, setDoc } from 'firebase/firestore';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

import { auth, db } from '@/firebase.ts';
import { useCurrentGen } from '@/stores/useCurrentGen.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useMessages } from '@/stores/useMessages.ts';
import { useSettings } from '@/stores/useSettings.ts';
import { useState } from '@/stores/useState.ts';
import { useTimer } from '@/stores/useTimer.ts';
import type { FinishedGames, Profile, Settings, Gen, Type } from '@/types';

const initializeFinishedGames = (): FinishedGames => ({
  bestFullTime: 0,
  boxShuffle: 0,
  challenge: 0,
  chaos: 0,
  full: 0,
  gen: {
    gen1: 0,
    gen2: 0,
    gen3: 0,
    gen4: 0,
    gen5: 0,
    gen6: 0,
    gen7: 0,
    gen8: 0,
    gen9: 0,
  },
  mega: 0,
  noCries: 0,
  noShadows: 0,
  normal: 0,
  order: 0,
  special: 0,
  typeShuffle: 0,
  types: {
    bug: 0,
    dark: 0,
    dragon: 0,
    electric: 0,
    fairy: 0,
    fighting: 0,
    fire: 0,
    flying: 0,
    ghost: 0,
    grass: 0,
    ground: 0,
    ice: 0,
    normal: 0,
    poison: 0,
    psychic: 0,
    rock: 0,
    steel: 0,
    water: 0,
  },
});

const initializeSettings = (): Settings => ({
  autoPause: false,
  autoSync: true,
  avatar: null,
  languages: new Set(['en', 'fr', 'de', 'ko', 'ja', 'zh', 'cn']),
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

export const useProfile = defineStore('profile', () => {
  const profileState = reactive<Profile>({
    achievements: {},
    finishedGames: initializeFinishedGames(),
    settings: initializeSettings(),
    shinyDex: {},
  });

  const { showErrorMessage } = useMessages();

  const fetchProfile = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const docRef = doc(db, 'profiles', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfileState(docSnap.data() as Profile);
      }
    } catch (error) {
      showErrorMessage(error, 'Failed to fetch profile');
    }
  };

  const saveUserProfile = async (stats: Partial<Profile>) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await setDoc(doc(db, 'profiles', user.uid), stats, { merge: true });
    } catch (error) {
      showErrorMessage(error, 'Failed to save profile');
    }
  };

  const getTotalWins = () => {
    return profileState.finishedGames.normal + profileState.finishedGames.chaos + profileState.finishedGames.order;
  };

  const getShinyCount = () => {
    return Object.keys(profileState.shinyDex).length;
  };

  const getChaosWins = () => {
    return profileState.finishedGames.chaos;
  };

  const getOrderWins = () => {
    return profileState.finishedGames.order;
  };

  const getGenWins = (gen: Gen) => {
    return profileState.finishedGames.gen[gen] ?? 0;
  };

  const getTypeWins = (type: Type) => {
    return profileState.finishedGames.types[type] ?? 0;
  };

  const getSpecialWins = () => {
    return profileState.finishedGames.special;
  };

  const getMegaWins = () => {
    return profileState.finishedGames.mega;
  };

  const getFullWins = () => {
    return profileState.finishedGames.full;
  };

  const getTypeShuffleWins = () => {
    return profileState.finishedGames.typeShuffle;
  };

  const getBoxShuffleWins = () => {
    return profileState.finishedGames.boxShuffle;
  };

  const getChallengeWins = () => {
    return profileState.finishedGames.challenge;
  };

  const getBestTimeFull = () => {
    return profileState.finishedGames.bestFullTime;
  };

  const getNoShadowWins = () => {
    return profileState.finishedGames.noShadows;
  };

  const getNoCriesWins = () => {
    return profileState.finishedGames.noCries;
  };

  const setProfileState = (profile: Partial<Profile>) => {
    const { applySettings } = useSettings();

    Object.assign(profileState, profile);
    if (profile.settings) {
      applySettings(profile.settings);
    }
  };

  const updateSettings = (settings: Partial<Settings>) => {
    Object.assign(profileState.settings, settings);
    const serialized = {
      ...profileState.settings,
      languages: Array.from(profileState.settings.languages),
    };
    void saveUserProfile({ settings: serialized as unknown as Settings });
  };

  const addShiny = (pokemonId: string) => {
    profileState.shinyDex[pokemonId] = true;
    void saveUserProfile({ shinyDex: profileState.shinyDex });
  };

  const addAchievement = (achievementId: string, tier: number) => {
    profileState.achievements[achievementId] = tier;
    void saveUserProfile({ achievements: profileState.achievements });
  };

  const updateFinishedGames = () => {
    const { state } = useState();
    const { getCurrentGens } = useCurrentGen();
    const { getCurrentTypes } = useCurrentType();
    const { flowState } = useGameFlow();

    const { gameMode, withShadows, withTypeShuffle, withBoxShuffle, mode } = state;
    const { timerState } = useTimer();

    if (!gameMode) return;

    // Keep order track
    switch (mode) {
      case 'chaos':
        profileState.finishedGames.chaos += 1;
        break;
      case 'normal':
        profileState.finishedGames.normal += 1;
        break;
      case 'order':
        profileState.finishedGames.order += 1;
        break;
      default:
        break;
    }

    // Increment finished games based on game mode and current state
    if (gameMode === 'full') {
      profileState.finishedGames.full += 1;

      // Track best time for full mode
      const elapsed = timerState.elapsed;
      if (elapsed > 0) {
        if (profileState.finishedGames.bestFullTime === 0 || elapsed < profileState.finishedGames.bestFullTime) {
          profileState.finishedGames.bestFullTime = elapsed;
        }
      }
    } else if (gameMode === 'gen') {
      const gens = getCurrentGens();

      gens?.forEach((genInfo) => {
        profileState.finishedGames.gen[genInfo.id] += 1;
      });
    } else if (gameMode === 'types' && getCurrentTypes()) {
      const types = getCurrentTypes();

      types?.forEach((typeInfo) => {
        profileState.finishedGames.types[typeInfo.id] += 1;
      });
    } else if (gameMode === 'special') {
      profileState.finishedGames.special += 1;
    } else if (gameMode === 'mega') {
      profileState.finishedGames.mega += 1;
    }

    // More stats if the game was finished without shadows or cries
    if (!withShadows) {
      profileState.finishedGames.noShadows += 1;
    }

    // Track shuffle and challenge mode wins
    if (withTypeShuffle) {
      profileState.finishedGames.typeShuffle += 1;
    }

    if (withBoxShuffle) {
      profileState.finishedGames.boxShuffle += 1;
    }

    if (flowState.challengeMode === 'challenge') {
      profileState.finishedGames.challenge += 1;
    }

    // Save the updated finished games to the database
    void saveUserProfile({ finishedGames: profileState.finishedGames });
  };

  return {
    addAchievement,
    addShiny,
    fetchProfile,
    getBestTimeFull,
    getBoxShuffleWins,
    getChallengeWins,
    getChaosWins,
    getFullWins,
    getGenWins,
    getMegaWins,
    getNoCriesWins,
    getNoShadowWins,
    getOrderWins,
    getShinyCount,
    getSpecialWins,
    getTotalWins,
    getTypeShuffleWins,
    getTypeWins,
    initializeFinishedGames,
    profileState,
    saveUserProfile,
    setProfileState,
    updateFinishedGames,
    updateSettings,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProfile, import.meta.hot));
}
