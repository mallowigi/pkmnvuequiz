import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

import type { Message, MessageType } from '@/types.ts';

interface MessagesState {
  messages: Message[];
}

export const useMessages = defineStore('messages', () => {
  const state = reactive<MessagesState>({
    messages: [],
  });

  const showUserMessage = (message: string, type?: MessageType) => {
    state.messages.push({
      id: Date.now(),
      text: message,
      type: type ?? 'info',
    });

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
