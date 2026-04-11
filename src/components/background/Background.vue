<script setup>
import { useState } from '@/stores/state.js';
import { types } from '@/data/types.js';
import { computed, onMounted } from 'vue';

const { state, setCurrentType, setDarkMode } = useState();

const currentType = computed(() => {
  return types.find(type => type.id === state.currentType);
});

onMounted(() => {
  setDarkMode(true);
  setCurrentType('ice');
});

</script>

<template>
  <div class='background'
       :class='{ typed: currentType, dark: state.isDark }'
       :style='`background-color: ${currentType?.bgColor}`'>
    <div v-if='currentType'>
      <img :alt='currentType?.name'
           :src='`/src/assets/types/${currentType?.icon}.svg`'
           id='bgpattern'
           class='bgpattern'>
      <img :alt='currentType?.name'
           :src='`/src/assets/types/${currentType?.icon}.svg`'
           id='bgpattern2'
           class='bgpattern2'>
    </div>
  </div>
</template>

<style scoped>
.background {
  background-image: url(@/assets/background-50.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-blend-mode: hard-light;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  &.dark {
    background-image: url(@/assets/background-dark.svg);
  }

  &.typed {
    background-image: url(@/assets/background-50-grey.svg);
  }

  &.typed.dark {
    background-image: url(@/assets/background-dark-grey.svg);
  }
}

.bgpattern {
  position: fixed;
  bottom: 24%;
  left: 10%;
  width: 18%;
  opacity: 0.9;
  z-index: -2;
}

.bgpattern2 {
  position: fixed;
  bottom: calc(100px + 40%);
  right: 14%;
  width: 33%;
  opacity: 0.2;
  z-index: -2;
}

</style>