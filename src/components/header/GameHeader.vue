<script setup>
import { useState } from '@/stores/useState.js';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { computed } from 'vue';
import { usePokemons } from '@/stores/usePokemons.js';
import { useCurrentRegion } from '@/stores/useCurrentRegion.js';
import { useCurrentType } from '@/stores/useCurrentType.js';

const { state, toggleDarkMode } = useState();
const { getPokemon } = usePokemons();
const { getCurrentRegion } = useCurrentRegion();
const { getCurrentType } = useCurrentType();

const unknownSprite = computed(() => {
  switch (state.isDark) {
    case true:
      return '/src/assets/sprites/unknown-2.png';
    case false:
      return '/src/assets/sprites/unknown.png';
  }
});

const regionOrType = computed(() => {
  const gameMode = state.gameMode;

  switch (gameMode) {
    case 'gen':
      const currentRegion = getCurrentRegion();
      return currentRegion?.name ?? '';
    case 'types':
      const currentType = getCurrentType();
      return currentType?.name ?? '';
    case 'special':
      return 'Special';
    default:
      return '';
  }
});

const total = computed(() => {
  const pokemons = getPokemon();
  return pokemons.length ?? 0;
});

// todo move to hook
const elapsed = computed(() => {
  const total = state.timer.elapsed ?? 0;
  const hours = String(Math.floor(total / 3600));
  const minutes = String(Math.floor(total / 60));
  const seconds = String(total % 60);

  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
});

const boxStyles = computed(() => {
  const currentType = getCurrentType();
  return {
    '--bg-color': currentType?.bgColor,
    '--text': currentType?.fgColor,
  };
});
</script>

<template>
  <header class="header">
    <section
      class="controls"
      :style="boxStyles"
    >
      <RoundedButton
        class="cell moon"
        v-if="!state.isDark"
        @click="toggleDarkMode"
      >
        <img
          src="@/assets/moon.svg"
          class="icon"
          alt="Dark mode"
        />
      </RoundedButton>
      <RoundedButton
        class="cell sun"
        v-else
        @click="toggleDarkMode"
      >
        <img
          src="@/assets/sun.svg"
          class="icon"
          alt="Light mode"
        />
      </RoundedButton>

      <div class="box rad-bl-tr shake">
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

      <div class="box rad-bl-tr counter">
        <span class="highlight">{{ state.numFound }}</span> / {{ total }}
      </div>

      <div class="box rad-bl-tr">
        Timer: <span class="highlight">{{ elapsed }}</span>
      </div>
    </section>

    <div class="url">pkmnquiz.com</div>
  </header>
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

.header {
  position: fixed;
  top: 0;
  z-index: 2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
}

.controls {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
}

.cell {
  height: 51px;
  width: 38px;
  min-width: 38px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;

  &.sun {
    background-color: #ed9a1e;
    border-color: #ed9a1e;
  }

  &.moon {
    background-color: #3f3972;
    border-color: #3f3972;
  }

  & .icon {
    filter: brightness(0) invert(1);
    width: 24px;
    height: 24px;
  }
}

.box {
  background: var(--bg-color, var(--primary));
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
  color: var(--text);
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

.url {
  font-size: 20px;
  z-index: 10;
  padding: 4px 0 10px 40px;
  border-top: 3px dotted var(--bg-color, var(--primary));
  color: var(--text);
}

.counter {
  padding-left: 30px;
  padding-right: 30px;
}

.highlight {
  color: var(--text-inverted);
  text-shadow: 0 0 5px white;
}
</style>
