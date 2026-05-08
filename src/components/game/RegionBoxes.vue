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

const currentBoxes = computed(() => {
  if (state.gameMode !== 'special') {
    const currentGameModeBoxes = getCurrentGameModeBoxes();
    return currentGameModeBoxes?.map((box) => boxes[box]);
  } else {
    const specialBoxes = getSpecialBoxes();
    return specialBoxes?.map((box) => specialTypes[box]);
  }
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
  <RoundedBox
    class="region-box"
    v-for="box in currentBoxes"
    :key="box.id"
  >
    <span class="region-name">{{ box.name }}</span>
    <PokemonSprite
      :box="box"
      :type="type"
    />
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
