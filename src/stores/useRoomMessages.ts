import { reactive, readonly } from 'vue';

interface RoomMessagesState {
  roomMessage: string | null;
}

const roomState: RoomMessagesState = reactive({
  roomMessage: null,
});

const setRoomMessage = (message: string | null) => {
  roomState.roomMessage = message;
};

export const useRoomMessages = () => {
  return {
    roomState: readonly(roomState),
    setRoomMessage,
  };
};
