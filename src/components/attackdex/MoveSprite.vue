<script setup lang="ts">
import { useScroll } from '@vueuse/core';
import { computed, useTemplateRef, watch, nextTick } from 'vue';

import type { MoveStatus, AttackDexMove, DamageCategory } from '@/attackdex/types.ts';
import RevealZoomTransition from '@/components/common/transitions/RevealZoomTransition.vue';
import { useUnknownSprite } from '@/composables/useUnknownSprite.ts';
import { damageCategories } from '@/data/damageCategories.ts';
import { pokemonTypes } from '@/data/pokemonTypes.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useSettings } from '@/stores/useSettings.ts';
import { useState } from '@/stores/useState.ts';
import type { Type } from '@/types.ts';

type Props = {
  move: AttackDexMove;
  status: MoveStatus;
  index?: number;
};

type DisplayedSprite = {
  type: Type;
  category: DamageCategory;
  key: string;
  kind: 'found' | 'shadowed' | 'unknown';
  title: string | null;
  image: string;
};

const props = defineProps<Props>();

const el = useTemplateRef('el');
const { isScrolling } = useScroll(el);

const { state } = useState();
const { flowState } = useGameFlow();
const { unknownSprite } = useUnknownSprite();
const { settingsState } = useSettings();

const spriteDelay = computed<string>(() => {
  const rawDelay = (props.index ?? 0) * 50;
  // Make staggering animation when we need to display all found or all shadows
  if (state.withShadows || flowState.isGivenUp) {
    return `${rawDelay}ms`;
  }

  // No delay otherwise
  return `10ms`;
});

const typeInfo = computed(() => pokemonTypes[props.move.type]);

const categoryInfo = computed(() => damageCategories[props.move.category]);

const compositeImage = computed<string>(() => {
  const typeImage = `/assets/types/${typeInfo.value.id}.svg`;
  const categoryImage = `/assets/categories/${categoryInfo.value.id.toUpperCase()}.svg`;

  // Use a CSS trick to combine the two images into one composite image
  return `url(${typeImage}), url(${categoryImage})`;
});

const displayedSprite = computed<DisplayedSprite>(() => {
  if (props.status.isFound) {
    return {
      category: props.move.category,
      image: compositeImage.value,
      key: 'found',
      kind: 'found',
      title: props.move.name,
      type: props.move.type,
    };
  }

  if (props.status.isShadowed) {
    return {
      category: props.move.category,
      image: compositeImage.value,
      key: 'shadowed',
      kind: 'shadowed',
      title: "What's that Attack?",
      type: props.move.type,
    };
  }

  return {
    category: props.move.category,
    image: unknownSprite.value,
    key: 'unknown',
    kind: 'unknown',
    title: null,
    type: props.move.type,
  };
});

watch(displayedSprite, (newSprite, oldSprite) => {
  if (newSprite.kind === 'unknown' || newSprite.kind === oldSprite?.kind) return;

  // Do not scroll if already scrolling or if scrollIntoView is disabled
  if (isScrolling.value || !settingsState.withScrollIntoView) return;

  // Lock scrolling for a bit to allow smooth scroll to finish and prevent jitter
  isScrolling.value = true;
  setTimeout(() => {
    isScrolling.value = false;
  }, 1000);

  // Use nextTick to ensure that the DOM has updated with the new sprite before scrolling
  nextTick(() => {
    el.value?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  });
});
</script>

<template>
  <section
    ref="el"
    class="container move-tile"
    :class="{ full: state.gameMode === 'full', missed: props.status.isMissed }"
    :style="{ '--sprite-delay': spriteDelay }"
  >
    <RevealZoomTransition
      appear
      mode="out-in"
      v-if="displayedSprite.kind !== 'unknown'"
    >
      <div
        :key="displayedSprite.key"
        class="sprite"
        :class="displayedSprite.kind"
        v-tooltip:bottom="displayedSprite.title ?? null"
        :style="[{ '--bg-img': `url(${displayedSprite.image})` }]"
      />
    </RevealZoomTransition>

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
/*.move-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  position: relative;

  &.missed {
    filter: grayscale(100%);
  }
}
*/

.composite {
  position: relative;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: appear 1.2s ease-in-out backwards;
  animation-delay: var(--sprite-delay, 0ms);
}

.composite.shadowed {
  /* Silhouette: same type+category artwork as Found, but flattened to a
     single dark shape so no color/name information leaks through. */
  filter: brightness(0) opacity(0.55);
}

.composite.unknown {
  width: 28px;
  height: 32px;
  background-image: var(--bg-img);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  animation: none;
}

.type-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.category-icons {
  position: absolute;
  bottom: -4px;
  right: -4px;
  display: flex;
  gap: 1px;
}

.category-icon {
  width: 16px;
  height: auto;
}

.move-name {
  font-size: 0.7rem;
  color: var(--text);
  text-align: center;
  max-width: 72px;
  overflow-wrap: break-word;
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
  transform: scale(2);
}

.container.missed > * {
  filter: grayscale(100%);
}

@keyframes appear {
  0% {
    opacity: 0;
    transform: scale(0); /* Start completely hidden and tiny */
  }
  50% {
    opacity: 1;
    transform: scale(2); /* Scale up past normal size */
  }
  75% {
    transform: scale(0.85); /* Descale below normal size */
  }
  100% {
    opacity: 1;
    transform: scale(1); /* Settle at native size */
  }
}

@keyframes pulse-drop-glow {
  from {
    filter: drop-shadow(0 0 2px var(--primary));
  }
  to {
    filter: drop-shadow(0 0 8px var(--primary));
  }
}

.sprite {
  --bg-img: none;
  width: 28px;
  height: 32px;
  overflow: visible;
  position: relative;
  transition: transform 0.5s ease;

  &.found,
  &.cycle,
  &.shadowed {
    image-rendering: high-quality;
    animation: appear 1.5s ease-in-out backwards;
    animation-delay: var(--sprite-delay, 0.1s);

    &:hover {
      transform: scale(2);
      z-index: 10;
    }

    &.shiny {
      animation:
        appear 1.5s ease-in-out backwards,
        pulse-drop-glow 1s ease-in-out infinite alternate;
    }
  }

  &.sprite-swap-leave-active {
    position: absolute;
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
    height: 56px;
    background-image: var(--bg-img);
    pointer-events: none;
    background-size: auto;
    background-position: bottom center;
    z-index: 10;
  }
}
</style>
