import type { DexEntry } from '@/composables/useCurrentDex.ts';
import { useFirebase } from '@/composables/useFirebase.ts';
import { usePlaySounds } from '@/composables/usePlaySounds.ts';
import { i18n } from '@/main.ts';
import { useCurrentBox } from '@/stores/useCurrentBox.ts';
import { useMessages } from '@/stores/useMessages.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import { useProfile } from '@/stores/useProfile.ts';
import { useSettings } from '@/stores/useSettings.ts';
import type { DexStrategy, DexId, SummaryTextParams, ShareTextParams, ShuffleBoxes } from '@/strategies/types.ts';
import type { PokemonInfo, Type, GameMode, RegionBox, SpecialType } from '@/types.ts';

export const usePokemonDexStrategy = (): DexStrategy => {
  const pokemons = usePokemons();
  const { createRecord } = useFirebase();
  const { updateFinishedGames } = useProfile();
  const { showUserMessage } = useMessages();
  const { settingsState } = useSettings();
  const { currentBoxState } = useCurrentBox();
  const { playPokemonCry } = usePlaySounds();

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

  const getShuffleType = (entry: DexEntry): Type => {
    const pokemon = entry as PokemonInfo;
    if (!pokemon.secondaryType) return pokemon.primaryType;

    return Math.random() < 0.5 ? pokemon.primaryType : pokemon.secondaryType;
  };

  const getShuffleBoxes = (entry: DexEntry): ShuffleBoxes => {
    const pokemon = entry as PokemonInfo;

    return {
      box: pokemon.box ?? null,
      megaBox: pokemon.box ?? null,
      specialBox: pokemon.specialType ?? null,
    };
  };

  const getNextCheatName = (): string => pokemons.getNextOrderedPokemon()?.baseName ?? '???';

  const activateNextCry = () => {
    if (settingsState.withCriesHelper) {
      const randomPokemon = pokemons.getRandomPokemon();
      playPokemonCry(randomPokemon?.dexNum ?? 0);
    } else {
      showUserMessage(i18n.global.t('criesHelperDisabled'));
    }
  };

  const isWrongOrder = (entries: DexEntry[]) => pokemons.isWrongOrder(entries as PokemonInfo[]);

  const getEntryTypes = (entries: DexEntry[]): Set<Type | null | undefined> => {
    const foundPokemon = entries as PokemonInfo[];
    return new Set(foundPokemon.flatMap((p) => [p.primaryType, p.secondaryType]));
  };

  const getShuffleBoxViolation = (
    entries: DexEntry[],
    gameMode: GameMode | null | undefined,
  ): RegionBox | SpecialType | null => {
    const foundPokemon = entries as PokemonInfo[];
    let currentBox: SpecialType | RegionBox | null;
    let boxes: Set<unknown>;

    switch (gameMode) {
      case 'special':
        currentBox = currentBoxState.currentSpecialBox;
        boxes = new Set(foundPokemon.map((p) => p.specialType));
        break;
      case 'mega':
        currentBox = currentBoxState.currentMegaBox;
        boxes = new Set(foundPokemon.map((p) => p.box));
        break;
      default:
        currentBox = currentBoxState.currentBox;
        boxes = new Set(foundPokemon.map((p) => p.box));
        break;
    }

    if (currentBox && !boxes.has(currentBox)) return currentBox;

    return null;
  };

  const playFoundSound = (entry: DexEntry) => playPokemonCry((entry as PokemonInfo).dexNum);

  return {
    activateNextCry,
    addFound,
    addRandomShadow,
    capabilities,
    find,
    findClosest,
    getCurrentGameModeEntries,
    getEntityType,
    getEntryTypes,
    getMissed,
    getNextCheatName,
    getNumFound,
    getNumShadows,
    getRandomRemaining,
    getRemaining,
    getShareText,
    getShuffleBoxViolation,
    getShuffleBoxes,
    getShuffleType,
    getStatus,
    getSummaryText,
    id,
    isAlreadyFound,
    isInCurrentGameMode,
    isPartOfAnotherEntry,
    isWrongOrder,
    playFoundSound,
    prefillRemaining,
    recordGameEnd,
    recordGiveUp,
    reset,
    showRemaining,
    showRemainingShadows,
  };
};
