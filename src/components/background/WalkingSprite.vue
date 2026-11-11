<script setup lang="ts">
import { animatedSprites, getWanderingSprite } from '@/data/wanderingSprites.ts';

const animation = animatedSprites[1];
const sprite = getWanderingSprite(1);
</script>

<template>
  <div
    class="sprite"
    :style="{
      backgroundImage: `url(${sprite})`,
      width: `${animation.frameWidth}px`,
      height: `${animation.frameHeight}px`,
    }"
  />
</template>

<style scoped></style>
