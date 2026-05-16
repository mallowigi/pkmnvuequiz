<script setup lang="ts">
import CyclingSprite from '@/components/common/CyclingSprite.vue';
import type { GenerationInfo } from '@/types';

const props = defineProps<{
  gen: GenerationInfo;
  start?: number;
}>();
</script>

<template>
  <CyclingSprite
    :sprites="props.gen.sprites"
    :start="start"
  />
</template>
