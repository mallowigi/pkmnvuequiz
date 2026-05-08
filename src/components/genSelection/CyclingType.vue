<script setup lang="ts">
import { useGameFlow } from '@/stores/useGameFlow';
import { useState } from '@/stores/useState';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { typesList } from '@/data/types';

const { setStarted } = useGameFlow();
const { setGameMode } = useState();

const currentIndex = ref(0);

const currentType = computed(() => {
  const type = typesList[currentIndex.value];
  return {
    ...type,
    iconUrl: new URL(`/src/assets/types/${type.icon}.svg`, import.meta.url).href,
  };
});

let interval: ReturnType<typeof setInterval> | null = null;

const startCycle = () => {
  if (interval) {
    return;
  }
  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % typesList.length;
  }, 3000);
};

const setType = () => {
  setGameMode('types');
  setStarted(true);
};

onMounted(() => {
  startCycle();
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
  interval = null;
});
</script>

<template>
  <div
    :style="{
      backgroundColor: currentType.bgColor,
      border: `2px solid ${currentType.bgColor}`,
      color: currentType.fgColor,
    }"
    @click="setType"
  >
    Types
    <img
      :alt="currentType.name"
      :src="currentType.iconUrl"
      class="inverted-symbol"
    />
  </div>
</template>

<style scoped>
.inverted-symbol {
  width: 42px;
  filter: brightness(0) invert(1);
}
</style>
