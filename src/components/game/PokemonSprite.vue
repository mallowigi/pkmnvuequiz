<script setup lang="ts">
import { computed } from 'vue';

import CyclingSprite from '@/components/common/CyclingSprite.vue';
import ZoomTransition from '@/components/common/ZoomTransition.vue';
import { useUnknownSprite } from '@/composables/useUnknownSprite.ts';
import { usePkmnData } from '@/stores/usePkmnStore.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import { useState } from '@/stores/useState.ts';
import type { PokemonInfo } from '@/types.ts';

const { state } = useState();
const { data } = usePkmnData();
const { isPokemonFound, isPokemonShadowed } = usePokemons();
const { unknownSprite } = useUnknownSprite();

type Props = {
  pokemon: PokemonInfo;
};

type SpriteData = {
  silhouette: string;
  shiny: string;
  sprite: string;
  spriteCycle: readonly string[];
};

const props = defineProps<Props>();

const spriteData = computed<SpriteData>(() => {
  const { silhouettes, sprites, spriteCycles, shinies } = data;
  return {
    shiny: shinies?.[props.pokemon.id] ?? '',
    silhouette: silhouettes?.[props.pokemon.id] ?? '',
    sprite: sprites?.[props.pokemon.id] ?? '',
    spriteCycle: spriteCycles?.[props.pokemon.id] ?? [],
  };
});

const found = computed(() => isPokemonFound(props.pokemon));

const shadowed = computed(() => isPokemonShadowed(props.pokemon));
</script>

<template>
  <section
    class="container"
    :class="{ full: state.gameMode === 'full' }"
  >
    <div v-if="found">
      <ZoomTransition>
        <img
          v-if="spriteData.shiny && state.withShinies"
          class="sprite"
          :src="spriteData.shiny"
          :alt="`${props.pokemon.baseName}`"
        />

        <img
          v-else-if="spriteData.sprite"
          class="sprite"
          :src="spriteData.sprite"
          :alt="`Shiny ${props.pokemon.baseName}`"
        />
      </ZoomTransition>
    </div>

    <div v-else-if="shadowed">
      <CyclingSprite
        v-if="spriteData.spriteCycle.length"
        :sprites="spriteData.spriteCycle"
      />

      <img
        v-else-if="spriteData.silhouette"
        class="sprite"
        :src="spriteData.silhouette"
        :alt="`${props.pokemon.baseName} silhouette`"
      />
    </div>

    <img
      v-else
      class="sprite"
      :src="unknownSprite"
      alt="Guess the Pokémon"
    />
  </section>
</template>

<style scoped>
.sprite {
  margin: -25px -20px -10px -10px;
  width: var(--sprite-width);
  height: 56px;
  object-fit: none;
  object-position: 100% 0;

  &:hover {
    transform: scale(1.3) translate(0, -5px);
  }
}
</style>
