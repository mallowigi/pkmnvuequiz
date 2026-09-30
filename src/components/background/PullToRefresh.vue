<script setup lang="ts">
import { useSwipe } from '@vueuse/core';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import ArrowIcon from '@/components/common/icons/ArrowIcon.vue';

// Finger travel required to refresh is independent of the indicator's travel cap.
const PULL_THRESHOLD = 250;
const MAX_PULL = 70;

const props = defineProps<{
  scrollContainer?: HTMLElement | null;
}>();

const { t } = useI18n();

const swipeDistance = ref(0);
const isRefreshing = ref(false);

const isReleasable = computed(() => swipeDistance.value >= PULL_THRESHOLD);

const pullDistance = computed(() => {
  return isRefreshing.value ? MAX_PULL : Math.min(MAX_PULL, (swipeDistance.value / PULL_THRESHOLD) * MAX_PULL);
});

let isEligible = false;

const getScrollTop = () => props.scrollContainer?.scrollTop ?? document.scrollingElement?.scrollTop ?? window.scrollY;

const { lengthY, direction } = useSwipe(() => props.scrollContainer ?? window, {
  onSwipe: (event) => {
    if (!isEligible || isRefreshing.value) return;

    // VueUse reports downward travel as a negative lengthY.
    swipeDistance.value = direction.value === 'down' ? Math.max(0, -lengthY.value) : 0;

    if (swipeDistance.value > 0) event.preventDefault();
  },
  onSwipeEnd: (event) => {
    if (!isEligible) return;
    isEligible = false;

    if (event.type === 'touchend' && isReleasable.value) {
      isRefreshing.value = true;
      window.location.reload();
      return;
    }

    swipeDistance.value = 0;
  },
  onSwipeStart: () => {
    isEligible = !isRefreshing.value && getScrollTop() === 0;
    swipeDistance.value = 0;
  },
  passive: false,
  threshold: 1,
});
</script>

<template>
  <div
    class="pull-to-refresh"
    :class="{ visible: pullDistance > 0 }"
    :style="{ transform: `translateY(${pullDistance - MAX_PULL}px)` }"
  >
    <ArrowIcon
      class="arrow accent-icon"
      :class="{ spinning: isRefreshing }"
      :style="{ transform: `rotate(${isReleasable ? 0 : 180}deg)` }"
    />

    <span>{{ isRefreshing ? t('refreshing') : isReleasable ? t('releaseToRefresh') : t('pullToRefresh') }}</span>
  </div>
</template>

<style scoped>
.pull-to-refresh {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  height: 110px;
  padding-bottom: 10px;
  color: var(--text);
  background: var(--button);
  opacity: 0;
  transition: opacity 0.15s linear;

  &.visible {
    opacity: 0.95;
  }
}

.arrow {
  transition: transform 0.2s ease-in-out;
}

.spinning {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
