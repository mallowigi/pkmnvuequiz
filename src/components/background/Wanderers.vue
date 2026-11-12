<script setup lang="ts">
import { useDocumentVisibility } from '@vueuse/core';
import { computed } from 'vue';

import WalkingSprite from '@/components/background/WalkingSprite.vue';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useWanderers } from '@/stores/useWanderers.ts';

const { wanderersState } = useWanderers();
const { flowState } = useGameFlow();
const visibility = useDocumentVisibility();

const active = computed(() => {
  return wanderersState.enabled && !flowState.isPaused && visibility.value === 'visible';
});

const hidden = computed(() => {
  if (flowState.gameSelectionState || flowState.isPaused) return true;

  return !wanderersState.enabled;
});
</script>

<template>
  <div class="wanderers hide-mobile" v-if="!hidden">
    <WalkingSprite
      v-for="(spriteId, index) in wanderersState.wanderers"
      :key="index"
      :active="active"
      :sprite-id="spriteId"
    />
  </div>
</template>

<style scoped>
.wanderers {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}
</style>
