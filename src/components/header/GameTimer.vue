<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useState } from '@/stores/useState.ts';
import { useTimer } from '@/stores/useTimer.ts';

const { state } = useState();
const { timerState } = useTimer();
const { flowState, pauseGame } = useGameFlow();

const localElapsed = ref(0);

const elapsedTime = computed(() => {
  const total = localElapsed.value ?? 0;
  const hours = String(Math.floor(total / 3600));
  const minutes = String(Math.floor((total % 3600) / 60));
  const seconds = String(total % 60);

  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
});

const interval = ref<ReturnType<typeof setInterval> | null>(null);

let updateElapsedTime = () => {
  if (!timerState.startTime || flowState.isPaused) return;

  localElapsed.value++;
};

let startInterval = () => {
  if (!interval.value) {
    interval.value = setInterval(updateElapsedTime, 1000);
  }
};

let stopInterval = () => {
  if (interval.value) {
    clearInterval(interval.value);
    interval.value = null;
  }
};

let visibilityChangeListener = () => {
  if (document.hidden) {
    stopInterval();
  } else {
    startInterval();
  }
};

let onBlurListener = () => {
  stopInterval();
  if (state.autoPause) {
    pauseGame();
  }
};

onMounted(() => {
  startInterval();

  // Stops the interval when the tab is not active
  document.addEventListener('visibilitychange', visibilityChangeListener);
  window.addEventListener('blur', onBlurListener);
  window.addEventListener('focus', startInterval);
});

onUnmounted(() => {
  stopInterval();

  document.removeEventListener('visibilitychange', visibilityChangeListener);
  window.removeEventListener('blur', onBlurListener);
  window.removeEventListener('focus', startInterval);
});
</script>

<template>
  <div class="box rad-bl-tr">
    Timer: <span class="highlight">{{ elapsedTime }}</span>
  </div>
</template>

<style scoped>
@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}

.box {
  background: var(--type-bg-color, var(--primary));
  color: var(--type-fg-color, var(--text));
  min-height: 30px;
  line-height: 30px;
  padding: 10px 18px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  gap: 8px;
}

.highlight {
  color: var(--text-inverted);
  text-shadow: 0 0 5px white;
}
</style>
