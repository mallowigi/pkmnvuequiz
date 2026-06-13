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
  inset: 0;
  display: block;
  width: 100dvw;
  min-height: 100dvh;
  background-color: var(--overlay-bg, rgba(16, 17, 14, 0.8));
  z-index: 4;
  overflow-y: auto;
  overscroll-behavior: contain;
}

:deep .prompt {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  text-align: center;
  color: white;
  width: min(100% - 32px, 480px);
}
</style>
