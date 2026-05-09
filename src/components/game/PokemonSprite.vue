<script setup lang="ts">
import { computed } from 'vue';
import { useState } from '@/stores/useState.ts';
import type { PokemonInfo } from '@/types.ts';

const { state } = useState();

type Props = {
  pokemon: PokemonInfo;
};

const props = defineProps<Props>();

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
  <section
    class="container"
    :class="{ full: state.gameMode === 'full' }"
  >
    <img
      class="sprite"
      :src="unknownSprite"
      alt="Unknown Pokemon"
    />
  </section>
</template>

<style scoped>
.sprite {
  margin: -25px -20px -10px -10px;
  width: 64px;
  height: 56px;
  object-fit: none;
  object-position: 100% 0;
}

.full .sprite {
  margin: -36px -19px -12px -20px;
  width: 63px;
}
</style>
