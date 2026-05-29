<script setup lang="ts">
import { computed, ref } from 'vue';
import { typesList } from '@/data/pokemonTypes';
import { useIntervalFn } from '@vueuse/core';

const currentIndex = ref(0);

const currentType = computed(() => {
  const type = typesList[currentIndex.value];
  return {
    ...type,
    iconUrl: new URL(`/public/assets/types/${type.icon}.svg`, import.meta.url).href,
  };
});

useIntervalFn(() => {
  currentIndex.value = (currentIndex.value + 1) % typesList.length;
}, 3000);

const emits = defineEmits(['typeSelected']);

const setType = () => {
  emits('typeSelected');
};
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
