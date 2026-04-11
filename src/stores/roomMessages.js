import { reactive, readonly } from 'vue';

const state = reactive({
  roomMessage: null,
});

export const setRoomMessage = (message) => {
  state.roomMessage = message;
};

export const useRoomMessages = () => {
  return {
    state: readonly(state),
    setRoomMessage,
  };
};