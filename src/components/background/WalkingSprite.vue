<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';

import { useWanderingSprite } from '@/composables/useWanderingSprite.ts';
import { animatedSprites } from '@/data/wanderingSprites.ts';
import { type WanderingAnimation } from '@/types.ts';

const props = defineProps<{
  /** National dex number, also the name of the walking sheet */
  spriteId: number;
  /** Whether the sprite should be walking around */
  active: boolean;
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

// Each sprite wanders on its own. The margin keeps the whole sprite inside the viewport.
const { wanderingState, startWandering, resumeWandering, stopWandering } = useWanderingSprite({
  margin: Math.max(animation.frameWidth, animation.frameHeight),
});

let started = false;

const start = () => {
  if (started) {
    resumeWandering();
  } else {
    startWandering();
    started = true;
  }
};

onMounted(() => {
  if (props.active) start();
});

watch(
  () => props.active,
  (isActive) => (isActive ? start() : stopWandering()),
);

const spriteRow = computed(() => {
  const directionIndex = wanderingState.direction;
  return directionIndex * animation.frameHeight;
});

const paused = computed(() => !wanderingState.isMoving);
</script>

<template>
  <div
    class="sprite"
    :class="{ paused: paused }"
    :style="{
      transform: `translate(${wanderingState.position.x}px, ${wanderingState.position.y}px)`,
      transition: `transform ${wanderingState.legDuration}ms linear`,
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
  position: absolute;
  top: 0;
  left: 0;
  background-position-y: calc(-1 * var(--sprite-row));
  background-repeat: no-repeat;
  animation: walk var(--duration) steps(var(--frames)) infinite;

  &.paused {
    animation: none;
  }
}
</style>
