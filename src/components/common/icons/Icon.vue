<script setup lang="ts"></script>

<template>
  <i class="icon">
    <slot></slot>
  </i>
</template>

<style scoped>
.icon {
  &:hover :deep(svg) {
    filter: drop-shadow(0 0 2px var(--type-dark-color, var(--secondary)))
      drop-shadow(0 0 4px var(--type-dark-color, var(--secondary)))
      drop-shadow(0 0 10px var(--type-dark-color, var(--secondary)))
      drop-shadow(0 0 30px var(--type-dark-color, var(--secondary)));
  }

  & :deep(svg) {
    cursor: pointer;
    stroke: var(--text);
    will-change: filter;
    transition: filter 0.1s ease-in-out;
  }
}
</style>
