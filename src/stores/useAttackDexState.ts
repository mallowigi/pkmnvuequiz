import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, reactive } from 'vue';

import type { AttackDexGame } from '@/attackdex/types.ts';
import { useCurrentGen } from '@/stores/useCurrentGen.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { useState } from '@/stores/useState.ts';

type AttackDexState = {
  isAttackDex: boolean;
};
export const useAttackDexState = defineStore('attackDexState', () => {
  const attackDexState = reactive<AttackDexState>({
    isAttackDex: false,
  });

  const enterAttackDex = () => {
    attackDexState.isAttackDex = true;
  };

  const exitAttackDex = () => {
    attackDexState.isAttackDex = false;
  };

  const setAttackDexState = (newAttackDexState: AttackDexState) => {
    attackDexState.isAttackDex = newAttackDexState.isAttackDex;
  };

  const hasSelection = computed(() => {
    const { state } = useState();

    if (state.gameMode === 'movetype') return true;

    if (state.gameMode === 'types') {
      const { currentTypeState } = useCurrentType();
      return currentTypeState.currentTypes.size > 0;
    }

    const { currentGenState } = useCurrentGen();
    return currentGenState.gens.size > 0;
  });

  const getSelection = (): AttackDexGame | null => {
    const { state } = useState();

    if (state.gameMode === 'movetype') {
      return {
        kind: 'movetype',
      };
    }

    if (state.gameMode === 'types') {
      const { currentTypeState } = useCurrentType();
      if (currentTypeState.currentTypes.size === 0) return null;

      return {
        kind: 'types',
        types: Array.from(currentTypeState.currentTypes),
      };
    }

    const { currentGenState } = useCurrentGen();
    if (currentGenState.gens.size === 0) return null;

    return {
      gens: Array.from(currentGenState.gens),
      kind: 'gen',
    };
  };

  return {
    attackDexState,
    enterAttackDex,
    exitAttackDex,
    getSelection,
    hasSelection,
    setAttackDexState,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAttackDexState, import.meta.hot));
}
