import { reactive, readonly } from 'vue';

interface MessagesState {
  messages: string[];
}

const state: MessagesState = reactive({
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

export const useMessages = () => {
  return {
    clearMessages,
    showUserMessage,
    state: readonly(state),
  };
};
