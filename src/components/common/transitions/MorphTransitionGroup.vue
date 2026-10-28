<script setup lang="ts">
withDefaults(
  defineProps<{
    tag?: string;
  }>(),
  { tag: 'div' },
);
</script>

<template>
  <TransitionGroup
    name="morph"
    :tag="tag"
  >
    <slot></slot>
  </TransitionGroup>
</template>

<style scoped>
/* Selectors are doubled on purpose: they must beat the children's own `transition` rules (e.g. hover effects). */
:slotted(.morph-enter-active.morph-enter-active),
:slotted(.morph-leave-active.morph-leave-active),
:slotted(.morph-move.morph-move) {
  transition: all 0.3s ease-in-out;
}

:slotted(.morph-enter-from.morph-enter-from),
:slotted(.morph-leave-to.morph-leave-to) {
  opacity: 0;
  filter: blur(8px);
}

:slotted(.morph-leave-active.morph-leave-active) {
  position: absolute;
}
</style>
