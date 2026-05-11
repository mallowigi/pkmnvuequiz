import { reactive } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';

interface MessagesState {
  messages: string[];
}

export const useMessages = defineStore('messages', () => {
  const state = reactive<MessagesState>({
    messages: [],
  });

  const showUserMessage = (message: string) => {
    state.messages.push(message);

    setTimeout(() => {
      state.messages.shift();
    }, 5000);
  };

  const clearMessages = () => {
    state.messages = [];
  };

  return {
    clearMessages,
    showUserMessage,
    state,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMessages, import.meta.hot));
}
