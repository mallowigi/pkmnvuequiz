<script setup lang="ts">
import { computed } from 'vue';
import { usePkmnData } from '@/stores/usePkmnStore';
import CyclingSprite from '@/components/common/CyclingSprite.vue';

import type { GenerationInfo } from '@/types';

const props = defineProps<{
  gen: GenerationInfo;
  start?: number;
}>();

// Load data
const { data } = usePkmnData();

const sprites = computed(() => {
  const encodings = data.sprites;
  if (!encodings) {
    return [];
  }
  return props.gen.sprites.map((sprite: string) => encodings[sprite]);
});
</script>

<template>
  <CyclingSprite
    :sprites="sprites"
    :start="start"
  />
</template>
