import { useI18n } from 'vue-i18n';

import { usePlaySounds } from '@/composables/usePlaySounds.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useMessages } from '@/stores/useMessages.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import { useState } from '@/stores/useState.ts';
import type { PokemonInfo } from '@/types.ts';
import { capitalize } from '@/utils/utils';

type Props = {
  clearInput: () => void;
};

export const usePokemonInput = ({ clearInput }: Props) => {
  const { state } = useState();
  const { setRandomCurrentPokemon } = usePokemons();
  const { getCurrentType, setRandomCurrentType } = useCurrentType();
  const { showUserMessage } = useMessages();
  const { endGame } = useGameFlow();
  const { t } = useI18n();
  const {
    isPokemonInCurrentGameMode,
    isInRemaining,
    addRandomShadow,
    findPokemon,
    addFound,
    isAlreadyFound,
    getNextOrderedPokemon,
    isWrongOrder,
  } = usePokemons();
  const { playFanfare, playFailSound, playPokemonCry } = usePlaySounds();

  const debugEnd = () => {
    clearInput();
    endGame();
  };

  const activateCheat = () => {
    playFanfare();
    showUserMessage(t('nextPokemon', { name: capitalize(getNextOrderedPokemon()?.baseName ?? '???') }));
    clearInput();
  };

  const activateNextShadow = () => {
    if (state.withShadowHelper) {
      addRandomShadow();
    } else {
      showUserMessage(t('shadowHelperDisabled'));
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

    return notifyError(`${capitalize(foundPokemon[0].baseName)} already named.`);
  };

  const handleNotInCurrentGameMode = (foundPokemon: PokemonInfo[], isPartOfAnotherPokemon: boolean) => {
    if (isPokemonInCurrentGameMode(foundPokemon)) return false;
    if (isPartOfAnotherPokemon) return true;

    return notifyError(`${capitalize(foundPokemon[0].baseName)} is not part of this game.`);
  };

  const handleWrongOrder = (foundPokemon: PokemonInfo[], isPartOfAnotherPokemon: boolean) => {
    if (state.mode !== 'order' || !isWrongOrder(foundPokemon)) return false;
    if (isPartOfAnotherPokemon) return true;

    return notifyError(`${capitalize(foundPokemon[0].baseName)} is not the next Pokemon.`);
  };

  const handleTypeShuffle = (foundPokemon: PokemonInfo[], _isPartOfAnotherPokemon: boolean) => {
    if (!state.withTypeShuffle) return false;
    // if (isPartOfAnotherPokemon) return true;

    const currentType = getCurrentType();
    const types = new Set(foundPokemon.flatMap((p) => [p.primaryType, p.secondaryType]));

    if (currentType && !types.has(currentType.id)) {
      return notifyError(`${capitalize(foundPokemon[0].baseName)} is not of type ${capitalize(currentType.name)}.`);
    }

    return false;
  };

  const handleSuccess = (foundPokemon: PokemonInfo[]) => {
    addFound(foundPokemon);

    if (state.withTypeShuffle) {
      setRandomCurrentType();
    }

    if (state.withCriesShuffle) {
      setRandomCurrentPokemon();
    }

    playPokemonCry(foundPokemon[0].dexNum);
    clearInput();
    return true;
  };

  const checkInput = (value: string) => {
    if (value === 'debug') {
      debugEnd();
      return;
    }

    const foundPokemon = findPokemon(value);
    if (!foundPokemon) {
      return;
    }

    const isPartOfAnotherPokemon = isInRemaining(value);

    const handlers = [
      () => handleAlreadyFound(foundPokemon, isPartOfAnotherPokemon),
      () => handleNotInCurrentGameMode(foundPokemon, isPartOfAnotherPokemon),
      () => handleWrongOrder(foundPokemon, isPartOfAnotherPokemon),
      () => handleTypeShuffle(foundPokemon, isPartOfAnotherPokemon),
      () => handleSuccess(foundPokemon),
    ];

    for (const handle of handlers) {
      if (handle()) return;
    }
  };

  return {
    activateCheat,
    activateNextShadow,
    checkInput,
  };
};
