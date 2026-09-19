import { computed } from 'vue';

import { useAttackDexState } from '@/stores/useAttackDexState.ts';
import { useStrategyRegistry } from '@/strategies/useRegistry.ts';

export const useCurrentStrategy = () => {
  const { attackDexState } = useAttackDexState();
  const { attack, pokemon } = useStrategyRegistry();

  return computed(() => {
    switch (true) {
      case attackDexState.isAttackDex:
        return attack;
      default:
        return pokemon;
    }
  });
};
