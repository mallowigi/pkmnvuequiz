<script setup lang="ts">
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useState } from '@/stores/useState.ts';

const { state, toggleDarkMode } = useState();
</script>

<template>
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
</style>
