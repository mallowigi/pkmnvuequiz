<script setup lang="ts">
import { useScroll } from '@vueuse/core';

import ArrowIcon from '@/components/common/icons/ArrowIcon.vue';
import { computed } from 'vue';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useDialogs } from '@/stores/useDialogs.ts';

const { y } = useScroll(window);
const { flowState } = useGameFlow();
const { dialogs } = useDialogs();

const scrollToTop = () => {
  if (y.value > 100) {
    window.scrollTo({ top: 0 });
  } else {
    window.scrollTo(0, document.body.scrollHeight);
  }
};

const isDisabled = computed(() => {
  return (
    !flowState.isStarted || flowState.isPaused || flowState.isEnded || flowState.isGivenUp || dialogs.dialog !== null
  );
});
</script>

<template>
  <button
    class="scroll-to-top"
    :class="{ inverted: y > 100 }"
    @click="scrollToTop"
    v-show="!isDisabled"
  >
    <ArrowIcon />
  </button>
</template>

<style scoped>
.scroll-to-top {
  position: fixed;
  background-color: var(--type-btn-color, var(--primary));
  color: white;
  display: none;
  appearance: none;
  align-items: center;
  justify-content: center;
  line-height: 1.2;
  height: 3rem;
  min-width: 3rem;
  font-size: 12px;
  bottom: 2rem;
  right: 2rem;

  border: none;
  border-radius: 999px;
  cursor: pointer;
  z-index: 5;
  opacity: 0.7;
  transform: rotate(180deg);
  transition:
    opacity 0.3s ease,
    transform 0.7s ease;

  &:hover {
    opacity: 1;
  }

  &.inverted {
    transform: rotate(0deg);
    transform-origin: center;
  }

  .laptop & {
    display: inline-flex;
  }
}
</style>
