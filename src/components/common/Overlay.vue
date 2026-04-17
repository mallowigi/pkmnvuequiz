<script setup></script>

<template>
  <div :class="['overlay', $attrs.class]">
    <slot />
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--overlay-bg, rgba(16, 17, 14, 0.8));
  z-index: 4;
}
</style>
