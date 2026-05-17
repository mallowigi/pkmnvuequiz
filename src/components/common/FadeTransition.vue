<script setup lang="ts">
defineProps<{
  mode?: 'in-out' | 'out-in';
}>();
</script>

<template>
  <Transition
    appear
    :mode="mode"
  >
    <slot></slot>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.5s linear;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
