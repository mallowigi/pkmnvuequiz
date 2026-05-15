<script setup lang="ts">
import { computed } from 'vue';

import RoundedBox from '@/components/common/RoundedBox.vue';
import PokemonSprite from '@/components/game/PokemonSprite.vue';
import { useBoxes } from '@/composables/useBoxes.ts';
import { useColumnLayout } from '@/composables/useColumnLayout.ts';
import { boxes } from '@/data/boxes.js';
import { specialTypes } from '@/data/specialTypes.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import { useState } from '@/stores/useState.ts';
import type { SpecialType, RegionBox, PokemonInfo } from '@/types.ts';

const { getCurrentGameModeBoxes, getSpecialBoxes } = useBoxes();
const { getCurrentGameModeBoxPokemon, getSpecialTypePokemon, getStatus } = usePokemons();
const { state } = useState();
const styles = useColumnLayout();

const currentBoxes = computed(() => {
  if (state.gameMode !== 'special') {
    const currentGameModeBoxes = getCurrentGameModeBoxes();
    return currentGameModeBoxes?.map((box) => boxes[box]);
  } else {
    const specialGameModeBoxes = getSpecialBoxes();
    return specialGameModeBoxes?.map((box) => specialTypes[box]);
  }
});

function orderByFoundAt(pokemonA: PokemonInfo, pokemonB: PokemonInfo): number {
  const statusA = getStatus(pokemonA);
  const statusB = getStatus(pokemonB);

  if (!statusA.lastFoundAt && statusB.lastFoundAt) {
    return 1; // pokemonA should come after pokemonB
  } else if (statusA.lastFoundAt && !statusB.lastFoundAt) {
    return -1; // pokemonA should come before pokemonB
  } else if (!statusA.lastFoundAt && !statusB.lastFoundAt) {
    return 0; // maintain original order
  } else {
    return statusA.lastFoundAt! - statusB.lastFoundAt!;
  }
}

const getCurrentGamePokemon = (boxId: SpecialType | RegionBox): Map<string, PokemonInfo[]> => {
  let result;

  if (state.gameMode !== 'special') {
    result = getCurrentGameModeBoxPokemon(boxId as RegionBox);
  } else {
    result = getSpecialTypePokemon(boxId as SpecialType);
  }

  // Apply chaos mode sorting
  if (state.mode === 'chaos') {
    const values = Array.from(result.values());
    const sorted = values.sort((pokemonsA, pokemonsB) => orderByFoundAt(pokemonsA[0], pokemonsB[0]));
    for (const [boxId, pokemons] of result) {
      result.set(boxId, sorted.shift() ?? []);
    }
  }

  return result;
};
</script>

<template>
  <div
    class="region-boxes"
    :style="styles"
  >
    <RoundedBox
      class="region-box"
      v-for="box in currentBoxes"
      :key="box.id"
    >
      <span class="region-name">{{ box.name }}</span>

      <div class="sprite-container">
        <template
          v-for="[, pokemons] in getCurrentGamePokemon(box.id)"
          :key="pokemons[0].id"
        >
          <PokemonSprite
            v-for="pokemon in pokemons"
            :key="pokemon.id"
            :pokemon="pokemon"
            :status="getStatus(pokemon)"
          />
        </template>
      </div>
    </RoundedBox>
  </div>
</template>

<style scoped>
.region-boxes {
  display: block;
  margin: 10px;
  max-width: var(--max-width);
  columns: var(--num-cols);
  column-gap: 10px;

  & .region-box {
    display: inline-flex;
    width: 100%;
    margin: 0 0 10px;
    padding: 12px 12px 12px 10px;
    break-inside: avoid;
    border-radius: 3px 20px;
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

.region-name {
  padding-left: 10px;
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
