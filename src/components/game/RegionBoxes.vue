<script setup lang="ts">
import { computed } from 'vue';

import RoundedBox from '@/components/common/RoundedBox.vue';
import PokemonSprite from '@/components/game/PokemonSprite.vue';
import { useBoxes } from '@/composables/useBoxes.ts';
import { boxes } from '@/data/boxes.js';
import { specialTypes } from '@/data/specialTypes.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import { useState } from '@/stores/useState.ts';

const { getCurrentGameModeBoxes, getSpecialBoxes } = useBoxes();
const { getGenPokemon, getSpecialTypePokemon } = usePokemons();
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
    class="region-boxes"
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

      <div class="sprite-container">
        <PokemonSprite
          v-for="pokemon in getGenPokemon(box.id)"
          :key="pokemon.id"
          :pokemon="pokemon"
        />
      </div>
    </RoundedBox>

    <!-- Special Mode -->
    <RoundedBox
      class="region-box special"
      v-for="box in specialBoxes"
      v-else-if="type === 'special'"
      :key="box.id"
    >
      <span class="region-name">{{ box.name }}</span>
      <div class="sprite-container">
        <PokemonSprite
          v-for="pokemon in getSpecialTypePokemon(box.id)"
          :key="pokemon.id"
          :pokemon="pokemon"
        />
      </div>
    </RoundedBox>
  </div>
</template>

<style scoped>
.region-boxes {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 66%;

  &.full-layout {
    display: block;
    columns: 5;
    column-gap: 10px;
    padding: 10px;
    max-width: none;

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

.sprite-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  width: 100%;
  height: 100%;
  line-height: 26px;
}
</style>
