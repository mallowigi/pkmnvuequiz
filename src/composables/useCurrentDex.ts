import { computed } from 'vue';

import { useAttackDexState } from '@/stores/useAttackDexState.ts';
import { useAttacks } from '@/stores/useAttacks.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
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
  const pokemons = usePokemons();
  const attacks = useAttacks();

  const isAttackDex = () => attackDexState.isAttackDex;

  const numFound = computed(() => (isAttackDex() ? attacks.numFound : pokemons.numFound));
  const numShadows = computed(() => (isAttackDex() ? attacks.numShadows : pokemons.numShadows));
  const remaining = computed(() => (isAttackDex() ? attacks.remaining : pokemons.remaining));
  const missed = computed<Set<DexEntry>>(() => (isAttackDex() ? attacks.missed : pokemons.missed));

  const showRemaining = () => (isAttackDex() ? attacks.showRemaining() : pokemons.showRemaining());

  const showRemainingShadows = () => (isAttackDex() ? attacks.showRemainingShadows() : pokemons.showRemainingShadows());

  const reset = () => (isAttackDex() ? attacks.resetAttacksState() : pokemons.resetPokemonState());

  const getRandomRemaining = (): DexEntry | null =>
    isAttackDex() ? attacks.getRandomRemainingAttack() : pokemons.getRandomRemainingPokemon();

  const addFound = (entries: DexEntry[]) =>
    isAttackDex() ? attacks.addFound(entries as Attack[]) : pokemons.addFound(entries as PokemonInfo[]);

  const find = (input: string): DexEntry[] | undefined =>
    isAttackDex() ? attacks.findAttack(input) : pokemons.findPokemon(input);

  const findClosest = (input: string): string | null =>
    isAttackDex() ? attacks.findClosestAttack(input) : pokemons.findClosestPokemon(input);

  const getStatus = (entry: DexEntry): PokemonStatus | AttackStatus =>
    isAttackEntry(entry) ? attacks.getStatus(entry) : pokemons.getStatus(entry);

  const isInCurrentGameMode = (entries: DexEntry[]) =>
    isAttackDex()
      ? attacks.isAttackInCurrentGameMode(entries as Attack[])
      : pokemons.isPokemonInCurrentGameMode(entries as PokemonInfo[]);

  const isAlreadyFound = (entries: DexEntry[]) =>
    isAttackDex() ? attacks.isAlreadyFound(entries as Attack[]) : pokemons.isAlreadyFound(entries as PokemonInfo[]);

  const prefillRemaining = () => (isAttackDex() ? attacks.prefillRemaining() : pokemons.prefillRemaining());

  const addRandomShadow = () => (isAttackDex() ? attacks.addRandomShadow() : pokemons.addRandomShadow());

  const getCurrentGameModeEntries = (): Map<string, DexEntry[]> =>
    isAttackDex() ? attacks.getCurrentGameModeAttacks() : pokemons.getCurrentGameModePokemon();

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
