<script setup lang="ts">
defineProps<{
  mode?: 'in-out' | 'out-in';
}>();
</script>

<template>
  <Transition
    name="slide-down"
    :mode="mode"
  >
    <slot></slot>
  </Transition>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  display: grid;
  transition:
    grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.35s ease-in-out;
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  grid-template-rows: 0fr;
}

.slide-down-enter-to,
.slide-down-leave-from {
  grid-template-rows: 1fr;
}

/* Target the direct child to handle the sliding motion */
.slide-down-enter-active > *,
.slide-down-leave-active > * {
  min-height: 0;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-down-enter-from > *,
.slide-down-leave-to > * {
  transform: translateY(-100%);
}

.slide-down-enter-to > *,
.slide-down-leave-from > * {
  transform: translateY(0);
}
</style>
