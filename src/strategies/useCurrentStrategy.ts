import { computed } from 'vue';

import { useAttackDexState } from '@/stores/useAttackDexState.ts';
import type { DexId } from '@/strategies/types.ts';
import { useStrategyRegistry } from '@/strategies/useRegistry.ts';

export const useCurrentStrategy = () => {
  const { attackDexState } = useAttackDexState();
  const registry = useStrategyRegistry();

  const getCurrentDexId = (): DexId => {
    return attackDexState.isAttackDex ? 'attack' : 'pokemon';
  };

  return computed(() => registry[getCurrentDexId()]);
};
