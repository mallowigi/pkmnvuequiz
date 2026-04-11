<script setup>
import { computed } from 'vue';
import { usePkmnData } from '@/stores/pkmnStore.js';
import CyclingSprite from '@/components/genSelection/CyclingSprite.vue';

const props = defineProps({
  gen: {
    type: Object,
    required: true,
  },
  start: Number,
});

// Load data
const { state } = usePkmnData();

const sprites = computed(() => {
  const encodings = state.sprites;
  if (!encodings?.sprite) {
    return [];
  }
  return props.gen.sprites.map(sprite => encodings.sprite[sprite]);
});

</script>

<template>
  <CyclingSprite :sprites='sprites' :start='start' />
</template>