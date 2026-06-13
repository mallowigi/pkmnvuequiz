<script setup lang="ts">
import { onStartTyping } from '@vueuse/core';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import vEllipsis from '@/directives/ellipsis.ts';

import TextBox from '@/components/common/TextBox.vue';
import LastPokemon from '@/components/header/LastPokemon.vue';
import { usePokemonInput } from '@/composables/usePokemonInput.ts';
import { useCurrentRegion } from '@/stores/useCurrentRegion.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { useDialogs } from '@/stores/useDialogs.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useRoomMessages } from '@/stores/useRoomMessages.ts';
import { useState } from '@/stores/useState.ts';
import { useI18n } from 'vue-i18n';
import { capitalize } from '@/utils/utils.ts';
import { useTranslations } from '@/composables/useTranslations.ts';

const { state } = useState();
const { flowState, updateInput } = useGameFlow();
const { getCurrentRegion } = useCurrentRegion();
const { getCurrentTypeOrSpecial } = useCurrentType();
const { dialogs } = useDialogs();
const { roomState } = useRoomMessages();

const { t } = useI18n();
const { getBoxTranslation, getTypeOrSpecialTranslation } = useTranslations();

/** Clears the input field and updates the game flow state with a null input. */
const clearInput = () => {
  inputRef.value!.value = '';
  updateInput(null);
};

const { activateNextShadow, activateCheat, checkInput } = usePokemonInput({ clearInput });

const regionOrType = computed(() => {
  const gameMode = state.gameMode;

  switch (gameMode) {
    case 'gen':
      const currentRegion = getCurrentRegion();
      return currentRegion ? capitalize(getBoxTranslation(currentRegion.id)) : '';
    case 'types':
      const currentType = getCurrentTypeOrSpecial();
      return currentType ? capitalize(getTypeOrSpecialTranslation(currentType?.id)) : '';
    case 'special':
      return capitalize(t('special'));
    default:
      return '';
  }
});

const isDisabled = computed(() => {
  return (
    !flowState.isStarted ||
    flowState.isPaused ||
    flowState.isEnded ||
    flowState.isGivenUp ||
    dialogs.dialog !== null ||
    roomState.roomMessage !== null
  );
});

// Reference to the textbox
const textBoxRef = ref<InstanceType<typeof TextBox> | null>(null);

// We need to access the input element inside the TextBox component, so we use a computed property to get it
const inputRef = computed(() => textBoxRef.value?.inputRef ?? null);

const nameAllText = computed(() => {
  switch (state.gameMode) {
    case 'gen':
      return t('nameAll.gen', { name: regionOrType.value });
    case 'types':
      return t('nameAll.types', { name: regionOrType.value });
    case 'special':
      return t('nameAll.special', { name: regionOrType.value });
    default:
      return t('nameAll.full');
  }
});

const ensureFocus = () => {
  // Do not focus if the game is in paused or ended state, or if a dialog or room message is open
  if (isDisabled.value) {
    return;
  }

  inputRef.value?.focus();
};

// Handle keydown events on the document to allow typing without focusing the input
const handleKeydown = (e: KeyboardEvent) => {
  updateInput(inputRef.value!.value);

  const value = inputRef.value?.value || '';

  // Shadow helper shortcut: ',' key
  if (e.key === ',') {
    activateNextShadow();
    return;
  }

  if (value === '') {
    return;
  }

  checkInput(value);
  return;
};

// Listen to types on the document using vueuse
onStartTyping((e) => {
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

  ensureFocus();
});

// TODO remove this once vueuse adds the isTypedCharValid
onMounted(() => {
  ensureFocus();
  window.addEventListener('keyup', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keyup', handleKeydown);
});
</script>

<template>
  <div
    class="box rad-bl-tr"
    :class="{ shake: flowState.isStarted, disabled: isDisabled }"
  >
    <p
      class="instruction"
      v-ellipsis:bottom
    >
      {{ nameAllText }}
    </p>

    <TextBox
      class="pokemon-input"
      ref="textBoxRef"
      maxlength="13"
      @input="handleKeydown"
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

.pokemon-input input {
  width: 170px;

  .mobile & {
    width: 100%;
  }
}

.instruction {
  max-width: 260px;

  .laptop & {
    display: none;
  }
}
</style>
