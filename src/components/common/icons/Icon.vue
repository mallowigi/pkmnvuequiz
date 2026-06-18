<script setup lang='ts'>
</script>

<template>
  <i class="icon">
    <slot></slot>
  </i>
</template>

<style scoped>
.icon {
  display: flex;
  color: var(--text);

  &:hover :deep(svg) {
    filter: drop-shadow(0 0 2px var(--type-dark-color, var(--secondary)))
      drop-shadow(0 0 4px var(--type-dark-color, var(--secondary)))
      drop-shadow(0 0 10px var(--type-dark-color, var(--secondary)))
      drop-shadow(0 0 30px var(--type-dark-color, var(--secondary)));
  }

  & :deep(svg) {
    cursor: pointer;
    stroke: currentColor;
    will-change: filter;
    transition: filter 0.3s ease-in-out;
  }

  &.accent-icon :deep(svg) {
    color: var(--type-btn-color, var(--primary));
    stroke: var(--type-btn-color, var(--primary));
  }

  &.accent-icon:hover :deep(svg) {
    filter: brightness(0) invert(1);
  }
}
</style>
