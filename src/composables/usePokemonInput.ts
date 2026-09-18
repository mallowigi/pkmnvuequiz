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
    isPartOfAnotherEntry,
  } = useCurrentDex();
  // Pokemon-only helpers with no attack analog (order, prefix matching, cries).
  const { getNextOrderedPokemon, isWrongOrder, getRandomPokemon } = usePokemons();
  const { playFanfare, playFailSound, playPokemonCry, playClick } = usePlaySounds();
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
    if (isAttackDex()) {
      // Attacks have no cry, so mirror the existing disabled-helper feedback.
      showUserMessage(t('criesHelperDisabled'));
      clearInput();
      return;
    }

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

  const handleAlreadyFound = (foundEntries: DexEntry[], isPartOfAnother: boolean) => {
    if (!isAlreadyFound(foundEntries)) return false;
    if (isPartOfAnother) return true;

    return notifyError(t('alreadyNamed', { name: capitalize(getEntryName(foundEntries[0])) }));
  };

  const handleNotInCurrentGameMode = (foundEntries: DexEntry[], isPartOfAnother: boolean) => {
    if (isInCurrentGameMode(foundEntries)) return false;
    if (isPartOfAnother) return true;

    return notifyError(t('notPartOfGame', { name: capitalize(getEntryName(foundEntries[0])) }));
  };

  const handleWrongOrder = (foundEntries: DexEntry[], isPartOfAnother: boolean) => {
    // Attacks have no order concept.
    if (isAttackDex()) return false;

    const foundPokemon = foundEntries as PokemonInfo[];
    if (state.mode !== 'order' || !isWrongOrder(foundPokemon)) return false;
    if (isPartOfAnother) return true;

    return notifyError(t('notNextPokemon', { name: capitalize(foundPokemon[0].baseName) }));
  };

  const handleTypeShuffle = (foundEntries: DexEntry[], _isPartOfAnother: boolean) => {
    if (!state.withTypeShuffle) return false;

    const currentType = getShuffledType();
    const types = isAttackDex()
      ? new Set((foundEntries as Attack[]).map((a) => a.type))
      : new Set((foundEntries as PokemonInfo[]).flatMap((p) => [p.primaryType, p.secondaryType]));

    if (currentType && !types.has(currentType.id)) {
      return notifyError(
        t('notOfType', {
          name: capitalize(getEntryName(foundEntries[0])),
          type: capitalize(t(currentType.id)),
        }),
      );
    }

    return false;
  };

  const handleBoxShuffle = (foundEntries: DexEntry[], _isPartOfAnother: boolean) => {
    // Attacks have no box shuffle.
    if (isAttackDex()) return false;
    if (!state.withBoxShuffle) return false;

    const foundPokemon = foundEntries as PokemonInfo[];
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

  const handleSuccess = (foundEntries: DexEntry[]) => {
    addFound(foundEntries);

    updateShuffles();

    // The Pokedex plays a cry on success; attacks play a click instead.
    if (isAttackDex()) {
      playClick();
    } else {
      playPokemonCry((foundEntries[0] as PokemonInfo).dexNum);
    }
    clearInput();
  };

  const { checkInput } = useQuizInput<DexEntry>({
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
    findEntries: find,
    isPartOfAnotherEntry: (value: string) => isPartOfAnotherEntry(value),
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
