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
    appear
  >
    <slot></slot>
  </TransitionGroup>
</template>

<style>
.morph-enter-active,
.morph-leave-active,
.morph-move {
  transition: all 0.3s ease-in-out;
}

.morph-enter-from,
.morph-leave-to {
  opacity: 0;
  filter: blur(8px);
}
</style>
