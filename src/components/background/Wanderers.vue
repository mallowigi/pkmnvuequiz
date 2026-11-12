<script setup lang="ts">
import { onMounted, useTemplateRef, watch } from 'vue';

import WalkingSprite from '@/components/background/WalkingSprite.vue';
import { useWanderingSprite } from '@/composables/useWanderingSprite.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useWanderers } from '@/stores/useWanderers.ts';

const { wanderersState } = useWanderers();
const { wanderingState, startWandering, stopWandering } = useWanderingSprite({ margin: 40 });
const { flowState } = useGameFlow();

const wandererRef = useTemplateRef('wandererRef');

// Start wandering sprites when the component is mounted
onMounted(() => {
  startWandering();
});

watch(
  () => flowState.isPaused,
  (newVal) => {
    if (newVal) {
      // Pause wandering sprites when the game is paused
      stopWandering();
      wanderingState.position = {
        ...wanderingState.position,
        ...wandererRef.value?.getBoundingClientRect(),
      };
      wanderingState.legDuration = 0;
    } else {
      // Resume wandering sprites when the game is unpaused
      startWandering();
    }
  },
);
</script>

<template>
  <div
    class="wanderers"
    v-if="wanderersState.enabled"
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
