import { defineStore, acceptHMRUpdate } from 'pinia';
import { boxes } from '@/data/boxes';
import { useCurrentGen } from '@/stores/useCurrentGen';

export const useCurrentRegion = defineStore('currentRegion', () => {
  const { getCurrentGen } = useCurrentGen();

  const getCurrentRegion = () => {
    const currentGen = getCurrentGen();
    if (!currentGen) {
      return;
    }

    const firstBox = currentGen.boxes?.[0];
    if (!firstBox) {
      return;
    }

    return boxes[firstBox];
  };

  return {
    getCurrentRegion,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCurrentRegion, import.meta.hot));
}
