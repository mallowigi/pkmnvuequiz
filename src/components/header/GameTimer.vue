<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useTimer } from '@/stores/useTimer.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';

const { timerState } = useTimer();
const { flowState } = useGameFlow();

const localElapsed = ref(0);

const elapsedTime = computed(() => {
  const total = localElapsed.value ?? 0;
  const hours = String(Math.floor(total / 3600));
  const minutes = String(Math.floor((total % 3600) / 60));
  const seconds = String(total % 60);

  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
});

const interval = ref<ReturnType<typeof setInterval> | null>(null);

onMounted(() => {
  interval.value = setInterval(() => {
    if (!timerState.startTime || flowState.isPaused) return;

    localElapsed.value++;
  }, 1000);
});

onUnmounted(() => {
  if (interval.value) {
    clearInterval(interval.value);
  }
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
  background: var(--type-bg-color);
  color: white;
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
