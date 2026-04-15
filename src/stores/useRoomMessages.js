import { reactive, readonly } from 'vue';

const roomState = reactive({
  roomMessage: null,
});

export const setRoomMessage = (message) => {
  roomState.roomMessage = message;
};

export const useRoomMessages = () => {
  return {
    roomState: readonly(roomState),
    setRoomMessage,
  };
};