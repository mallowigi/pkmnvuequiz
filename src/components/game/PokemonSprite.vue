<script setup lang="ts">
import { computed, capitalize } from 'vue';

import { useUnknownSprite } from '@/composables/useUnknownSprite.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { usePkmnData } from '@/stores/usePkmnStore.ts';
import { useState } from '@/stores/useState.ts';
import type { PokemonInfo, PokemonStatus } from '@/types.ts';
import CyclingSprite from '@/components/common/CyclingSprite.vue';
import LastPokemon from '@/components/header/LastPokemon.vue';

const { state } = useState();
const { flowState } = useGameFlow();
const { data } = usePkmnData();
const { unknownSprite } = useUnknownSprite();

type Props = {
  pokemon: PokemonInfo;
  status: PokemonStatus;
  index?: number;
};

type SpriteData = {
  silhouette: string;
  shiny: string;
  sprite: string;
  spriteCycle: readonly string[];
};

type DisplayedSprite = {
  image: string;
  sprites?: readonly string[];
  key: string;
  kind: 'found' | 'shadowed' | 'cycle' | 'unknown';
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
    if (spriteData.value.spriteCycle.length) {
      return {
        image: spriteData.value.spriteCycle[0],
        key: 'found-cycle',
        kind: 'cycle',
        sprites: spriteData.value.spriteCycle,
        title: capitalize(props.pokemon.baseName),
      };
    }

    if (spriteData.value.shiny && props.status.isShiny) {
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

const spriteDelay = computed<string>(() => {
  const rawDelay = (props.index ?? 0) * 20;
  // Make staggering animation when we need to display all found or all shadows
  if (state.withShadows || flowState.isGivenUp) {
    return `${rawDelay}ms`;
  }

  // No delay otherwise
  return `10ms`;
});

const isDitto = computed(() => {
  return props.pokemon.baseName === 'ditto';
});
</script>

<template>
  <section
    class="container"
    :class="{ full: state.gameMode === 'full', missed: props.status.isMissed }"
    :style="{ '--sprite-delay': spriteDelay }"
  >
    <Transition
      appear
      v-if="displayedSprite.kind !== 'cycle' && displayedSprite.kind !== 'unknown' && !isDitto"
    >
      <div
        :key="displayedSprite.key"
        class="sprite"
        :class="displayedSprite.kind"
        :title="displayedSprite.title ?? undefined"
        :style="{ '--bg-img': `url(${displayedSprite.image})` }"
      />
    </Transition>

    <Transition v-else-if="displayedSprite.sprites && !isDitto">
      <CyclingSprite :sprites="displayedSprite.sprites" />
    </Transition>

    <Transition
      name="sprite-swap"
      v-else-if="isDitto && props.status.isFound && !props.status.isMissed"
    >
      <LastPokemon />
    </Transition>

    <Transition
      name="sprite-swap"
      v-else-if="isDitto && props.status.isShadowed && !props.status.isMissed"
    >
      <!-- Ditto not found -->
      <div
        :key="displayedSprite.key"
        class="sprite"
        :class="displayedSprite.kind"
        :title="displayedSprite.title ?? undefined"
        :style="{ '--bg-img': `url(${displayedSprite.image})` }"
      />
    </Transition>

    <!-- Unknown -->
    <div
      :key="displayedSprite.key"
      class="sprite unknown"
      v-else
      :style="{ '--bg-img': `url(${unknownSprite})` }"
    />
  </section>
</template>

<style scoped>
@keyframes zoomIn {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.3);
  }
}

@keyframes revealZoom {
  from {
    transform: scale(2);
  }
  to {
    transform: scale(1);
  }
}

.container {
  position: relative;
}

.sprite-swap-enter-active,
.sprite-swap-leave-active {
  transition:
    transform 700ms ease,
    opacity 0s ease;
  transition-delay: var(--sprite-delay, 0ms);
}

.sprite-swap-enter-from,
.sprite-swap-leave-to {
  opacity: 0;
  transform: scale(1.3);
}

.container.missed > * {
  opacity: 0.5;
}

.v-enter-active,
.v-leave-active {
  transition: all 1.5s ease;
}

.v-enter-from,
.v-leave-to {
  transform: scale(2);
}

.sprite {
  --bg-img: none;
  width: 28px;
  height: 32px;
  overflow: visible;
  position: relative;
  transition: transform 0.5s ease;

  &.sprite-swap-leave-active {
    position: absolute;
  }

  &.unknown {
    z-index: 0;
  }

  &:hover {
    transform: scale(1.4);
  }

  &:before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 44px;
    height: 56px;
    background-image: var(--bg-img);
    pointer-events: none;
    background-size: auto;
    background-position: bottom center;
    z-index: 10;
  }
}
</style>
