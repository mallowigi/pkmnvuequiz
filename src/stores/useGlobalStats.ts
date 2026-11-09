import { doc, getDoc, setDoc } from 'firebase/firestore';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

import { auth, db } from '@/firebase.ts';
import { useMessages } from '@/stores/useMessages.ts';
import type { Type, SpecialType, MegaType, PokemonInfo } from '@/types.ts';

export type GlobalStats = {
  attackDexWins: number;
  highScore: number;
  plays: number;
  totalPlayTime: number;
  totalScore: number;
  totalInvokedShadows: number;
  totalInvokedCries: number;
  totalInvokedSpelling: number;
  totalMisses: number;
  totalGameOvers: number;
  maxComboBonus: number;
  typeFound: Record<Type, number>;
  specialFound: Record<SpecialType, number>;
  megaFound: Record<MegaType, number>;
};

const initializeStats = (): GlobalStats => ({
  attackDexWins: 0,
  highScore: 0,
  maxComboBonus: 0,
  megaFound: {
    gmax: 0,
    mega: 0,
  },
  plays: 0,
  specialFound: {
    legendary: 0,
    mythical: 0,
    no: 0,
    paradox: 0,
    sublegendary: 0,
    ultrabeast: 0,
  },
  totalGameOvers: 0,
  totalInvokedCries: 0,
  totalInvokedShadows: 0,
  totalInvokedSpelling: 0,
  totalMisses: 0,
  totalPlayTime: 0,
  totalScore: 0,
  typeFound: {
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

export const useGlobalStats = defineStore('globalStats', () => {
  const statsState = reactive<GlobalStats>(initializeStats());
  const { showErrorMessage } = useMessages();

  // Session-only combo tracker (not persisted)
  let currentComboBonus = 0;

  const fetchStats = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const docRef = doc(db, 'globalStats', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setGlobalState(docSnap.data() as GlobalStats);
      }
    } catch (error) {
      showErrorMessage(error, 'Failed to fetch global stats');
    }
  };

  const setGlobalState = (stats: Partial<GlobalStats>) => {
    let initialStats = initializeStats();
    stats.typeFound = {
      ...initialStats.typeFound,
      ...stats.typeFound,
    };
    stats.specialFound = {
      ...initialStats.specialFound,
      ...stats.specialFound,
    };
    stats.megaFound = {
      ...initialStats.megaFound,
      ...stats.megaFound,
    };
    Object.assign(statsState, stats);
  };

  const saveStats = async (partial: Partial<GlobalStats>) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await setDoc(doc(db, 'globalStats', user.uid), partial, { merge: true });
    } catch (error) {
      showErrorMessage(error, 'Failed to save global stats');
    }
  };

  const incrementInvokedShadows = () => {
    statsState.totalInvokedShadows += 1;
    void saveStats({ totalInvokedShadows: statsState.totalInvokedShadows });
  };

  const incrementInvokedCries = () => {
    statsState.totalInvokedCries += 1;
    void saveStats({ totalInvokedCries: statsState.totalInvokedCries });
  };

  const incrementInvokedSpelling = () => {
    statsState.totalInvokedSpelling += 1;
    void saveStats({ totalInvokedSpelling: statsState.totalInvokedSpelling });
  };

  const incrementMisses = () => {
    statsState.totalMisses += 1;
    void saveStats({ totalMisses: statsState.totalMisses });
  };

  const incrementGameOvers = () => {
    statsState.totalGameOvers += 1;
    void saveStats({ totalGameOvers: statsState.totalGameOvers });
  };

  const incrementPlays = () => {
    statsState.plays += 1;
    void saveStats({ plays: statsState.plays });
  };

  const incrementAttackDexWins = () => {
    statsState.attackDexWins += 1;
    void saveStats({ attackDexWins: statsState.attackDexWins });
  };

  const updateHighScore = (score: number) => {
    if (score > statsState.highScore) {
      statsState.highScore = score;
      void saveStats({ highScore: statsState.highScore });
    }
  };

  const addToTotals = (score: number, playTime: number) => {
    if (score === 0 && playTime === 0) return;

    const stats: Partial<GlobalStats> = {};

    if (score !== 0) {
      statsState.totalScore += score;
      stats.totalScore = statsState.totalScore;
    }

    if (playTime !== 0) {
      statsState.totalPlayTime += playTime;
      stats.totalPlayTime = statsState.totalPlayTime;
    }

    void saveStats(stats);
  };

  const getHighScore = () => {
    return statsState.highScore;
  };

  const getTotalScore = () => {
    return statsState.totalScore;
  };

  const getTotalPlayTime = () => {
    return statsState.totalPlayTime;
  };

  const onPokemonFound = (pokemon: PokemonInfo) => {
    const types: Type[] = [pokemon.primaryType];
    if (pokemon.secondaryType) {
      types.push(pokemon.secondaryType);
    }
    const { specialType, megaType } = pokemon;

    types.forEach((type) => {
      statsState.typeFound[type] += 1;
    });

    if (specialType && specialType !== 'no') {
      statsState.specialFound[specialType] += 1;
    }

    if (megaType) {
      statsState.megaFound[megaType] += 1;
    }

    const toSave: Partial<GlobalStats> = {
      typeFound: {
        ...statsState.typeFound,
      },
    };

    if (specialType && specialType !== 'no') {
      toSave.specialFound = {
        ...statsState.specialFound,
      };
    }

    if (megaType) {
      toSave.megaFound = {
        ...statsState.megaFound,
      };
    }

    void saveStats(toSave);
  };

  const startComboTimer = () => {
    currentComboBonus = 0;
  };

  const addComboBonus = (bonus: number) => {
    currentComboBonus += bonus;
    if (currentComboBonus > statsState.maxComboBonus) {
      statsState.maxComboBonus = currentComboBonus;
      void saveStats({ maxComboBonus: statsState.maxComboBonus });
    }
  };

  const resetComboTimer = () => {
    currentComboBonus = 0;
  };

  const resetSessionStats = () => {
    currentComboBonus = 0;
  };

  const setStatsState = (stats: Partial<GlobalStats>) => {
    Object.assign(statsState, stats);
  };

  return {
    addComboBonus,
    addToTotals,
    fetchStats,
    getHighScore,
    getTotalPlayTime,
    getTotalScore,
    incrementAttackDexWins,
    incrementGameOvers,
    incrementInvokedCries,
    incrementInvokedShadows,
    incrementInvokedSpelling,
    incrementMisses,
    incrementPlays,
    onPokemonFound,
    resetComboTimer,
    resetSessionStats,
    setStatsState,
    startComboTimer,
    statsState,
    updateHighScore,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStats, import.meta.hot));
}
