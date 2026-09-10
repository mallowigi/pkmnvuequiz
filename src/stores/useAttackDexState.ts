import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, reactive } from 'vue';

import type { AttackDexGame, MoveType, AttackDexScope } from '@/attackdex/types.ts';
import type { Gen, Type } from '@/types.ts';

type AttackDexState = {
  gens: Set<Gen>;
  isAttackDex: boolean;
  moveTypes: Set<MoveType>;
  scope: AttackDexScope;
  types: Set<Type>;
};

export const useAttackDexState = defineStore('attackDexState', () => {
  const attackDexState = reactive<AttackDexState>({
    gens: new Set(),
    isAttackDex: false,
    moveTypes: new Set(),
    scope: 'standard',
    types: new Set(),
  });

  const hasSelection = computed(() => {
    if (attackDexState.scope === 'standard') {
      return attackDexState.gens.size > 0 || attackDexState.types.size > 0;
    }

    return attackDexState.moveTypes.size > 0;
  });

  const setScope = (scope: AttackDexScope) => {
    attackDexState.scope = scope;
  };

  const enterAttackDex = () => {
    attackDexState.isAttackDex = true;
    attackDexState.scope = 'standard';
  };

  const exitAttackDex = () => {
    attackDexState.isAttackDex = false;
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

  const toggleType = (type: Type) => {
    if (attackDexState.types.has(type)) {
      attackDexState.types.delete(type);
    } else {
      attackDexState.types.add(type);
    }
  };

  const selectAllTypes = (types: Type[]) => {
    attackDexState.types = new Set(types);
  };

  const clear = () => {
    attackDexState.gens.clear();
    attackDexState.moveTypes.clear();
    attackDexState.types.clear();
  };

  const clearStandardSelection = () => {
    attackDexState.gens.clear();
    attackDexState.types.clear();
  };

  const clearSpecialSelection = () => {
    attackDexState.moveTypes.clear();
  };

  const getSelection = (): AttackDexGame | null => {
    if (!hasSelection.value) return null;

    if (attackDexState.scope === 'standard') {
      if (attackDexState.types.size > 0) {
        return {
          kind: 'types',
          scope: 'standard',
          types: Array.from(attackDexState.types),
        };
      }

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
    clearSpecialSelection,
    clearStandardSelection,
    enterAttackDex,
    exitAttackDex,
    getSelection,
    hasSelection,
    selectAllGens,
    selectAllMoveTypes,
    selectAllTypes,
    setScope,
    toggleGen,
    toggleMoveType,
    toggleType,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAttackDexState, import.meta.hot));
}
