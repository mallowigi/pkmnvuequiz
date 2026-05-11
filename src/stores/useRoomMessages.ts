import { reactive } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';

interface RoomMessagesState {
  roomMessage: string | null;
}

export const useRoomMessages = defineStore('roomMessages', () => {
  const roomState = reactive<RoomMessagesState>({
    roomMessage: null,
  });

  const setRoomMessage = (message: string | null) => {
    roomState.roomMessage = message;
  };

  return {
    roomState,
    setRoomMessage,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRoomMessages, import.meta.hot));
}
