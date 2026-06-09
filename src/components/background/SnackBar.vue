<script setup lang="ts">
import { computed } from 'vue';

import { useMessages } from '@/stores/useMessages';

const { state } = useMessages();

const lastMessages = computed(() => {
  return state.messages.slice(-3);
});
</script>

<template>
  <div class="snackbar-container">
    <TransitionGroup>
      <div
        v-for="message in lastMessages"
        class="snackbar rad-br-tl"
        :class="message.type"
        :key="message.id"
      >
        {{ message.text }}
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.snackbar-container {
  position: fixed;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  flex-direction: column;
  gap: 10px;
}

.snackbar {
  background-color: rgba(51, 51, 51, 0.9);
  color: white;
  text-align: center;
  min-width: 250px;
  padding: 16px;
  opacity: 1;
  margin-bottom: 16px;

  &.error {
    background-color: rgb(117, 27, 27);
  }

  &.warning {
    background-color: rgb(129, 77, 33);
  }

  &.success {
    background-color: rgb(10, 98, 10);
  }
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
