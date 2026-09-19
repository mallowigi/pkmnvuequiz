import { computed } from 'vue';

import { useAttackDexState } from '@/stores/useAttackDexState.ts';
import { useAttacks } from '@/stores/useAttacks.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import { useCurrentStrategy } from '@/strategies/useCurrentStrategy.ts';
import type { Attack, AttackStatus, PokemonInfo, PokemonStatus } from '@/types.ts';

export type DexEntry = PokemonInfo | Attack;

export const isAttackEntry = (entry: DexEntry): entry is Attack => 'name' in entry;

export const getEntryName = (entry: DexEntry): string => (isAttackEntry(entry) ? entry.name : entry.baseName);

/**
 * Routes every dex-facing member to the active dex store (`useAttacks` while the AttackDex is active, otherwise
 * `usePokemons`). It holds no state of its own so it never joins the autosave plugin. Routing is decided at call time
 * so a single setup-time destructure keeps working across dex switches.
 */
export const useCurrentDex = () => {
  const { attackDexState } = useAttackDexState();
  const strategy = useCurrentStrategy();
  const pokemons = usePokemons();
  const attacks = useAttacks();

  const isAttackDex = () => attackDexState.isAttackDex;

  const numFound = computed(() => strategy.value.getNumFound());
  const numShadows = computed(() => strategy.value.getNumShadows());
  const remaining = computed(() => strategy.value.getRemaining());
  const missed = computed<Set<DexEntry>>(() => strategy.value.getMissed());

  const showRemaining = () => strategy.value.showRemaining();

  const showRemainingShadows = () => strategy.value.showRemainingShadows();

  const reset = () => strategy.value.reset();

  const getRandomRemaining = (): DexEntry | null => strategy.value.getRandomRemaining();

  const addFound = (entries: DexEntry[]) => strategy.value.addFound(entries);

  const find = (input: string): DexEntry[] | undefined => strategy.value.find(input);

  const findClosest = (input: string): string | null => strategy.value.findClosest(input);

  const getStatus = (entry: DexEntry): PokemonStatus | AttackStatus => strategy.value.getStatus(entry);

  const isInCurrentGameMode = (entries: DexEntry[]) => strategy.value.isInCurrentGameMode(entries);

  const isAlreadyFound = (entries: DexEntry[]) => strategy.value.isAlreadyFound(entries);

  const isPartOfAnotherEntry = (value: string) => strategy.value.isPartOfAnotherEntry(value);

  const prefillRemaining = () => strategy.value.prefillRemaining();

  const addRandomShadow = () => strategy.value.addRandomShadow();

  const getCurrentGameModeEntries = (): Map<string, DexEntry[]> => strategy.value.getCurrentGameModeEntries();

  /**
   * Enforces the one-dex invariant: only the dex about to be played may hold live progress. Called from the game-start
   * flow, it clears both stores so stale entries from the other dex never leak into counters or end conditions. Must
   * NOT run from enter/exit AttackDex, which are navigation gestures.
   */
  const switchDex = () => {
    pokemons.resetPokemonState();
    attacks.resetAttacksState();
  };

  return {
    addFound,
    addRandomShadow,
    find,
    findClosest,
    getCurrentGameModeEntries,
    getRandomRemaining,
    getStatus,
    isAlreadyFound,
    isAttackDex,
    isInCurrentGameMode,
    isPartOfAnotherEntry,
    missed,
    numFound,
    numShadows,
    prefillRemaining,
    remaining,
    reset,
    showRemaining,
    showRemainingShadows,
    switchDex,
  };
};
