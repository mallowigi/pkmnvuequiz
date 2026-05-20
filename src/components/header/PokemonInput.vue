<script setup lang="ts">
import { useSound } from '@vueuse/sound';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

import LastPokemon from '@/components/header/LastPokemon.vue';
import { useCurrentRegion } from '@/stores/useCurrentRegion.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { useDialogs } from '@/stores/useDialogs.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useMessages } from '@/stores/useMessages.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import { useRoomMessages } from '@/stores/useRoomMessages.ts';
import { useState } from '@/stores/useState.ts';
import { capitalize } from '@/utils/utils.ts';

const { state } = useState();
const { flowState } = useGameFlow();
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

const soundFile = ref();
const { play } = useSound(soundFile, { interrupt: true, volume: 0.5 });

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

const inputRef = ref<HTMLInputElement | null>(null);

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

const playFailSound = () => {
  if (state.withSound) {
    soundFile.value = 'assets/sounds/wrong.mp3';
    setTimeout(() => {
      play();
    }, 50);
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  // Every key down on the app will trigger focus on the input
  ensureFocus();

  // Make sure the user is not pressing ctrl or cmd or option or delete
  if (e.ctrlKey || e.metaKey || e.altKey || e.key === 'Backspace' || e.key === 'Delete') {
    return;
  }

  // Cheat!
  if (e.key === '#') {
    showUserMessage(`Next Pokemon: ${capitalize(getNextOrderedPokemon()?.baseName ?? '???')}`);
    inputRef.value!.value = '';
    return;
  }

  // Shadow helper shortcut: ',' key
  if (e.key === ',') {
    if (state.withShadowHelper) {
      addRandomShadow();
    } else {
      showUserMessage('Shadow helper is disabled. Enable it in settings to use this shortcut.');
    }
    inputRef.value!.value = '';
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

  const isPartOfAnotherPokemon = isInRemaining(foundPokemon);
  if (isAlreadyFound(foundPokemon)) {
    if (isPartOfAnotherPokemon) {
      // Allow continue typing
      return;
    }

    showUserMessage(`${capitalize(value)} already named.`);
    playFailSound();
    inputRef.value!.value = '';
    return;
  }

  if (!isPokemonInCurrentGameMode(foundPokemon)) {
    if (isPartOfAnotherPokemon) {
      // Allow continue typing
      return;
    }

    showUserMessage(`${capitalize(value)} is not part of this game.`);
    playFailSound();
    inputRef.value!.value = '';
    return;
  }

  // order mode
  if (state.mode === 'order' && isWrongOrder(foundPokemon)) {
    if (isPartOfAnotherPokemon) {
      // Allow continue typing
      return;
    }

    showUserMessage(`${capitalize(value)} is not the next Pokemon.`);
    playFailSound();
    inputRef.value!.value = '';
    return;
  }

  if (state.withTypeShuffle) {
    const currentType = getCurrentType();
    const types = [foundPokemon[0].primaryType, foundPokemon[0].secondaryType].filter(Boolean);

    if (currentType && !types.includes(currentType.id)) {
      showUserMessage(`${capitalize(value)} is not of type ${capitalize(currentType.name)}.`);
      playFailSound();
      inputRef.value!.value = '';
      return;
    }
  }

  // Add the pokemon at last
  addFound(foundPokemon);

  if (state.withTypeShuffle) {
    setRandomCurrentType();
  }

  if (state.withSound) {
    soundFile.value = `assets/sounds/latest/${foundPokemon[0].dexNum}.ogg`;
    setTimeout(() => {
      play();
    }, 50);
  }

  inputRef.value!.value = '';
  return;
};

// Clicking anywhere on the app will trigger focus on the input
const handleMousedown = () => {
  setTimeout(ensureFocus, 0);
};

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
    <input
      ref="inputRef"
      type="text"
      class="input-name"
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

.input-name {
  color: var(--input-text);
  background-color: var(--secondary);
  font-size: 20px;
  width: 170px;
  border-radius: 4px 10px 4px 4px;
  border: 2px solid #444;
  padding: 2px 2px 2px 4px;

  &:focus {
    outline: none;
    background: white;
  }
}
</style>
