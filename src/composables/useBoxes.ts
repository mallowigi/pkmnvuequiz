import { gens } from '@/data/gens.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { usePkmnData } from '@/stores/usePkmnStore.ts';
import { useState } from '@/stores/useState.ts';

export const useBoxes = () => {
  const { state } = useState();
  const { data } = usePkmnData();
  const { getCurrentType } = useCurrentType();

  const getCurrentGenBoxes = () => {
    const currentGen = state.gen;
    if (!currentGen) return [];

    return gens[currentGen].boxes;
  };

  const getAllBoxes = () => {
    return Object.values(gens).flatMap((gen) => gen.boxes);
  };

  const getCurrentTypeBoxes = () => {
    const currentType = getCurrentType();
    if (!currentType) return [];

    return getAllBoxes().filter((box) => {
      return data.pokemon?.some((pkmn) => {
        const types = [pkmn.primaryType, pkmn.secondaryType].filter(Boolean);
        return pkmn.box === box && types.includes(currentType.id);
      });
    });
  };

  const getSpecialBoxes = () => {};

  const getCurrentGameModeBoxes = () => {
    switch (state.gameMode) {
      case 'gen':
        return getCurrentGenBoxes();
      case 'special':
        return getSpecialBoxes();
      case 'full':
        return getAllBoxes();
      case 'types':
        return getCurrentTypeBoxes();
      default:
        return [];
    }
  };

  return {
    getAllBoxes,
    getCurrentGameModeBoxes,
    getCurrentGenBoxes,
    getSpecialBoxes,
  };
};
