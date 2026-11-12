<script setup lang="ts">
import { computed } from 'vue';

import { animatedSprites } from '@/data/wanderingSprites.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { type WanderingAnimation, WalkingDirection } from '@/types.ts';

const { flowState } = useGameFlow();

const props = defineProps<{
  spriteId: number;
  direction: WalkingDirection;
  moving: boolean;
}>();

const SLOWDOWN = 1.5;

const getWalkCycleMs = (animation: WanderingAnimation) => {
  const sumTicks = animation.durations.reduce((acc, duration) => acc + duration, 0);
  const milliseconds = sumTicks * (1000 / 60); // Convert ticks to milliseconds (assuming 60 ticks per second)

  return milliseconds * SLOWDOWN;
};

const getWanderingSprite = (pokemonId: number) => {
  return `assets/sprites/walking/${pokemonId}.png`;
};

const animation = animatedSprites[props.spriteId];
const sprite = getWanderingSprite(props.spriteId);

const frames = animation.durations.length;
const sheetWidth = frames * animation.frameWidth;
const duration = getWalkCycleMs(animation);

const spriteRow = computed(() => {
  const directionIndex = props.direction;
  return directionIndex * animation.frameHeight;
});

const paused = computed(() => {
  if (flowState.gameSelectionState || flowState.isPaused) return true;
  return !props.moving;
});
</script>

<template>
  <div
    class="sprite"
    :class="{ paused: paused }"
    :style="{
      backgroundImage: `url(${sprite})`,
      width: `${animation.frameWidth}px`,
      height: `${animation.frameHeight}px`,
      '--frames': frames,
      '--duration': `${duration}ms`,
      '--sheet-width': `${sheetWidth}px`,
      '--sprite-row': `${spriteRow}px`,
    }"
  />
</template>

<style scoped>
@keyframes walk {
  to {
    background-position-x: calc(-1 * var(--sheet-width));
  }
}

.sprite {
  background-position-y: calc(-1 * var(--sprite-row));
  background-repeat: no-repeat;
  animation: walk var(--duration) steps(var(--frames)) infinite;

  &.paused {
    animation: none;
  }
}
</style>
