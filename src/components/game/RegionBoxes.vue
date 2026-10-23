<script setup lang="ts">
import { useDraggable } from '@vueuse/core';
import { computed, nextTick, useTemplateRef, watch, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import AttackSprite from '@/components/attackdex/AttackSprite.vue';
import RoundedBox from '@/components/common/RoundedBox.vue';
import PokemonSprite from '@/components/game/PokemonSprite.vue';
import { getGenForBox, useBoxes } from '@/composables/useBoxes.ts';
import { boxes } from '@/data/boxes.js';
import { gens } from '@/data/gens.ts';
import { specialTypes } from '@/data/specialTypes.ts';
import { useCurrentBox } from '@/stores/useCurrentBox.ts';
import { useCurrentGen } from '@/stores/useCurrentGen.ts';
import { useState } from '@/stores/useState.ts';
import { useCurrentStrategy } from '@/strategies/useCurrentStrategy.ts';
import type {
  Attack,
  AttackStatus,
  PokemonInfo,
  PokemonStatus,
  RegionBox,
  SpecialType,
  SpecialTypeInfo,
  RegionBoxInfo,
} from '@/types.ts';

type BoxesInfo = SpecialTypeInfo[] | RegionBoxInfo[];

const { getCurrentGameModeBoxes, getSpecialBoxes } = useBoxes();
const { currentBoxState } = useCurrentBox();
const { currentGenState } = useCurrentGen();
const { state } = useState();
const { t } = useI18n();
const strategy = useCurrentStrategy();

const currentBoxes = computed(() => {
  switch (state.gameMode) {
    case 'special':
      const specialGameModeBoxes = getSpecialBoxes();
      return specialGameModeBoxes?.map((box) => specialTypes[box]);
    default:
      const currentGameModeBoxes = getCurrentGameModeBoxes();
      return currentGameModeBoxes?.map((box) => boxes[box]);
  }
});

const regionColorMap: Partial<Record<RegionBox, string>> = {};
(Object.keys(boxes) as RegionBox[]).forEach((boxId) => {
  const gen = getGenForBox(boxId);
  if (gen) {
    regionColorMap[boxId] = gens[gen].color;
  }
});

const getBoxColor = (boxId: SpecialType | RegionBox): string | undefined => {
  if (state.gameMode === 'special') {
    return specialTypes[boxId as SpecialType]?.bgColor;
  }
  return regionColorMap[boxId as RegionBox];
};

const isDimmed = (boxId: SpecialType | RegionBox) => {
  if (!state.withBoxShuffle) return false;

  switch (state.gameMode) {
    case 'special':
      return currentBoxState.currentSpecialBox !== boxId;
    case 'mega':
      return currentBoxState.currentMegaBox !== boxId;
    default:
      return currentBoxState.currentBox !== boxId;
  }
};

// Scrolling to active box
const rootRef = useTemplateRef<HTMLElement>('rootRef');

const activeBoxId = computed(() => {
  if (!state.withBoxShuffle) return null;

  switch (state.gameMode) {
    case 'special':
      return currentBoxState.currentSpecialBox;
    case 'mega':
      return currentBoxState.currentMegaBox;
    default:
      return currentBoxState.currentBox;
  }
});

watch(activeBoxId, (newBoxId) => {
  if (!newBoxId) return;

  // Wait for the sprite animations/layout to settle before scrolling
  nextTick(() => {
    rootRef.value?.querySelector<HTMLElement>(`[data-box-id="${newBoxId}"]`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
});

const multiGenClass = computed(() => {
  if (state.gameMode !== 'gen') return null;

  const genCount = currentGenState.gens.size;
  if (genCount <= 1) return null;
  if (genCount <= 4) return 'multi-gen-2';
  if (genCount <= 7) return 'multi-gen-3';
  return 'multi-gen-auto';
});

// region Drag and Drop
const draggedId = ref<string | null>(null);
const dragOffset = ref({ x: 0, y: 0 });
const grabPoint = ref({ x: 0, y: 0 });
const pointer = ref({ x: 0, y: 0 });

const orderedBoxes = ref<BoxesInfo>([]);

watch(
  currentBoxes,
  (newBoxes) => {
    orderedBoxes.value = [...newBoxes] as BoxesInfo;
  },
  { immediate: true },
);

const moveBox = (fromId: string | null, toId: string | null) => {
  if (!fromId || !toId || fromId === toId) return;
  // Like in drag and drop, we first remove the moved item from our list
  const movedItem = orderedBoxes.value.find((box) => box.id === fromId);
  const restItems = orderedBoxes.value.filter((box) => box.id !== fromId);

  // Then we need to place that item at our location
  const toIdIndex = orderedBoxes.value.findIndex((box) => box.id === toId);

  const reorderedBoxes = [...restItems.slice(0, toIdIndex), movedItem, ...restItems.slice(toIdIndex)];

  orderedBoxes.value = reorderedBoxes as BoxesInfo;
};

const updateDragOffset = () => {
  if (!draggedId.value) return;

  const el = rootRef.value?.querySelector(`[data-box-id="${draggedId.value}"]`) as HTMLElement | null;
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const layoutLeft = rect.left - dragOffset.value.x;
  const layoutTop = rect.top - dragOffset.value.y;

  dragOffset.value.x = pointer.value.x - grabPoint.value.x - layoutLeft;
  dragOffset.value.y = pointer.value.y - grabPoint.value.y - layoutTop;
};

useDraggable(rootRef, {
  onEnd: () => {
    draggedId.value = null;
    dragOffset.value.x = 0;
    dragOffset.value.y = 0;
  },
  onMove: (_position, event) => {
    if (!draggedId.value) return;

    pointer.value.x = event.clientX;
    pointer.value.y = event.clientY;

    const overId = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>('[data-box-id]')
      ?.dataset.boxId;

    if (overId && overId !== draggedId.value) {
      moveBox(draggedId.value, overId);
      nextTick(updateDragOffset);
    } else {
      updateDragOffset();
    }
  },
  onStart: (_position, event) => {
    const target = event.target as HTMLElement;
    const boxEl = target.closest<HTMLElement>('[data-box-id]');

    // Only the box title acts as drag handle
    if (!boxEl || !target.closest('.region-name')) return false;

    const rect = boxEl.getBoundingClientRect();
    grabPoint.value.x = event.clientX - rect.left;
    grabPoint.value.y = event.clientY - rect.top;

    pointer.value.x = event.clientX;
    pointer.value.y = event.clientY;

    dragOffset.value.x = 0;
    dragOffset.value.y = 0;

    draggedId.value = boxEl.dataset.boxId ?? null;
  },
  pointerTypes: ['mouse'],
  preventDefault: true,
});
// endregion
</script>

<template>
  <div
    ref="rootRef"
    class="region-boxes"
    :class="[state.gameMode, multiGenClass]"
  >
    <RoundedBox
      v-for="(box, index) in orderedBoxes"
      :key="box.id"
      v-motion
      :initial="{ opacity: 0, y: 50 }"
      :animate="{
        opacity: 1,
        y: 0,
        transition: {
          delay: index * 0.05,
          duration: 0.4,
        },
      }"
      class="region-box"
      :data-box-id="box.id"
      :class="{
        full: strategy.isBoxComplete(box.id),
        dimmed: isDimmed(box.id),
        dragging: draggedId === box.id,
      }"
      :style="{
        '--region-color': getBoxColor(box.id),
        ...(draggedId === box.id ? { translate: `${dragOffset.x}px ${dragOffset.y}px` } : {}),
      }"
    >
      <span class="region-name">{{ t(box.id) }}</span>

      <div class="sprite-container">
        <AttackSprite
          v-if="strategy.id === 'attack'"
          v-for="(move, index) in strategy.getBoxEntries(box.id) as Attack[]"
          :key="move.id"
          :move="move"
          :status="strategy.getStatus(move) as AttackStatus"
          :index="index"
        />

        <PokemonSprite
          v-else
          v-for="(pokemon, index) in strategy.getBoxEntries(box.id) as PokemonInfo[]"
          :key="pokemon.id"
          :pokemon="pokemon"
          :status="strategy.getStatus(pokemon) as PokemonStatus"
          :index="index"
        />
      </div>
    </RoundedBox>
  </div>
</template>

<style scoped>
.region-boxes {
  display: block;
  margin: 10px;
  max-width: var(--max-width);
  columns: var(--col-width, auto) var(--num-cols, auto);
  column-gap: 10px;

  & .region-box {
    /* Must stay block-level flex (not inline-flex): Chromium fails to balance
       multi-column content across columns when children are inline-flex. */
    display: flex;
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
    align-self: stretch;
    width: 100%;
  }

  &.special {
    --max-width: 66%;
    --num-cols: 2;
    --sprite-width: 62px;
    --text-padding: 10px;
  }

  &.mega {
    --max-width: 66%;
    --num-cols: 1;
    --sprite-width: 62px;
    --text-padding: 10px;
  }

  &.gen {
    --max-width: 66%;
    --num-cols: 1;
    --sprite-width: 64px;
    --text-padding: 10px;
  }

  &.movetype {
    --max-width: 66%;
    --num-cols: 1;
    --sprite-width: 62px;
    --text-padding: 10px;
  }

  &.multi-gen-2 {
    --max-width: 66%;
    --num-cols: 2;
    --sprite-width: 62px;
    --text-padding: 10px;
  }

  &.multi-gen-3 {
    --max-width: 100%;
    --num-cols: 3;
    --sprite-width: 62px;
    --text-padding: 10px;
  }

  &.multi-gen-auto {
    --max-width: none;
    --num-cols: auto;
    --col-width: 25vh;
    --sprite-width: 62px;
    --text-padding: 10px;
    align-self: stretch;
    width: 100%;
  }

  .laptop & {
    max-width: 100%;
    columns: 1;
  }
}

.region-boxes .region-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  max-height: inherit;
  border: none;
  border: 3px solid color-mix(in srgb, var(--region-color, var(--primary)) 50%, var(--button));

  transform: translate3d(0, 0, 0.1px);
  will-change: transform, visibility;
  transform-style: preserve-3d;
  transition:
    box-shadow 0.2s ease-in-out,
    border 0.2s ease-in-out;
  box-shadow: 0 10px 20px -5px var(--glow);

  &:hover {
    --glow: var(--region-color, var(--type-btn-color, var(--primary)));
  }

  &.full {
    box-shadow: 0 0 0 3px var(--type-btn-color, var(--primary)) inset;
  }

  &.dimmed {
    filter: brightness(0.5) saturate(0.5);
  }

  &:has(.sprite-container:empty) {
    display: none;
  }

  &.dragging {
    position: relative;
    z-index: 100;
    scale: 1.01;
    filter: opacity(0.8);
    transition: all 0.2s ease-out;
    cursor: grabbing;
    box-shadow: 0 0 0 3px var(--region-color, var(--primary));
  }
}

.region-name {
  color: var(--text);
  padding-left: 10px;
  cursor: grab;
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

.region-box {
  scroll-margin-top: 120px;
}

.sprite-container > *:has(.shadowed) {
  filter: brightness(calc(0.9 + 0.2 * cos(sibling-index() * 1.5)));
}
</style>
