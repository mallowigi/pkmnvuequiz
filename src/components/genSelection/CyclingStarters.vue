<script setup lang="ts">
import { computed } from 'vue';
import { usePkmnData } from '@/stores/usePkmnStore';
import CyclingSprite from '@/components/common/CyclingSprite.vue';

import type { Gen } from '@/types';

const props = defineProps<{
  gen: Gen;
  start?: number;
}>();

// Load data
const { data } = usePkmnData();

const sprites = computed(() => {
  const encodings = data.sprites;
  if (!encodings?.sprite) {
    return [];
  }
  return props.gen.sprites.map((sprite: string) => encodings.sprite[sprite]);
});
</script>

<template>
  <CyclingSprite
    :sprites="sprites"
    :start="start"
  />
</template>
