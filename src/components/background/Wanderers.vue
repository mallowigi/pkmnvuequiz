<script setup lang="ts">
import { useDocumentVisibility } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';

import WalkingSprite from '@/components/background/WalkingSprite.vue';
import { useCurrentDex } from '@/composables/useCurrentDex.ts';
import { animatedSprites } from '@/data/wanderingSprites.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import { useWanderers } from '@/stores/useWanderers.ts';
import { sample } from '@/utils/utils.ts';

const { wanderersState } = useWanderers();
const { wandererCount } = storeToRefs(useWanderers());
const { flowState } = useGameFlow();
const { getCurrentGameModePokemon, pokemonState } = usePokemons();
const visibility = useDocumentVisibility();

const availableSpriteIds = Object.keys(animatedSprites).map(Number);

const active = computed(() => {
  return wanderersState.enabled && !flowState.isPaused && visibility.value === 'visible';
});

const hidden = computed(() => {
  if (flowState.gameSelectionState || flowState.isPaused) return true;

  return !wanderersState.enabled;
});

const getFoundSpriteIds = () => {
  const ids = new Set<number>();
  for (const [name, pokemons] of getCurrentGameModePokemon()) {
    if (pokemonState.pokemonStatuses.get(name)?.isFound && animatedSprites[pokemons[0].dexNum]) {
      ids.add(pokemons[0].dexNum);
    }
  }
  return [...ids];
};

// Only add Wanderers as the count grows, so the existing ones keep walking
watch(
  wandererCount,
  (count) => {
    while (wanderersState.wanderers.length < count) {
      const foundIds = getFoundSpriteIds();
      // TODO: only found Pokémon once all sheets are imported. For now, the sheets are a control group.
      let items = sample(foundIds.length ? foundIds : availableSpriteIds);
      if (items) {
        wanderersState.wanderers.push(items);
      }
    }
  },
  { immediate: true },
);
</script>

<template>
  <div
    class="wanderers hide-mobile"
    v-if="!hidden"
  >
    <WalkingSprite
      v-for="(spriteId, index) in wanderersState.wanderers"
      :key="index"
      :active="active"
      :sprite-id="spriteId"
    />
  </div>
</template>

<style scoped>
.wanderers {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}
</style>
