<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { typesList } from '@/data/pokemonTypes';

const { t } = useI18n();

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
</script>

<template>
  <div
    :style="{
      backgroundColor: currentType.bgColor,
      border: `2px solid ${currentType.bgColor}`,
      color: currentType.fgColor,
    }"
  >
    {{ t('types') }}
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
