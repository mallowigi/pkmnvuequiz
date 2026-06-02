<script setup lang="ts">
defineProps<{
  mode?: 'in-out' | 'out-in';
}>();
</script>

<template>
  <Transition
    name="accordion"
    :mode="mode"
  >
    <slot></slot>
  </Transition>
</template>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  display: grid;
  transition:
    grid-template-rows 0.35s cubic-bezier(0.2, 0.8, 0.2, 1),
    opacity 0.35s ease;
  overflow: hidden;
  grid-template-columns: repeat(2, auto);
}

.accordion-enter-from,
.accordion-leave-to {
  grid-template-rows: 0fr;
  opacity: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  grid-template-rows: 1fr;
  opacity: 1;
}

/* Keep slotted content from forcing height during 0fr state. */
.accordion-enter-active > *,
.accordion-leave-active > * {
  min-height: 0;
}
</style>
