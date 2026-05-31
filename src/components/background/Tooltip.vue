<script setup lang="ts">
import { useTooltips } from '@/stores/useTooltips';
import FadeTransition from '@/components/common/transitions/FadeTransition.vue';

const { state } = useTooltips();
</script>

<template>
  <FadeTransition>
    <div
      class="tooltip"
      v-if="state.tooltip"
      :style="{
        left: `${state.x}px`,
        top: `${state.y}px`,
      }"
    >
      {{ state.tooltip }}
    </div>
  </FadeTransition>
</template>

<style scoped>
.tooltip {
  position: fixed;
  transform: translateX(-50%) translateY(0);
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  z-index: 9999;
  pointer-events: none;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  will-change: opacity, transform;
}
</style>
