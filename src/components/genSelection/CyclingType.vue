<script setup>
import { useState } from '@/stores/state.js';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { types } from '@/data/types.js';

const { setGen } = useState();

const currentIndex = ref(0);

const currentType = computed(() => {
  const type = types[currentIndex.value];
  return {
    ...type,
    iconUrl: new URL(`../../assets/types/${type.icon}.svg`, import.meta.url).href,
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
  <div class='pad rad-bl-tr green'
       :style='{
         backgroundColor: currentType.bgColor,
         border: `2px solid ${currentType.bgColor}`,
         color: currentType.fgColor
       }'
       @click='setGen("types")'>
    Types
    <img :alt='currentType.name'
         :src='currentType.iconUrl'
         class='inverted-symbol'>
  </div>
</template>

<style scoped>

.pad {
  color: white;
  padding: 14px 20px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  min-height: 30px;
  line-height: 30px;
  font-size: 18px;
  min-width: 80px;
}

.inverted-symbol {
  width: 42px;
  margin: -5px -12px -15px 8px;
  filter: brightness(0) invert(1);
}
</style>