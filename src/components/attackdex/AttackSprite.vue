<script setup lang="ts">
import { useIntervalFn, useScroll } from '@vueuse/core';
import { computed, ref, useTemplateRef, watch, nextTick } from 'vue';

import RevealZoomTransition from '@/components/common/transitions/RevealZoomTransition.vue';
import { useUnknownSprite } from '@/composables/useUnknownSprite.ts';
import { damageCategories } from '@/data/damageCategories.ts';
import { pokemonTypes } from '@/data/pokemonTypes.ts';
import { useAttackDetails } from '@/stores/useAttackDetails.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useLanguages } from '@/stores/useLanguages.ts';
import { useSettings } from '@/stores/useSettings.ts';
import { useState } from '@/stores/useState.ts';
import type { Type, AttackStatus, Attack, DamageCategory } from '@/types.ts';
import { blankifyName } from '@/utils/utils.ts';

type Props = {
  move: Attack;
  status: AttackStatus;
  index?: number;
};

type DisplayedSprite = {
  type: Type;
  category: DamageCategory;
  key: string;
  kind: 'found' | 'shadowed' | 'unknown';
  title: string | null;
  typeImage: string;
  categoryImage: string;
};

const props = defineProps<Props>();

const el = useTemplateRef('el');
const { isScrolling } = useScroll(el);

const { state } = useState();
const { flowState } = useGameFlow();
const { unknownSprite } = useUnknownSprite();
const { settingsState } = useSettings();
const { displayAttackDetails } = useAttackDetails();
const { getAttackTranslation } = useLanguages();

const onClick = () => {
  if (!props.status.isFound || props.status.isShadowed) return;

  displayAttackDetails(props.move);
};

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

const typeImage = computed<string>(() => {
  return `/assets/types/${typeInfo.value.id.toUpperCase()}.svg`;
});

// Z-Moves can be either physical or special, so we cycle their badge between both icons
const variableCategories: DamageCategory[] = [
  'physical',
  'special',
];
const variableCategoryIndex = ref(0);

useIntervalFn(() => {
  variableCategoryIndex.value = (variableCategoryIndex.value + 1) % variableCategories.length;
}, 3000);

const categoryImage = computed<string>(() => {
  const categoryId =
    categoryInfo.value.id === 'variable' ? variableCategories[variableCategoryIndex.value] : categoryInfo.value.id;

  return `/assets/categories/${categoryId.toUpperCase()}.svg`;
});

const displayedSprite = computed<DisplayedSprite>(() => {
  if (props.status.isFound) {
    return {
      category: props.move.category,
      categoryImage: categoryImage.value,
      key: 'found',
      kind: 'found',
      title: getAttackTranslation(props.move),
      type: props.move.type,
      typeImage: typeImage.value,
    };
  }

  if (props.status.isShadowed) {
    return {
      category: props.move.category,
      categoryImage: categoryImage.value,
      key: 'shadowed',
      kind: 'shadowed',
      title: blankifyName(getAttackTranslation(props.move)),
      type: props.move.type,
      typeImage: typeImage.value,
    };
  }

  return {
    category: props.move.category,
    categoryImage: categoryImage.value,
    key: 'unknown',
    kind: 'unknown',
    title: null,
    type: props.move.type,
    typeImage: unknownSprite.value,
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
    <RevealZoomTransition appear mode="out-in" v-if="displayedSprite.kind !== 'unknown'">
      <div
        :key="displayedSprite.key"
        @click="onClick"
        class="sprite"
        :class="displayedSprite.kind"
        v-tooltip:bottom="displayedSprite.title ?? null"
        :style="{
          '--type-img': `url(${displayedSprite.typeImage})`,
          '--category-img': `url(${displayedSprite.categoryImage})`,
        }"
      />
    </RevealZoomTransition>

    <!-- Unknown -->
    <div :key="displayedSprite.key" class="sprite unknown" v-else :style="{ '--type-img': `url(${unknownSprite})` }" />
  </section>
</template>

<style scoped>
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
    transform: scale(1.5); /* Scale up past normal size */
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
  &.shadowed {
    image-rendering: high-quality;
    animation: appear 1.5s ease-in-out backwards;
    animation-delay: var(--sprite-delay, 0.1s);

    &:hover {
      transform: scale(2);
      z-index: 10;
    }
  }

  &.sprite-swap-leave-active {
    position: absolute;
  }

  &.shadowed {
    filter: grayscale(100%);
  }

  &.unknown {
    z-index: 0;

    &:before {
      background-size: auto;
      background-position: bottom center;
      width: 44px;
      height: 56px;
    }
  }

  &:before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 32px;
    height: 32px;
    background-image: var(--type-img);
    background-size: 32px 32px;
    background-position: center;
    background-repeat: no-repeat;
    pointer-events: none;
    z-index: 10;
  }

  /* Badge for the cat */
  &.found:after,
  &.shadowed:after {
    content: '';
    position: absolute;
    right: -5px;
    top: -3px;
    width: 17px;
    height: 17px;
    border-radius: 999px;
    background-color: color-mix(in srgb, var(--button) 85%, transparent);
    background-image: var(--category-img);
    background-size: 13px 13px;
    background-position: center;
    background-repeat: no-repeat;
    border: 1px solid color-mix(in srgb, var(--text) 45%, transparent);
    box-shadow: 0 1px 3px rgb(0 0 0 / 45%);
    pointer-events: none;
    z-index: 11;
  }
}
</style>
