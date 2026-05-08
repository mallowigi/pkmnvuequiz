<script setup lang="ts">
import { computed } from 'vue';

import RoundedBox from '@/components/common/RoundedBox.vue';
import PokemonSprite from '@/components/game/PokemonSprite.vue';
import { useBoxes } from '@/composables/useBoxes.ts';
import { boxes } from '@/data/boxes.js';
import { specialTypes } from '@/data/specialTypes.ts';
import { useState } from '@/stores/useState.ts';

const { getCurrentGameModeBoxes, getSpecialBoxes } = useBoxes();
const { state } = useState();

const specialBoxes = computed(() => {
  const specialGameModeBoxes = getSpecialBoxes();
  return specialGameModeBoxes?.map((box) => specialTypes[box]);
});

const currentBoxes = computed(() => {
  const currentGameModeBoxes = getCurrentGameModeBoxes();
  return currentGameModeBoxes?.map((box) => boxes[box]);
});

const type = computed(() => {
  if (state.gameMode !== 'special') {
    return 'gen';
  } else {
    return 'special';
  }
});
</script>

<template>
  <div
    class="container"
    :class="{ 'full-layout': state.gameMode === 'full' }"
  >
    <!-- Gen/Full/Types Mode -->
    <RoundedBox
      class="region-box"
      v-for="box in currentBoxes"
      v-if="type === 'gen'"
      :key="box.id"
    >
      <span class="region-name">{{ box.name }}</span>
      <PokemonSprite
        :box="box"
        type="gen"
      />
    </RoundedBox>

    <!-- Special Mode -->
    <RoundedBox
      class="region-box special"
      v-for="box in specialBoxes"
      v-else-if="type === 'special'"
      :key="box.id"
    >
      <span class="region-name">{{ box.name }}</span>
      <PokemonSprite
        :box="box"
        type="special"
      />
    </RoundedBox>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;

  &.full-layout {
    display: block;
    columns: 5;
    column-gap: 10px;
    padding: 10px;

    & .region-box {
      display: inline-flex;
      width: 100%;
      margin: 0 0 10px;
      break-inside: avoid;
    }
  }
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
