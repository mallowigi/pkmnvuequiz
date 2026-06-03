<script setup lang="ts">
import DarkModeToggle from '@/components/header/DarkModeToggle.vue';
import GameTimer from '@/components/header/GameTimer.vue';
import PokemonCounts from '@/components/header/PokemonCounts.vue';
import PokemonInput from '@/components/header/PokemonInput.vue';
import Watermark from '@/components/header/Watermark.vue';
</script>

<template>
  <header class="header">
    <section class="controls">
      <DarkModeToggle />

      <PokemonInput />

      <PokemonCounts />

      <GameTimer />
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

.controls {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
}
</style>
