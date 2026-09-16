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

const displayedSprite = computed<DisplayedSprite>(() => {
  if (props.status.isFound) {
    return {
      category: props.move.category,
      key: 'found',
      kind: 'found',
      title: props.move.name,
      type: props.move.type,
    };
  }

  if (props.status.isShadowed) {
    return {
      category: props.move.category,
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

const typeInfo = computed(() => pokemonTypes[props.move.type]);

const categoryInfo = computed(() => damageCategories[props.move.category]);

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
    class="container"
    :class="{ full: state.gameMode === 'full', missed: props.status.isMissed }"
    :style="{ '--sprite-delay': spriteDelay }"
  >
    <RevealZoomTransition
      appear
      mode="out-in"
      v-if="displayedSprite.kind !== 'unknown'"
    >
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

<style scoped></style>
