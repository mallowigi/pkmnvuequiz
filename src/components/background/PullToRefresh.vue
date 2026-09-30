<script setup lang="ts">
import { useSwipe } from '@vueuse/core';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import ArrowIcon from '@/components/common/icons/ArrowIcon.vue';
import { useAppBreakpoints } from '@/composables/useAppBreakpoints.ts';

// Hard cap on how far the indicator is allowed to travel, for a resistance feel.
const MAX_PULL = 70;
// Distance (px) the indicator must travel before releasing triggers a refresh.
// Must stay below MAX_PULL, since pullDistance is clamped to MAX_PULL.
const PULL_THRESHOLD = 60;

const { isMobile } = useAppBreakpoints();
const { t } = useI18n();

const pullDistance = ref(0);
const isReleasable = ref(false);
const isRefreshing = ref(false);

// Whether the conditions for a pull-to-refresh gesture were met when the swipe started
// (checked once at swipe start, same as the original touchstart guard).
let isEligible = false;

const getScrollTop = () => document.scrollingElement?.scrollTop ?? window.scrollY;

// `passive: false` lets us call preventDefault() from the callbacks below, and a low
// threshold makes onSwipe fire on virtually every touchmove so we get continuous updates.
const { lengthY } = useSwipe(window, {
  onSwipe: (event) => {
    if (!isEligible || isRefreshing.value) return;

    // lengthY is coordsStart.y - coordsEnd.y, so a downward drag is negative.
    const delta = -lengthY.value;
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
  },
  onSwipeEnd: () => {
    if (!isEligible) return;

    if (isReleasable.value) {
      isRefreshing.value = true;
      pullDistance.value = MAX_PULL;
      window.location.reload();
      return;
    }

    pullDistance.value = 0;
  },
  onSwipeStart: (event) => {
    // Ignore multi-touch (e.g. pinch) gestures so they can't be misread as a pull-down.
    isEligible = isMobile.value && !isRefreshing.value && getScrollTop() === 0 && event.touches.length === 1;
  },
  passive: false,
  threshold: 1,
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
