<script setup lang="ts">
import { computed, capitalize } from 'vue';
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
      <div
        v-if="spriteData.shiny && state.withShinies"
        class="sprite"
        :title="capitalize(props.pokemon.baseName)"
        :style="{ '--bg-img': `url(${spriteData.shiny})` }"
      />

      <div
        v-else-if="spriteData.sprite"
        class="sprite"
        :title="capitalize(props.pokemon.baseName)"
        :style="{ '--bg-img': `url(${spriteData.sprite})` }"
      />
    </div>

    <div v-else-if="shadowed">
      <!-- TODO -->
      <!--<CyclingSprite-->
      <!--  v-if="spriteData.spriteCycle.length"-->
      <!--  :sprites="spriteData.spriteCycle"-->
      <!--/>-->

      <div
        v-if="spriteData.silhouette"
        class="sprite"
        title="Who's that Pokémon?"
        :style="{ '--bg-img': `url(${spriteData.silhouette})` }"
      />
    </div>

    <div
      v-else
      class="sprite unknown"
      :style="{ '--bg-img': `url(${unknownSprite})` }"
    />
  </section>
</template>

<style scoped>
@keyframes hover-pop {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.3); /* or whatever effect */
  }
}

@keyframes hover-out {
  from {
    transform: scale(1.3);
  }
  to {
    transform: scale(1);
  }
}

.sprite {
  width: 28px;
  height: 32px;
  overflow: visible;
  position: relative;
  animation: hover-out 0.5s ease forwards;

  &:hover {
    animation: hover-pop 0.5s ease forwards;
  }

  &.unknown {
    z-index: 0;
  }

  &:before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 44px;
    height: 44px;
    background-image: var(--bg-img);
    background-size: auto;
    background-position: bottom center;
    pointer-events: none;
    z-index: 10;
  }
}
</style>
