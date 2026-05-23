<script setup lang="ts">
defineProps<{
  mode?: 'in-out' | 'out-in';
}>();
</script>

<template>
  <Transition
    name="morph"
    :mode="mode"
  >
    <slot></slot>
  </Transition>
</template>

<style scoped>
.morph-enter-active,
.morph-leave-active {
  transition: all 1s ease-in-out;
}

.morph-leave-active {
  position: absolute;
}

.morph-enter-from,
.morph-leave-to {
  opacity: 0;
  filter: blur(8px);
}
</style>
