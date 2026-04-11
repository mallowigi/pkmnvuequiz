<script setup>
import { useMessages } from '@/stores/messages.js';
import { onMounted } from 'vue';

const { state, showUserMessage } = useMessages();

onMounted(() => {
  showUserMessage('Welcome to the Pokémon Quiz! Click the "Start" button to begin.');
});
</script>

<template>
  <div class='snackbar-container'>
    <TransitionGroup name='fade'>
      <div v-for='message in state.messages'
           class='snackbar rad-br-tl'
           :key='message'>
        {{ message }}
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
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

</style>