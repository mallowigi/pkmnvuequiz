<script setup lang="ts"></script>

<template>
  <i class="icon">
    <slot></slot>
  </i>
</template>

<style scoped>
.icon {
  &:hover :deep(svg) {
    filter: drop-shadow(0 0 2px var(--type-dark-color, var(--secondary)));
  }

  & :deep(svg) {
    cursor: pointer;
    stroke: var(--text);
  }
}
</style>
