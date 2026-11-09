import { doc, getDoc, setDoc } from 'firebase/firestore';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

import { auth, db } from '@/firebase.ts';
import { useMessages } from '@/stores/useMessages.ts';
import type { Type, SpecialType, MegaType } from '@/types.ts';

export type GlobalStats = {
  totalShadows: number;
  totalCries: number;
  totalSpelling: number;
  totalMisses: number;
  totalGameOvers: number;
  maxComboBonus: number;
  pokemonFoundByType: Record<Type, number>;
  pokemonFoundBySpecialType: Record<SpecialType, number>;
  pokemonFoundByMegaType: Record<MegaType, number>;
};

const initializeStats = (): GlobalStats => ({
  totalShadows: 0,
  totalCries: 0,
  totalSpelling: 0,
  totalMisses: 0,
  totalGameOvers: 0,
  maxComboBonus: 0,
  pokemonFoundByType: {
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
  pokemonFoundBySpecialType: {
    legendary: 0,
    mythical: 0,
    no: 0,
    paradox: 0,
    sublegendary: 0,
    ultrabeast: 0,
  },
  pokemonFoundByMegaType: {
    gmax: 0,
    mega: 0,
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
        const data = docSnap.data() as Partial<GlobalStats>;
        const merged = { ...initializeStats(), ...data };
        // Ensure nested records are merged properly
        merged.pokemonFoundByType = { ...initializeStats().pokemonFoundByType, ...data.pokemonFoundByType };
        merged.pokemonFoundBySpecialType = {
          ...initializeStats().pokemonFoundBySpecialType,
          ...data.pokemonFoundBySpecialType,
        };
        merged.pokemonFoundByMegaType = {
          ...initializeStats().pokemonFoundByMegaType,
          ...data.pokemonFoundByMegaType,
        };
        Object.assign(statsState, merged);
      }
    } catch (error) {
      showErrorMessage(error, 'Failed to fetch global stats');
    }
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

  const incrementShadow = () => {
    statsState.totalShadows += 1;
    void saveStats({ totalShadows: statsState.totalShadows });
  };

  const incrementCry = () => {
    statsState.totalCries += 1;
    void saveStats({ totalCries: statsState.totalCries });
  };

  const incrementSpelling = () => {
    statsState.totalSpelling += 1;
    void saveStats({ totalSpelling: statsState.totalSpelling });
  };

  const incrementMiss = () => {
    statsState.totalMisses += 1;
    void saveStats({ totalMisses: statsState.totalMisses });
  };

  const incrementGameOver = () => {
    statsState.totalGameOvers += 1;
    void saveStats({ totalGameOvers: statsState.totalGameOvers });
  };

  const onPokemonFound = (types: Type[], specialType?: SpecialType, megaType?: MegaType) => {
    types.forEach((type) => {
      statsState.pokemonFoundByType[type] += 1;
    });

    if (specialType && specialType !== 'no') {
      statsState.pokemonFoundBySpecialType[specialType] += 1;
    }

    if (megaType) {
      statsState.pokemonFoundByMegaType[megaType] += 1;
    }

    const toSave: Partial<GlobalStats> = {
      pokemonFoundByType: { ...statsState.pokemonFoundByType },
    };

    if (specialType && specialType !== 'no') {
      toSave.pokemonFoundBySpecialType = { ...statsState.pokemonFoundBySpecialType };
    }

    if (megaType) {
      toSave.pokemonFoundByMegaType = { ...statsState.pokemonFoundByMegaType };
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
    fetchStats,
    incrementShadow,
    incrementCry,
    incrementSpelling,
    incrementMiss,
    incrementGameOver,
    onPokemonFound,
    startComboTimer,
    addComboBonus,
    resetComboTimer,
    resetSessionStats,
    setStatsState,
    statsState,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStats, import.meta.hot));
}
