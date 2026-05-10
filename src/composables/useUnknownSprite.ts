import { computed } from 'vue';

import { useState } from '@/stores/useState.ts';

export const useUnknownSprite = () => {
  const unknownSprite = computed(() => {
    const { state } = useState();
    switch (state.isDark) {
      case true:
        return '/src/assets/sprites/unknown-2.png';
      case false:
        return '/src/assets/sprites/unknown.png';
    }
  });

  return {
    unknownSprite,
  };
};
