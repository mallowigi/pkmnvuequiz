import { useCurrentGen } from '@/stores/useCurrentGen';

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

    return boxes[firstBox];
  };

  return {
    getCurrentRegion,
  };
};
