import { useI18n } from 'vue-i18n';

import type { DexEntry } from '@/composables/useCurrentDex.ts';
import { useCurrentDex, getEntryName } from '@/composables/useCurrentDex.ts';
import { useFeatureFlags } from '@/composables/useFeatureFlags.ts';
import { usePlaySounds } from '@/composables/usePlaySounds.ts';
import { useQuizInput } from '@/composables/useQuizInput.ts';
import { useShuffles } from '@/composables/useShuffles.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useMessages } from '@/stores/useMessages.ts';
import { useRooms } from '@/stores/useRooms.ts';
import { useSettings } from '@/stores/useSettings.ts';
import { useState } from '@/stores/useState.ts';
import { useCurrentStrategy } from '@/strategies/useCurrentStrategy.ts';
import { capitalize } from '@/utils/utils';

type Props = {
  clearInput: () => void;
};

export const usePokemonInput = ({ clearInput }: Props) => {
  const { state } = useState();
  const { settingsState } = useSettings();
  const { getShuffledType } = useCurrentType();
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
    isPartOfAnotherEntry,
  } = useCurrentDex();
  const strategy = useCurrentStrategy();
  const { playFanfare, playFailSound } = usePlaySounds();
  const { isDebugMode } = useFeatureFlags();
  const { sendMessage } = useRooms();

  const debugEnd = () => {
    clearInput();
    endGame();
  };

  const activateCheat = () => {
    playFanfare();
    const nextName = strategy.value.getNextCheatName();

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
    strategy.value.activateNextCry();
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
    if (!strategy.value.capabilities.hasOrder) return false;
    if (state.mode !== 'order' || !strategy.value.isWrongOrder(foundEntries)) return false;
    if (isPartOfAnother) return true;

    return notifyError(t('notNextPokemon', { name: capitalize(getEntryName(foundEntries[0])) }));
  };

  const handleTypeShuffle = (foundEntries: DexEntry[], _isPartOfAnother: boolean) => {
    if (!state.withTypeShuffle) return false;

    const currentType = getShuffledType();
    const types = strategy.value.getEntryTypes(foundEntries);

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
    if (!state.withBoxShuffle) return false;

    const violationBox = strategy.value.getShuffleBoxViolation(foundEntries, state.gameMode);
    if (!violationBox) return false;

    return notifyError(
      t('notInBox', {
        box: t(violationBox),
        name: capitalize(getEntryName(foundEntries[0])),
      }),
    );
  };

  const handleSuccess = (foundEntries: DexEntry[]) => {
    addFound(foundEntries);

    updateShuffles();

    strategy.value.playFoundSound(foundEntries[0]);
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
