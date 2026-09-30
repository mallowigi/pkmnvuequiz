<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';

import DarkModeToggle from '@/components/header/DarkModeToggle.vue';
import GameTimer from '@/components/header/GameTimer.vue';
import PokemonCounts from '@/components/header/PokemonCounts.vue';
import PokemonInput from '@/components/header/PokemonInput.vue';
import Watermark from '@/components/header/Watermark.vue';
import { useVisualViewportOffset } from '@/composables/useVisualViewportOffset';

// Keep phone landscape eligible without applying keyboard compensation to desktop.
const isTouchLayout = useMediaQuery('(hover: none) and (pointer: coarse)');
const viewportOffset = useVisualViewportOffset(isTouchLayout);
</script>

<template>
  <header class="header" :style="viewportOffset > 0 ? { top: `${viewportOffset}px` } : undefined">
    <section class="controls">
      <div class="header-row first">
        <DarkModeToggle class="dark-mode-toggle" />

        <PokemonInput class="pokemon-input" />
      </div>

      <div class="header-row second">
        <!-- Counts -->
        <PokemonCounts />

        <!-- Timer -->
        <GameTimer />
      </div>
    </section>

    <Watermark />
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
}

.header-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  .mobile & {
    justify-content: center;
    width: 100%;
  }
}

.controls {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
