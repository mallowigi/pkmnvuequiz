<script setup lang="ts">
import { computed } from 'vue';

import RoundedBox from '@/components/common/RoundedBox.vue';
import PokemonSprite from '@/components/game/PokemonSprite.vue';
import { boxes } from '@/data/boxes.js';
import { useBoxes } from '@/composables/useBoxes.ts';

const { getCurrentGameModeBoxes } = useBoxes();

const boxes = computed(() => {
  const currentGameModeBoxes = getCurrentGameModeBoxes();

  return currentGameModeBoxes?.map((box) => boxes[box]);
});
</script>

<template>
  <RoundedBox
    class="region-box"
    v-for="box in boxes"
    :key="box.id"
  >
    <span class="region-name">{{ box.name }}</span>
    <PokemonSprite :box="box" />
  </RoundedBox>
</template>

<style scoped>
.region-name {
  padding-left: 7px;
}

.region-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  max-height: inherit;
  margin: 10px;
  border: none;
}
</style>
