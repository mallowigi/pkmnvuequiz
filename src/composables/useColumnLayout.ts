import { computed } from 'vue';

import { useState } from '@/stores/useState.ts';

export const useColumnLayout = () => {
  const { state } = useState();

  return computed(() => {
    switch (state.gameMode) {
      case 'types':
      case 'full':
        return {
          '--max-width': 'none',
          '--num-cols': 5,
          '--sprite-width': '57px',
          '--text-padding': '0',
        };
      case 'special':
        return {
          '--max-width': '66%',
          '--num-cols': 2,
          '--sprite-width': '62px',
          '--text-padding': '10px',
        };
      case 'gen':
      default:
        return {
          '--max-width': '66%',
          '--num-cols': 1,
          '--sprite-width': '64px',
          '--text-padding': '10px',
        };
    }
  });
};
