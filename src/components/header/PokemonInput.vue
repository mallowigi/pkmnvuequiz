<script setup lang="ts">
import { useState } from '@/stores/useState.ts';
import { computed } from 'vue';
import { useCurrentRegion } from '@/stores/useCurrentRegion.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';

const { state } = useState();
const { getCurrentRegion } = useCurrentRegion();
const { getCurrentTypeOrSpecial } = useCurrentType();

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

const unknownSprite = computed(() => {
  switch (state.isDark) {
    case true:
      return '/src/assets/sprites/unknown-2.png';
    case false:
      return '/src/assets/sprites/unknown.png';
  }
});
</script>

<template>
  <div
    class="box rad-bl-tr"
    :class="{ shake: state.isStarted }"
  >
    <p>Name all {{ regionOrType }} Pokémon:</p>
    <input
      type="text"
      class="input-name"
      maxlength="13"
      autocomplete="off"
    />
    <img
      class="recent-sprite"
      :src="unknownSprite"
      alt="Recent sprite"
    />
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
  background: var(--type-bg-color);
  color: white;
  min-height: 30px;
  line-height: 30px;
  padding: 10px 18px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  gap: 8px;
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

.recent-sprite {
  margin: -25px -20px -10px -10px;
  width: 64px;
  height: 56px;
  object-fit: none;
  object-position: 100% 0;
}
</style>
