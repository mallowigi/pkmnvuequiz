<script setup lang="ts">
import { computed } from 'vue';

import RoundedBox from '@/components/common/RoundedBox.vue';
import PokemonSprite from '@/components/game/PokemonSprite.vue';
import { boxes } from '@/data/boxes.js';
import { useBoxes } from '@/composables/useBoxes.ts';
import { useState } from '@/stores/useState.ts';
import { specialTypes } from '@/data/specialTypes.ts';

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
  <div class="container">
    <!-- Gen/Full/Types Mode -->
    <RoundedBox
      class="region-box"
      :class="{ full: state.gameMode === 'full' }"
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
  justify-content: flex-start;
  align-items: flex-start;
}

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

  &.full {
    flex-direction: column;
    max-width: 20%;
    flex-wrap: wrap;
    flex-shrink: 0;
  }
}
</style>
