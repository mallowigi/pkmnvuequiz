import { computed } from 'vue';

import { useAttackDexState } from '@/stores/useAttackDexState.ts';
import { useCurrentStrategy } from '@/strategies/useCurrentStrategy.ts';
import { useAllStrategies } from '@/strategies/useRegistry.ts';
import type { Attack, AttackStatus, PokemonInfo, PokemonStatus } from '@/types.ts';

export type DexEntry = PokemonInfo | Attack;

export const isAttackEntry = (entry: DexEntry): entry is Attack => 'name' in entry;

export const getEntryName = (entry: DexEntry): string => (isAttackEntry(entry) ? entry.name : entry.baseName);

export const useCurrentDex = () => {
  const { attackDexState } = useAttackDexState();
  const strategy = useCurrentStrategy();
  const allStrategies = useAllStrategies();

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

  const switchDex = () => {
    allStrategies.forEach((s) => s.reset());
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
