<script setup lang="ts">
import { useDocumentVisibility } from '@vueuse/core';
import { computed, onMounted, useTemplateRef, watch } from 'vue';

import WalkingSprite from '@/components/background/WalkingSprite.vue';
import { useWanderingSprite } from '@/composables/useWanderingSprite.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useWanderers } from '@/stores/useWanderers.ts';

const { wanderersState } = useWanderers();
const { wanderingState, startWandering, resumeWandering, stopWandering } = useWanderingSprite({ margin: 40 });
const { flowState } = useGameFlow();
const visibility = useDocumentVisibility();

const wandererRef = useTemplateRef<HTMLElement>('wandererRef');

// Wanderers only walk when enabled, the game is running and the tab is visible
const active = computed(() => {
  return wanderersState.enabled && !flowState.isPaused && visibility.value === 'visible';
});

let started = false;

// Stop mid-leg: freeze the sprite where it currently is instead of at the end of its leg
const freeze = () => {
  const rect = wandererRef.value?.getBoundingClientRect();
  if (rect) {
    wanderingState.position = { x: rect.x, y: rect.y };
    wanderingState.legDuration = 0;
  }
  stopWandering();
};

const hidden = computed(() => {
  if (flowState.gameSelectionState || flowState.isPaused) return true;

  // if (visibility.value !== 'visible') return true;

  return !wanderersState.enabled;
});

onMounted(() => {
  if (active.value) {
    startWandering();
    started = true;
  }
});

watch(active, (isActive) => {
  if (!isActive) {
    freeze();
  } else if (started) {
    resumeWandering();
  } else {
    startWandering();
    started = true;
  }
});
</script>

<template>
  <div
    class="wanderers"
    v-if="!hidden"
  >
    <div
      ref="wandererRef"
      :style="{
        transform: `translate(${wanderingState.position.x}px, ${wanderingState.position.y}px)`,
        transition: `transform ${wanderingState.legDuration}ms linear`,
      }"
    >
      <WalkingSprite
        :direction="wanderingState.direction"
        :sprite-id="1"
        :moving="wanderingState.isMoving"
      />
    </div>
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
