import { useI18n } from 'vue-i18n';

import type { DexEntry } from '@/composables/useCurrentDex.ts';
import { useCurrentDex, getEntryName } from '@/composables/useCurrentDex.ts';
import { useFeatureFlags } from '@/composables/useFeatureFlags.ts';
import { usePlaySounds } from '@/composables/usePlaySounds.ts';
import { useQuizInput } from '@/composables/useQuizInput.ts';
import { useShuffles } from '@/composables/useShuffles.ts';
import { useCurrentBox } from '@/stores/useCurrentBox.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useMessages } from '@/stores/useMessages.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import { useRooms } from '@/stores/useRooms.ts';
import { useSettings } from '@/stores/useSettings.ts';
import { useState } from '@/stores/useState.ts';
import type { Attack, PokemonInfo, SpecialType, RegionBox } from '@/types.ts';
import { capitalize } from '@/utils/utils';

type Props = {
  clearInput: () => void;
};

export const usePokemonInput = ({ clearInput }: Props) => {
  const { state } = useState();
  const { settingsState } = useSettings();
  const { getShuffledType } = useCurrentType();
  const { currentBoxState } = useCurrentBox();
  const { updateShuffles } = useShuffles();
  const { showUserMessage } = useMessages();
  const { endGame, toggleMissingno } = useGameFlow();
  const { t } = useI18n();
  const {
    isInCurrentGameMode,
    addRandomShadow,
    find,
    addFound,
    isAlreadyFound,
    prefillRemaining,
    getRandomRemaining,
    isAttackDex,
  } = useCurrentDex();
  // Pokemon-only helpers with no attack analog (order, prefix matching, cries).
  const { isInRemaining, getNextOrderedPokemon, isWrongOrder, getRandomPokemon } = usePokemons();
  const { playFanfare, playFailSound, playPokemonCry } = usePlaySounds();
  const { isDebugMode } = useFeatureFlags();
  const { sendMessage } = useRooms();

  const debugEnd = () => {
    clearInput();
    endGame();
  };

  const activateCheat = () => {
    playFanfare();
    let nextName = '???';

    if (isAttackDex()) {
      const nextAttack = getRandomRemaining();
      if (nextAttack) {
        nextName = getEntryName(nextAttack);
      }
    } else {
      nextName = getNextOrderedPokemon()?.baseName ?? '???';
    }

    showUserMessage(t('nextPokemon', { name: capitalize(nextName) }));
    clearInput();
  };

  const activateNextShadow = () => {
    if (settingsState.withShadowHelper) {
      addRandomShadow();
    } else {
      showUserMessage(t('shadowHelperDisabled'));
    }
    clearInput();
  };

  const activateNextCry = () => {
    if (settingsState.withCriesHelper) {
      const randomPokemon = getRandomPokemon();
      playPokemonCry(randomPokemon?.dexNum ?? 0);
    } else {
      showUserMessage(t('criesHelperDisabled'));
    }
    clearInput();
  };

  const notifyError = (message: string) => {
    showUserMessage(message);
    playFailSound();
    clearInput();
    return true;
  };

  const handleAlreadyFound = (foundPokemon: PokemonInfo[], isPartOfAnotherPokemon: boolean) => {
    if (!isAlreadyFound(foundPokemon)) return false;
    if (isPartOfAnotherPokemon) return true;

    return notifyError(t('alreadyNamed', { name: capitalize(foundPokemon[0].baseName) }));
  };

  const handleNotInCurrentGameMode = (foundPokemon: PokemonInfo[], isPartOfAnotherPokemon: boolean) => {
    if (isPokemonInCurrentGameMode(foundPokemon)) return false;
    if (isPartOfAnotherPokemon) return true;

    return notifyError(t('notPartOfGame', { name: capitalize(foundPokemon[0].baseName) }));
  };

  const handleWrongOrder = (foundPokemon: PokemonInfo[], isPartOfAnotherPokemon: boolean) => {
    if (state.mode !== 'order' || !isWrongOrder(foundPokemon)) return false;
    if (isPartOfAnotherPokemon) return true;

    return notifyError(t('notNextPokemon', { name: capitalize(foundPokemon[0].baseName) }));
  };

  const handleTypeShuffle = (foundPokemon: PokemonInfo[], _isPartOfAnotherPokemon: boolean) => {
    if (!state.withTypeShuffle) return false;

    const currentType = getShuffledType();
    const types = new Set(foundPokemon.flatMap((p) => [p.primaryType, p.secondaryType]));

    if (currentType && !types.has(currentType.id)) {
      return notifyError(
        t('notOfType', {
          name: capitalize(foundPokemon[0].baseName),
          type: capitalize(t(currentType.id)),
        }),
      );
    }

    return false;
  };

  const handleBoxShuffle = (foundPokemon: PokemonInfo[], _isPartOfAnotherPokemon: boolean) => {
    if (!state.withBoxShuffle) return false;
    let currentBox: SpecialType | RegionBox | null;
    let boxes: Set<unknown>;

    switch (state.gameMode) {
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

    if (currentBox && !boxes.has(currentBox)) {
      return notifyError(
        t('notInBox', {
          box: t(currentBox),
          name: capitalize(foundPokemon[0].baseName),
        }),
      );
    }

    return false;
  };

  const handleSuccess = (foundPokemon: PokemonInfo[]) => {
    addFound(foundPokemon);

    updateShuffles();

    playPokemonCry(foundPokemon[0].dexNum);
    clearInput();
  };

  const { checkInput } = useQuizInput<PokemonInfo>({
    commands: [
      {
        isEnabled: () => isDebugMode.value,
        keyword: 'endGame',
        run: debugEnd,
      },
      {
        isEnabled: () => isDebugMode.value,
        keyword: 'prefill',
        run: () => {
          prefillRemaining();
          showUserMessage(t('cheatPrefill'));
          clearInput();
        },
      },
      {
        keyword: 'missingno',
        run: () => {
          toggleMissingno(true);
          clearInput();
        },
      },
    ],
    constraints: [
      handleAlreadyFound,
      handleNotInCurrentGameMode,
      handleWrongOrder,
      handleTypeShuffle,
      handleBoxShuffle,
    ],
    findEntries: findPokemon,
    isPartOfAnotherEntry: isInRemaining,
    onRecognized: sendMessage,
    onSuccess: handleSuccess,
  });

  return {
    activateCheat,
    activateNextCry,
    activateNextShadow,
    checkInput,
  };
};
