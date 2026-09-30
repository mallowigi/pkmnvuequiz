<script setup lang="ts">
import { useScroll } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import ArrowIcon from '@/components/common/icons/ArrowIcon.vue';
import { useDialogs } from '@/stores/useDialogs.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';

const props = defineProps<{
  scrollContainer?: HTMLElement | null;
}>();

const { y } = useScroll(() => props.scrollContainer ?? window);
const gameFlowStore = useGameFlow();
const { isInGame } = storeToRefs(gameFlowStore);
const { dialogs } = useDialogs();

const scrollToTop = () => {
  const target = props.scrollContainer ?? window;
  if (y.value > 100) {
    target.scrollTo({ top: 0 });
  } else {
    target.scrollTo({ top: props.scrollContainer?.scrollHeight ?? document.body.scrollHeight });
  }
};

const isDisabled = computed(() => {
  return !isInGame.value || dialogs.dialog !== null;
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
