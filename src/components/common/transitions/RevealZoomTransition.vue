<script setup lang="ts">
defineProps<{
  mode?: 'in-out' | 'out-in';
}>();
</script>

<template>
  <Transition
    name="reveal-zoom"
    :mode="mode"
  >
    <slot></slot>
  </Transition>
</template>

<style scoped>
.reveal-zoom-enter-active,
.reveal-zoom-leave-active {
  transition: all 1.5s ease;
}

.reveal-zoom-leave-active {
  position: absolute;
}

.reveal-zoom-enter-from,
.reveal-zoom-leave-to {
  transform: scale(2);
}
</style>
