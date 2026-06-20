<script setup lang="ts">
import { computed, ref } from 'vue';
import { useIntervalFn } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import { megaTypesList } from '@/data/megaTypes.ts';

const { t } = useI18n();

const currentIndex = ref(0);

const currentType = computed(() => {
  const type = megaTypesList[currentIndex.value];
  return {
    ...type,
    iconUrl: new URL(`/public/assets/types/${type.icon}.svg`, import.meta.url).href,
  };
});

useIntervalFn(() => {
  currentIndex.value = (currentIndex.value + 1) % megaTypesList.length;
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
    {{ t('special') }}
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
