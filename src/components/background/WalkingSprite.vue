<script setup lang="ts">
import { computed } from 'vue';

import { animatedSprites, getWanderingSprite, getWalkCycleMs, WalkingDirection } from '@/data/wanderingSprites.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';

const { flowState } = useGameFlow();

const props = defineProps<{
  spriteId: number;
  direction: WalkingDirection;
}>();

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
  return flowState.gameSelectionState || flowState.isPaused;
});
</script>

<template>
  <div
    class="sprite"
    :style="{
      backgroundImage: `url(${sprite})`,
      width: `${animation.frameWidth}px`,
      height: `${animation.frameHeight}px`,
      '--frames': frames,
      '--duration': `${duration}ms`,
      '--sheet-width': `${sheetWidth}px`,
      '--sprite-row': `${spriteRow}px`,
      '--paused': paused ? 'paused' : 'running',
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
  animation-play-state: var(--paused);
}
</style>
