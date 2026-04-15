import { useCurrentGen } from '@/stores/gen.js';
import { regions } from '@/data/regions.js';

export const useCurrentRegion = () => {
  const { getCurrentGen } = useCurrentGen();

  const getCurrentRegion = () => {
    const currentGen = getCurrentGen();
    if (!currentGen) {
      return;
    }

    const boxes = currentGen.boxes ?? [];
    const firstBox = boxes?.[0];
    if (!firstBox) {
      return;
    }

    return regions.find((r) => r.id === firstBox);
  };

  return {
    getCurrentRegion,
  };
};