<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

import { usePkmnData } from '@/stores/usePkmnStore.ts';
import { useState } from '@/stores/useState.ts';
import { normalizeName, capitalize } from '@/utils/utils.ts';

const props = defineProps<{
  sprites: readonly string[];
  start?: number;
}>();

const { data } = usePkmnData();
const { state } = useState();

const sprites = computed(() => {
  if (!data.sprites) {
    return [];
  }
  return props.sprites.map((sprite) => data.sprites![normalizeName(sprite)]);
});

const currentIndex = ref(props.start ?? 0);

let interval: ReturnType<typeof setInterval> | null = null;

const startCycle = () => {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }

  if (props.sprites.length === 0 || !state.withCycleSprites) {
    return;
  }

  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % props.sprites.length;
  }, 3000);
};

watch(
  () => [props.sprites, state.withCycleSprites],
  () => {
    startCycle();
  },
  { immediate: true },
);

onMounted(() => {
  startCycle();
});

onUnmounted(() => {
  if (interval) {
    clearInterval(interval);
  }
  interval = null;
});
</script>

<template>
  <div
    :hidden="sprites.length === 0"
    class="sprite"
    :title="sprites[currentIndex] ? capitalize(props.sprites[currentIndex]) : ''"
    :style="{ '--bg-img': `url(${sprites[currentIndex]})` }"
  />
</template>

<style scoped>
.sprite {
  --bg-img: none;
  width: 24px;
  height: 24px;
  overflow: visible;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 44px;
    height: 44px;
    background-image: var(--bg-img);
    background-size: auto;
    background-position: bottom center;
    pointer-events: none;
    z-index: 10;
  }
}
</style>
