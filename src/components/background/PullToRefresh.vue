<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import ArrowIcon from '@/components/common/icons/ArrowIcon.vue';
import { useAppBreakpoints } from '@/composables/useAppBreakpoints.ts';

// Distance (px) the user must pull down before releasing triggers a refresh.
const PULL_THRESHOLD = 70;
// Hard cap on how far the indicator is allowed to travel, for a resistance feel.
const MAX_PULL = 110;

const { isMobile } = useAppBreakpoints();
const { t } = useI18n();

const pullDistance = ref(0);
const isReleasable = ref(false);
const isRefreshing = ref(false);

let startY = 0;
let isTracking = false;

const getScrollTop = () => document.scrollingElement?.scrollTop ?? window.scrollY;

const onTouchStart = (event: TouchEvent) => {
  if (!isMobile.value || isRefreshing.value || getScrollTop() > 0) return;

  isTracking = true;
  startY = event.touches[0].clientY;
};

const onTouchMove = (event: TouchEvent) => {
  if (!isTracking || isRefreshing.value) return;

  const delta = event.touches[0].clientY - startY;
  if (delta <= 0) {
    pullDistance.value = 0;
    isReleasable.value = false;
    return;
  }

  // Progressively resist the pull so it doesn't feel like a 1:1 drag.
  pullDistance.value = Math.min(MAX_PULL, delta / 1.8);
  isReleasable.value = pullDistance.value >= PULL_THRESHOLD;

  // Prevent the page (and any native browser pull-to-refresh) from scrolling/bouncing
  // while our own gesture is in control.
  event.preventDefault();
};

const onTouchEnd = () => {
  if (!isTracking) return;
  isTracking = false;

  if (isReleasable.value) {
    isRefreshing.value = true;
    pullDistance.value = PULL_THRESHOLD;
    window.location.reload();
    return;
  }

  pullDistance.value = 0;
};

onMounted(() => {
  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: false });
  window.addEventListener('touchend', onTouchEnd, { passive: true });
  window.addEventListener('touchcancel', onTouchEnd, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('touchstart', onTouchStart);
  window.removeEventListener('touchmove', onTouchMove);
  window.removeEventListener('touchend', onTouchEnd);
  window.removeEventListener('touchcancel', onTouchEnd);
});
</script>

<template>
  <div
    v-if="isMobile"
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
