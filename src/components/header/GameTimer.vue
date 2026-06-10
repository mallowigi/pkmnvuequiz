<script setup lang="ts">
import { useDocumentVisibility, useWindowFocus, useInterval } from '@vueuse/core';
import { computed, watch } from 'vue';

import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useTimer } from '@/stores/useTimer.ts';
import { useI18n } from 'vue-i18n';
import { useSettings } from '@/stores/useSettings.ts';

const { settingsState } = useSettings();
const { timerState, incElapsed } = useTimer();
const { flowState, pauseGame } = useGameFlow();
const { t } = useI18n();

const { pause, resume } = useInterval(1000, {
  callback: () => {
    if (!timerState.startTime || flowState.isPaused || flowState.isGivenUp || flowState.isEnded) return;

    incElapsed();
  },
  controls: true,
});

const elapsedTime = computed(() => {
  if (!timerState.startTime) return '- - : - - : - -';

  const total = timerState.elapsed ?? 0;
  const hours = String(Math.floor(total / 3600));
  const minutes = String(Math.floor((total % 3600) / 60));
  const seconds = String(total % 60);

  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
});

const visibility = useDocumentVisibility();
const windowFocus = useWindowFocus();

// Stops the interval when the tab is not active
watch(visibility, (current) => {
  if (!settingsState.autoPause) {
    return;
  }

  if (current === 'visible') {
    resume();
  } else {
    pause();
  }
});

watch(windowFocus, (isFocused) => {
  if (!settingsState.autoPause) {
    return;
  }

  if (isFocused) {
    resume();
  } else {
    pause();
    pauseGame();
  }
});
</script>

<template>
  <div class="box rad-bl-tr">
    {{ t('timer') }}: <span class="highlight">{{ elapsedTime }}</span>
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
  text-shadow: 0 0 5px var(--text);
}
</style>
