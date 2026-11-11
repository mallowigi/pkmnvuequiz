<script setup lang="ts">
import { animatedSprites, getWanderingSprite, getWalkCycleMs } from '@/data/wanderingSprites.ts';

const animation = animatedSprites[1];
const sprite = getWanderingSprite(1);

const frames = animation.durations.length;
const sheetWidth = frames * animation.frameWidth;
const duration = getWalkCycleMs(animation);
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
  animation: walk var(--duration) steps(var(--frames)) infinite;
}
</style>
