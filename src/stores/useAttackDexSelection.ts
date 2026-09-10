import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, reactive } from 'vue';

import type { AttackDexGame, MoveType, AttackDexScope } from '@/attackdex/types.ts';
import type { Gen } from '@/types.ts';

type AttackDexState = {
  gens: Set<Gen>;
  moveTypes: Set<MoveType>;
  scope: AttackDexScope;
};

export const useAttackDexSelection = defineStore('attackDexSelection', () => {
  const attackDexState = reactive<AttackDexState>({
    gens: new Set(),
    moveTypes: new Set(),
    scope: 'standard',
  });

  const hasSelection = computed(() => {
    if (attackDexState.scope === 'standard') {
      return attackDexState.gens.size > 0;
    }

    return attackDexState.moveTypes.size > 0;
  });

  const setScope = (scope: AttackDexScope) => {
    attackDexState.scope = scope;
  };

  const toggleGen = (generation: Gen) => {
    if (attackDexState.gens.has(generation)) {
      attackDexState.gens.delete(generation);
    } else {
      attackDexState.gens.add(generation);
    }
  };

  const toggleMoveType = (family: MoveType) => {
    if (attackDexState.moveTypes.has(family)) {
      attackDexState.moveTypes.delete(family);
    } else {
      attackDexState.moveTypes.add(family);
    }
  };

  const selectAllGens = (gens: Gen[]) => {
    attackDexState.gens = new Set(gens);
  };

  const selectAllMoveTypes = (moveTypes: MoveType[]) => {
    attackDexState.moveTypes = new Set(moveTypes);
  };

  const clear = () => {
    attackDexState.gens.clear();
    attackDexState.moveTypes.clear();
  };

  const getSelection = (): AttackDexGame | null => {
    if (!hasSelection.value) return null;

    if (attackDexState.scope === 'standard') {
      return {
        gens: Array.from(attackDexState.gens),
        kind: 'gen',
        scope: 'standard',
      };
    }

    return {
      kind: 'special',
      moveTypes: Array.from(attackDexState.moveTypes),
      scope: 'special',
    };
  };

  return {
    attackDexState,
    clear,
    getSelection,
    hasSelection,
    selectAllGens,
    selectAllMoveTypes,
    setScope,
    toggleGen,
    toggleMoveType,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAttackDexSelection, import.meta.hot));
}
