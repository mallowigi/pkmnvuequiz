<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import RoundedBox from '@/components/common/RoundedBox.vue';
import PokemonSprite from '@/components/game/PokemonSprite.vue';
import { useBoxes } from '@/composables/useBoxes.ts';
import { boxes } from '@/data/boxes.js';
import { specialTypes } from '@/data/specialTypes.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import { useState } from '@/stores/useState.ts';
import type { SpecialType, RegionBox, PokemonInfo } from '@/types.ts';

const { getCurrentGameModeBoxes, getSpecialBoxes } = useBoxes();
const { getCurrentGameModeBoxPokemon, getSpecialTypePokemon, getStatus } = usePokemons();
const { state } = useState();
const { t } = useI18n();

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
    const entries = Array.from(result.entries());
    entries.sort(([, pokemonsA], [, pokemonsB]) => orderByFoundAt(pokemonsA[0], pokemonsB[0]));
    return new Map(entries);
  }

  return result;
};

const getBoxPokemons = (boxId: SpecialType | RegionBox): PokemonInfo[] => {
  const pokemonByName = getCurrentGamePokemon(boxId);
  return Array.from(pokemonByName.values()).map((pokemons) => pokemons[0]);
};

const isFull = (boxId: SpecialType | RegionBox) => {
  const pokemons = getBoxPokemons(boxId);
  return pokemons.every((pokemon) => getStatus(pokemon).isFound);
};
</script>

<template>
  <TransitionGroup
    name="boxes"
    tag="div"
    class="region-boxes"
    :class="state.gameMode"
    appear
  >
    <RoundedBox
      v-for="(box, index) in currentBoxes"
      :key="box.id"
      class="region-box"
      :class="{ full: isFull(box.id) }"
      :style="{ '--index': index }"
    >
      <span class="region-name">{{ t(box.id) }}</span>

      <TransitionGroup
        name="sprites"
        tag="div"
        class="sprite-container"
      >
        <PokemonSprite
          v-for="(pokemon, spriteIndex) in getBoxPokemons(box.id)"
          :key="pokemon.id"
          :pokemon="pokemon"
          :status="getStatus(pokemon)"
          :index="spriteIndex"
        />
      </TransitionGroup>
    </RoundedBox>
  </TransitionGroup>
</template>

<style scoped>
.region-boxes {
  display: block;
  margin: 10px;
  max-width: var(--max-width);
  columns: var(--col-width, auto) var(--num-cols, auto);
  column-gap: 10px;

  & .region-box {
    display: inline-flex;
    width: 100%;
    margin: 0 0 10px;
    padding: 12px 12px 12px 10px;
    break-inside: avoid;
    border-radius: 3px 20px;
  }

  &.types,
  &.full {
    --max-width: none;
    --num-cols: auto;
    --col-width: 25vh;
    --sprite-width: 57px;
    --text-padding: 0;
  }

  &.special {
    --max-width: 66%;
    --num-cols: 2;
    --sprite-width: 62px;
    --text-padding: 10px;
  }

  &.gen {
    --max-width: 66%;
    --num-cols: 1;
    --sprite-width: 64px;
    --text-padding: 10px;
  }

  .laptop & {
    max-width: 100%;
    columns: 1;
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

  transform: translate3d(0, 0, 0.1px);
  will-change: transform, visibility;
  transform-style: preserve-3d;
  transition:
    box-shadow 0.2s ease-in-out,
    transform 0.2s ease-in-out;
  box-shadow: 0 10px 20px -5px var(--glow);

  &:hover {
    --glow: var(--type-btn-color, var(--primary));
    transform: scale(1.01) translate3d(0, 0, 0.1px);
  }

  &.full {
    box-shadow: 0 0 0 2px var(--type-btn-color, var(--primary)) inset;
    animation: pop 0.4s ease-out;
  }
}

@keyframes pop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}

.region-name {
  color: var(--text);
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

.sprite-container > *:has(.shadowed) {
  filter: brightness(calc(0.9 + 0.2 * cos(sibling-index() * 1.5)));
}

.boxes-move,
.sprites-move {
  transition: transform 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.boxes-enter-active {
  transition: all 0.4s ease-out;
  transition-delay: calc(var(--index) * 40ms);
}

.boxes-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.boxes-leave-active {
  transition: all 0.3s ease-in;
}

.boxes-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
