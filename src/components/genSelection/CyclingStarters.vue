<script setup>
import { computed } from 'vue';
import { usePkmnData } from '@/stores/usePkmnStore.js';
import CyclingSprite from '@/components/common/CyclingSprite.vue';

const props = defineProps({
  gen: {
    type: Object,
    required: true,
  },
  start: Number,
});

// Load data
const { data } = usePkmnData();

const sprites = computed(() => {
  const encodings = data.sprites;
  if (!encodings?.sprite) {
    return [];
  }
  return props.gen.sprites.map(sprite => encodings.sprite[sprite]);
});

</script>

<template>
  <CyclingSprite :sprites='sprites' :start='start' />
</template>