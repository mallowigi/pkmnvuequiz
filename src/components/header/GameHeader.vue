<script setup lang="ts">
import { useElementSize } from '@vueuse/core';
import { useTemplateRef } from 'vue';

import DarkModeToggle from '@/components/header/DarkModeToggle.vue';
import GameTimer from '@/components/header/GameTimer.vue';
import PokemonCounts from '@/components/header/PokemonCounts.vue';
import PokemonInput from '@/components/header/PokemonInput.vue';
import Watermark from '@/components/header/Watermark.vue';
import { useAppBreakpoints } from '@/composables/useAppBreakpoints.ts';

const { isMobile } = useAppBreakpoints();

const headerRef = useTemplateRef<HTMLElement>('headerRef');
// `position: fixed` takes the header out of the document flow, so a spacer of the
// same (dynamic, wrapping-dependent) height keeps the rest of the page from jumping up.
const { height: headerHeight } = useElementSize(headerRef);
</script>

<template>
  <div
    v-if="isMobile"
    class="header-spacer"
    :style="{ height: `${headerHeight}px` }"
  />

  <header
    ref="headerRef"
    class="header"
    :class="{ fixed: isMobile }"
  >
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

  &.fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
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
