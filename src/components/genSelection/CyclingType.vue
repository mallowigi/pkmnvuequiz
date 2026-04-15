<script setup>
import { useState } from '@/stores/useState.js';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { types } from '@/data/types.js';

const { setGameMode } = useState();

const currentIndex = ref(0);

const currentType = computed(() => {
  const type = types[currentIndex.value];
  return {
    ...type,
    iconUrl: new URL(`/src/assets/types/${type.icon}.svg`, import.meta.url).href,
  };
});

let interval;

const startCycle = () => {
  if (interval) {
    return;
  }
  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % types.length;
  }, 3000);
};

onMounted(() => {
  startCycle();
});

onUnmounted(() => {
  clearInterval(interval);
  interval = null;
});

</script>

<template>
  <div :style='{
         backgroundColor: currentType.bgColor,
         border: `2px solid ${currentType.bgColor}`,
         color: currentType.fgColor
       }'
       @click='setGameMode("types")'>
    Types
    <img :alt='currentType.name'
         :src='currentType.iconUrl'
         class='inverted-symbol'>
  </div>
</template>

<style scoped>

.inverted-symbol {
  width: 42px;
  filter: brightness(0) invert(1);
}
</style>