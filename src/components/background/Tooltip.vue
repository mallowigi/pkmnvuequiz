<script setup lang="ts">
import { useTooltips } from '@/stores/useTooltips';
import { onMounted, onUnmounted } from 'vue';

const tooltipsStore = useTooltips();
const { state } = tooltipsStore;

const onScroll = () => {
  if (state.tooltip) {
    tooltipsStore.setTooltip(null);
  }
};

onMounted(() => {
  window.addEventListener('scroll', onScroll, { capture: true, passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll, { capture: true });
});
</script>

<template>
  <Transition name="tooltip">
    <div
      v-if="state.tooltip"
      class="tooltip"
      :class="state.placement"
      :style="{
        left: `${state.x}px`,
        top: `${state.y}px`,
      }"
    >
      <div class="tooltip-inner">
        {{ state.tooltip }}
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.tooltip {
  position: fixed;
  z-index: 10000;
  pointer-events: none;
  will-change: transform, opacity;
}

.tooltip-inner {
  background-color: var(--black);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.4;
  text-align: center;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 250px;
  white-space: pre-line;
  word-wrap: break-word;
}

/* Placements */
.top {
  transform: translate(-50%, calc(-100% - 10px));
}

.bottom {
  transform: translate(-50%, 10px);
}

.left {
  transform: translate(calc(-100% - 10px), -50%);
}

.right {
  transform: translate(10px, -50%);
}

/* Arrow */
.tooltip-inner::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
}

.top .tooltip-inner::before {
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px 6px 0 6px;
  border-color: var(--black) transparent transparent transparent;
}

.bottom .tooltip-inner::before {
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 6px 6px 6px;
  border-color: transparent transparent var(--black) transparent;
}

.left .tooltip-inner::before {
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  border-width: 6px 0 6px 6px;
  border-color: transparent transparent transparent var(--black);
}

.right .tooltip-inner::before {
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
  border-width: 6px 6px 6px 0;
  border-color: transparent var(--black) transparent transparent;
}

/* Transition */
.tooltip-enter-active,
.tooltip-leave-active {
  transition:
    opacity 0.15s ease-out,
    transform 0.15s ease-out;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
}

.top.tooltip-enter-from,
.top.tooltip-leave-to {
  transform: translate(-50%, calc(-100% - 5px));
}

.bottom.tooltip-enter-from,
.bottom.tooltip-leave-to {
  transform: translate(-50%, 5px);
}

.left.tooltip-enter-from,
.left.tooltip-leave-to {
  transform: translate(calc(-100% - 5px), -50%);
}

.right.tooltip-enter-from,
.right.tooltip-leave-to {
  transform: translate(5px, -50%);
}
</style>