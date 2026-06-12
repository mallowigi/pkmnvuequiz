<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  preventClosing?: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const close = () => {
  if (!props.preventClosing) {
    emit('close');
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    close();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <div
    :class="['overlay', $attrs.class]"
    @click.self="close"
  >
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
