import type { DexEntry } from '@/composables/useCurrentDex.ts';
import { useFirebase } from '@/composables/useFirebase.ts';
import { i18n } from '@/main.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import { useProfile } from '@/stores/useProfile.ts';
import type { DexStrategy, DexId, SummaryTextParams, ShareTextParams } from '@/strategies/types.ts';
import type { PokemonInfo } from '@/types.ts';

export const usePokemonDexStrategy = (): DexStrategy => {
  const pokemons = usePokemons();
  const { createRecord } = useFirebase();
  const { updateFinishedGames } = useProfile();

  const id: DexId = 'pokemon';

  const capabilities = {
    hasCries: true,
    hasLeaderboards: true,
    hasMultiplayer: true,
    hasOrder: true,
    hasShiny: true,
    hasSpriteCycle: true,
  };

  const getEntityType = () => i18n.global.t('pokemon');

  const getSummaryText = (params: SummaryTextParams) => i18n.global.t('endOverlay.summary', params);

  const getShareText = (params: ShareTextParams) => i18n.global.t('endOverlay.shareText', params);

  const getNumFound = () => pokemons.numFound;

  const getNumShadows = () => pokemons.numShadows;

  const getRemaining = () => pokemons.remaining;

  const getMissed = () => pokemons.missed;

  const showRemaining = () => pokemons.showRemaining();

  const showRemainingShadows = () => pokemons.showRemainingShadows();

  const reset = () => pokemons.resetPokemonState();

  const getRandomRemaining = (): PokemonInfo | null => pokemons.getRandomRemainingPokemon();

  const addFound = (entries: DexEntry[]) => pokemons.addFound(entries as PokemonInfo[]);

  const find = (input: string): PokemonInfo[] | undefined => pokemons.findPokemon(input);

  const findClosest = (input: string): string | null => pokemons.findClosestPokemon(input);

  const getStatus = (entry: DexEntry) => pokemons.getStatus(entry as PokemonInfo);

  const isInCurrentGameMode = (entries: DexEntry[]) => pokemons.isPokemonInCurrentGameMode(entries as PokemonInfo[]);

  const isAlreadyFound = (entries: DexEntry[]) => pokemons.isAlreadyFound(entries as PokemonInfo[]);

  const isPartOfAnotherEntry = (value: string) => pokemons.isInRemaining(value);

  const prefillRemaining = () => pokemons.prefillRemaining();

  const addRandomShadow = () => pokemons.addRandomShadow();

  const getCurrentGameModeEntries = (): Map<string, PokemonInfo[]> => pokemons.getCurrentGameModePokemon();

  const recordGameEnd = () => {
    void createRecord();
    updateFinishedGames();
  };

  const recordGiveUp = () => {
    void createRecord();
  };

  return {
    addFound,
    addRandomShadow,
    capabilities,
    find,
    findClosest,
    getCurrentGameModeEntries,
    getEntityType,
    getMissed,
    getNumFound,
    getNumShadows,
    getRandomRemaining,
    getRemaining,
    getShareText,
    getStatus,
    getSummaryText,
    id,
    isAlreadyFound,
    isInCurrentGameMode,
    isPartOfAnotherEntry,
    prefillRemaining,
    recordGameEnd,
    recordGiveUp,
    reset,
    showRemaining,
    showRemainingShadows,
  };
};
