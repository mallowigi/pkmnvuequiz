<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useTimer } from '@/stores/useTimer.ts';

const { timerState } = useTimer();
const gameFlowStore = useGameFlow();
const { isInGame } = storeToRefs(gameFlowStore);

const remainingSeconds = computed(() => {
  if (!timerState.isLimited) return 0;
  return timerState.minutes! * 60 - (timerState.elapsed ?? 0);
});

const showCountdown = computed(() => {
  if (!timerState.isLimited) return false;

  if (!isInGame.value) {
    return false;
  }

  // Show countdown at specific intervals to create a sense of urgency without overwhelming the player
  const intervals = [300, 180, 120, 60, 30, 10, 5, 4, 3, 2, 1];
  return intervals.includes(remainingSeconds.value);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="countdown">
      <div
        v-if="showCountdown"
        :key="remainingSeconds"
        class="countdown-overlay"
      >
        {{ remainingSeconds }}
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.countdown-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50vh;
  font-weight: bold;
  color: var(--type-bg-color, var(--primary));
  pointer-events: none;
  z-index: 1000;
  opacity: 0;
}

.countdown-enter-active {
  animation: countdown-in 1s ease-out;
}

@keyframes countdown-in {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  20% {
    opacity: 0.5;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>
