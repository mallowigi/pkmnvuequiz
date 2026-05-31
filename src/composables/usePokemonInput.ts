import type { PokemonInfo } from '@/types.ts';
import { useState } from '@/stores/useState.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { useMessages } from '@/stores/useMessages.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import { usePlaySounds } from '@/composables/usePlaySounds.ts';
import { capitalize } from '@/utils/utils';
import { useGameFlow } from '@/stores/useGameFlow.ts';

type Props = {
  clearInput: () => void;
};

export const usePokemonInput = ({ clearInput }: Props) => {
  const { state } = useState();
  const { getCurrentType, setRandomCurrentType } = useCurrentType();
  const { showUserMessage } = useMessages();
  const { endGame } = useGameFlow();
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
    endGame();
  };

  const activateCheat = () => {
    playFanfare();
    showUserMessage(`Next Pokemon: ${capitalize(getNextOrderedPokemon()?.baseName ?? '???')}`);
    clearInput();
  };

  const activateNextShadow = () => {
    if (state.withShadowHelper) {
      addRandomShadow();
    } else {
      showUserMessage('Shadow helper is disabled. Enable it in settings to use this shortcut.');
    }
    clearInput();
  };

  const handleAlreadyFound = (pokemons: PokemonInfo[], isPartOfAnotherPokemon: boolean) => {
    if (isPartOfAnotherPokemon) {
      // Allow continue typing
      return;
    }

    showUserMessage(`${capitalize(pokemons[0].baseName)} already named.`);
    playFailSound();
    clearInput();
  };

  const handleNotInCurrentGameMode = (value: string, isPartOfAnotherPokemon: boolean) => {
    if (isPartOfAnotherPokemon) {
      // Allow continue typing
      return;
    }

    showUserMessage(`${capitalize(value)} is not part of this game.`);
    playFailSound();
    clearInput();
  };

  const handleWrongOrder = (foundPokemon: PokemonInfo[], isPartOfAnotherPokemon: boolean) => {
    if (isPartOfAnotherPokemon) {
      // Allow continue typing
      return;
    }

    showUserMessage(`${capitalize(foundPokemon[0].baseName)} is not the next Pokemon.`);
    playFailSound();
    clearInput();
  };

  const handleTypeShuffle = (foundPokemon: PokemonInfo[], isPartOfAnotherPokemon: boolean) => {
    if (isPartOfAnotherPokemon) {
      // Allow continue typing
      return;
    }

    const currentType = getCurrentType();
    const types = new Set();
    for (const pokemon of foundPokemon) {
      types.add(pokemon.primaryType);
      types.add(pokemon.secondaryType);
    }

    if (currentType && !types.has(currentType.id)) {
      showUserMessage(`${capitalize(foundPokemon[0].baseName)} is not of type ${capitalize(currentType.name)}.`);
      playFailSound();
      clearInput();
      return;
    }
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
    if (isAlreadyFound(foundPokemon)) {
      handleAlreadyFound(foundPokemon, isPartOfAnotherPokemon);
      return;
    }

    if (!isPokemonInCurrentGameMode(foundPokemon)) {
      handleNotInCurrentGameMode(value, isPartOfAnotherPokemon);
      return;
    }

    // order mode
    if (state.mode === 'order' && isWrongOrder(foundPokemon)) {
      handleWrongOrder(foundPokemon, isPartOfAnotherPokemon);
      return;
    }

    if (state.withTypeShuffle) {
      handleTypeShuffle(foundPokemon, isPartOfAnotherPokemon);
      return;
    }

    // Add the pokemon at last
    addFound(foundPokemon);

    if (state.withTypeShuffle) {
      setRandomCurrentType();
    }

    playPokemonCry(foundPokemon[0].dexNum);
    clearInput();
  };

  return {
    activateCheat,
    activateNextShadow,
    checkInput,
  };
};
