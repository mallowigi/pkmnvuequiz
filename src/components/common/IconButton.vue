<script setup lang="ts">
import RoundedButton from '@/components/common/RoundedButton.vue';

defineProps<{
  onClick?: () => void;
}>();
</script>

<template>
  <RoundedButton
    class="cell rad-br-tl transition-element"
    @click="onClick"
  >
    <slot />
  </RoundedButton>
</template>

<style scoped>
.cell {
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 10px 0 0 10px;
  cursor: pointer;
  min-height: 54px;
  line-height: 30px;
  font-size: 16px;
  min-width: 1px;
  padding: 9px 14px 2px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: var(--type-btn-color, var(--primary));
    border: 2px solid var(--type-btn-color, var(--primary));
  }

  &:hover :deep(svg) {
    filter: brightness(0) invert(1);
  }
}
</style>
