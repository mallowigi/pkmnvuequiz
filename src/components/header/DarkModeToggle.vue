<script setup lang="ts">
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useState } from '@/stores/useState.ts';

const { state, toggleDarkMode } = useState();
</script>

<template>
  <!-- Dark -->
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

  <!-- Light -->
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
