<script setup lang="ts">
import { computed, capitalize } from 'vue';
import { useUnknownSprite } from '@/composables/useUnknownSprite.ts';
import { usePkmnData } from '@/stores/usePkmnStore.ts';
import { useState } from '@/stores/useState.ts';
import type { PokemonInfo, PokemonStatus } from '@/types.ts';

const { state } = useState();
const { data } = usePkmnData();
const { unknownSprite } = useUnknownSprite();

type Props = {
  pokemon: PokemonInfo;
  status: PokemonStatus;
};

type SpriteData = {
  silhouette: string;
  shiny: string;
  sprite: string;
  spriteCycle: readonly string[];
};

type DisplayedSprite = {
  image: string;
  key: string;
  kind: 'found' | 'shadowed' | 'unknown';
  title: string | null;
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

const displayedSprite = computed<DisplayedSprite>(() => {
  if (props.status.isFound) {
    if (spriteData.value.shiny && state.withShinies) {
      return {
        image: spriteData.value.shiny,
        key: 'found-shiny',
        kind: 'found',
        title: capitalize(props.pokemon.baseName),
      };
    }

    if (spriteData.value.sprite) {
      return {
        image: spriteData.value.sprite,
        key: 'found-default',
        kind: 'found',
        title: capitalize(props.pokemon.baseName),
      };
    }
  }

  if (props.status.isShadowed && spriteData.value.silhouette) {
    return {
      image: spriteData.value.silhouette,
      key: 'shadowed',
      kind: 'shadowed',
      title: "Who's that Pokemon?",
    };
  }

  return {
    image: unknownSprite.value,
    key: 'unknown',
    kind: 'unknown',
    title: null,
  };
});
</script>

<template>
  <section
    class="container"
    :class="{ full: state.gameMode === 'full' }"
  >
    <div
      :key="displayedSprite.key"
      class="sprite"
      :class="{ unknown: displayedSprite.kind === 'unknown' }"
      :title="displayedSprite.title ?? undefined"
      :style="{ '--bg-img': `url(${displayedSprite.image})` }"
    />
  </section>
</template>

<style scoped>
@keyframes hover-pop {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.3);
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
  --bg-img: none;
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
