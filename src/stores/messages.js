import { reactive, readonly } from 'vue';

const state = reactive({
  messages: [],
});

export const showUserMessage = (message) => {
  state.messages.push(message);

  setTimeout(() => {
    state.messages.shift();
  }, 50000);
};

export const clearMessages = () => {
  state.messages = [];
};

export const useMessages = () => {
  return {
    state: readonly(state),
    showUserMessage,
    clearMessages,
  };
};