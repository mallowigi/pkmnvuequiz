import { computed } from 'vue';

import { pokemonTypes } from '@/data/pokemonTypes.ts';
import type { Attack } from '@/types.ts';

export const useAttackTypeStyles = (attack: Attack | null) => {
  return computed(() => {
    const typeInfo = attack && pokemonTypes[attack.type];

    return {
      '--primary-type': typeInfo?.lightBgColor ?? 'var(--type-bg-color)',
      '--primary-type-dark': typeInfo?.darkBgColor ?? 'var(--type-dark-color)',
      '--primary-type-text': typeInfo?.fgColor ?? 'var(--type-fg-color)',
      '--primary-type-text-dark': typeInfo?.fgColor ?? 'var(--type-fg-color-dark)',
      '--type-btn-color': typeInfo?.buttonColor ?? 'var(--primary)',
    };
  });
};
