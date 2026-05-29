<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';

import TextBox from '@/components/common/TextBox.vue';
import LastPokemon from '@/components/header/LastPokemon.vue';
import { usePlaySounds } from '@/composables/usePlaySounds.ts';
import { useCurrentRegion } from '@/stores/useCurrentRegion.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { useDialogs } from '@/stores/useDialogs.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useMessages } from '@/stores/useMessages.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import { useRoomMessages } from '@/stores/useRoomMessages.ts';
import { useState } from '@/stores/useState.ts';
import type { PokemonInfo } from '@/types.ts';
import { capitalize } from '@/utils/utils.ts';

const { state } = useState();
const { flowState, updateInput } = useGameFlow();
const { getCurrentRegion } = useCurrentRegion();
const { getCurrentType, getCurrentTypeOrSpecial, setRandomCurrentType } = useCurrentType();
const { dialogs } = useDialogs();
const { showUserMessage } = useMessages();
const { roomState } = useRoomMessages();
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

const regionOrType = computed(() => {
  const gameMode = state.gameMode;

  switch (gameMode) {
    case 'gen':
      const currentRegion = getCurrentRegion();
      return currentRegion?.name ?? '';
    case 'types':
      const currentType = getCurrentTypeOrSpecial();
      return currentType?.name ?? '';
    case 'special':
      return 'Special';
    default:
      return '';
  }
});

const isDisabled = computed(() => {
  return (
    flowState.isPaused ||
    flowState.isEnded ||
    flowState.isGivenUp ||
    dialogs.dialog !== null ||
    roomState.roomMessage !== null
  );
});

const textBoxRef = ref<InstanceType<typeof TextBox> | null>(null);

// We need to access the input element inside the TextBox component, so we use a computed property to get it
const inputRef = computed(() => textBoxRef.value?.inputRef ?? null);

const ensureFocus = () => {
  // Do not focus if the game is in paused or ended state, or if a dialog or room message is open
  if (isDisabled.value) {
    return;
  }

  // If the focused element is not our input, do nothing
  const active = document.activeElement;
  if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA') && active !== inputRef.value) {
    return;
  }

  inputRef.value?.focus();
};

const clearInput = () => {
  inputRef.value!.value = '';
  updateInput(null);
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

const handleKeydown = (e: KeyboardEvent) => {
  // Every key down on the app will trigger focus on the input
  ensureFocus();
  updateInput(inputRef.value!.value);

  // Make sure the user is not pressing ctrl or cmd or option or delete
  if (e.ctrlKey || e.metaKey || e.altKey || e.key === 'Backspace' || e.key === 'Delete') {
    return;
  }

  // Cheat!
  if (e.key === '#') {
    activateCheat();
    return;
  }

  // Shadow helper shortcut: ',' key
  if (e.key === ',') {
    activateNextShadow();
    return;
  }

  const value = inputRef.value?.value || '';
  if (value === '') {
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
  return;
};

// Clicking anywhere on the app will trigger focus on the input
const handleMousedown = () => {
  setTimeout(ensureFocus, 0);
};

// onStartTyping(() => {
//   ensureFocus();
// });

onMounted(() => {
  ensureFocus();
  window.addEventListener('keyup', handleKeydown);
  window.addEventListener('mousedown', handleMousedown);
});

onUnmounted(() => {
  window.removeEventListener('keyup', handleKeydown);
  window.removeEventListener('mousedown', handleMousedown);
});

// Make sure to refocus the input when the state changes
watch([isDisabled], () => {
  setTimeout(ensureFocus, 0);
});
</script>

<template>
  <div
    class="box rad-bl-tr"
    :class="{ shake: flowState.isStarted, disabled: isDisabled }"
  >
    <p>Name all {{ regionOrType }} Pokémon:</p>

    <TextBox
      ref="textBoxRef"
      maxlength="13"
      autocomplete="off"
    />

    <LastPokemon />
  </div>
</template>

<style scoped>
@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}

.shake {
  animation: shake 0.5s;
  animation-iteration-count: 2;
  animation-delay: 0.3s;
}

.box {
  background: var(--type-bg-color, var(--primary));
  color: var(--type-fg-color, var(--text));
  min-height: 30px;
  line-height: 30px;
  padding: 10px 18px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  gap: 8px;

  &.disabled {
    pointer-events: none;
    opacity: 0.6;
  }
}
</style>
