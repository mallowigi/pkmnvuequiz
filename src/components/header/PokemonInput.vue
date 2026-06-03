<script setup lang="ts">
import { onStartTyping } from '@vueuse/core';
import { computed, ref, onMounted, onUnmounted } from 'vue';

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

const { state } = useState();
const { flowState, updateInput } = useGameFlow();
const { getCurrentRegion } = useCurrentRegion();
const { getCurrentTypeOrSpecial } = useCurrentType();
const { dialogs } = useDialogs();
const { roomState } = useRoomMessages();

const { t } = useI18n({});

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
      return currentRegion ? capitalize(t(currentRegion.id)) : '';
    case 'types':
      const currentType = getCurrentTypeOrSpecial();
      return currentType ? capitalize(t(currentType.id)) : '';
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
    <p>{{ t(state.gameMode ? `nameAll.${state.gameMode}` : 'nameAllRegionPokemon', { name: regionOrType }) }}</p>

    <TextBox
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
</style>

<i18n>
{
  "en": {
    "nameAll": {
      "full": "Name all Pokémon!",
      "gen": "Name all {name} Pokémon!",
      "special": "Name all {name} Pokémon!",
      "types": "Name all {name} Pokémon!"
    },
    "nameAllRegionPokemon": "Name all Pokémon!"
  },
  "de": {
    "nameAll": {
      "full": "Nenne alle Pokémon!",
      "gen": "Nenne alle {name}-Pokémon!",
      "special": "Nenne alle {name}-Pokémon!",
      "types": "Nenne alle {name}-Pokémon!"
    },
    "nameAllRegionPokemon": "Nenne alle Pokémon!"
  },
  "es": {
    "nameAll": {
      "full": "¡Nombra a todos los Pokémon!",
      "gen": "¡Nombra a todos los Pokémon de {name}!",
      "special": "¡Nombra a todos los Pokémon {name}!",
      "types": "¡Nombra a todos los Pokémon de tipo {name}!"
    },
    "nameAllRegionPokemon": "¡Nombra a todos los Pokémon!"
  },
  "fr": {
    "nameAll": {
      "full": "Nomme tous les Pokémon!",
      "gen": "Nomme tous les Pokémon de {name}!",
      "special": "Nomme tous les Pokémon {name}!",
      "types": "Nomme tous les Pokémon de type {name}!"
    },
    "nameAllRegionPokemon": "Nomme tous les Pokémon!"
  },
  "it": {
    "nameAll": {
      "full": "Nomina tutti i Pokémon!",
      "gen": "Nomina tutti i Pokémon di {name}!",
      "special": "Nomina tutti i Pokémon {name}!",
      "types": "Nomina tutti i Pokémon di tipo {name}!"
    },
    "nameAllRegionPokemon": "Nomina tutti i Pokémon!"
  },
  "pt": {
    "nameAll": {
      "full": "Nomeie todos os Pokémon!",
      "gen": "Nomeie todos os Pokémon de {name}!",
      "special": "Nomeie todos os Pokémon {name}!",
      "types": "Nomeie todos os Pokémon de tipo {name}!"
    },
    "nameAllRegionPokemon": "Nomeie todos os Pokémon!"
  },
  "ru": {
    "nameAll": {
      "full": "Назовите всех покемонов!",
      "gen": "Назовите всех покемонов из {name}!",
      "special": "Назовите всех {name} покемонов!",
      "types": "Назовите всех покемонов типа {name}!"
    },
    "nameAllRegionPokemon": "Назовите всех покемонов!"
  },
  "zh": {
    "nameAll": {
      "full": "说出所有宝可梦的名字！",
      "gen": "说出所有{name}的宝可梦的名字！",
      "special": "说出所有{name}的宝可梦的名字！",
      "types": "说出所有{name}类型的宝可梦的名字！"
    },
    "nameAllRegionPokemon": "说出所有宝可梦的名字！"
  },
  "ko": {
    "nameAll": {
      "full": "모든 포켓몬의 이름을 말해봐!",
      "gen": "{name}의 포켓몬의 이름을 모두 말해봐!",
      "special": "{name}의 포켓몬의 이름을 모두 말해봐!",
      "types": "{name}타입의 포켓몬의 이름을 모두 말해봐!"
    },
    "nameAllRegionPokemon": "모든 포켓몬의 이름을 말해봐!"
  },
  "jp": {
    "nameAll": {
      "full": "すべてのポケモンの名前を言って！",
      "gen": "{name}のポケモンの名前をすべて言って！",
      "special": "{name}のポケモンの名前をすべて言って！",
      "types": "{name}タイプのポケモンの名前をすべて言って！"
    },
    "nameAllRegionPokemon": "すべてのポケモンの名前を言って！"
  }
}
</i18n>
