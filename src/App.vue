<script setup>
import BackgroundSwitcher from '@/components/background/Background.vue';
import Credits from '@/components/background/Credits.vue';
import RoomMessageOverlay from '@/components/background/RoomMessageOverlay.vue';
import PauseOverlay from '@/components/background/PauseOverlay.vue';
import SnackBar from '@/components/background/SnackBar.vue';
import FadeTransition from '@/components/common/FadeTransition.vue';
import { useState } from '@/stores/state.js';
import TypeSelection from '@/components/typeSelection/TypeSelection.vue';
import { useRoomMessages } from '@/stores/roomMessages.js';
import Dialogs from '@/components/dialogs/Dialogs.vue';
import { onMounted } from 'vue';
import EndOverlay from '@/components/background/EndOverlay.vue';
import GameStart from '@/components/genSelection/GameStart.vue';

const { state, setEnded } = useState();
const { roomState } = useRoomMessages();

onMounted(() => {
  setEnded(true);
});

</script>

<template>
  <BackgroundSwitcher />

  <FadeTransition>
    <Credits v-if='state.showCredits' />
  </FadeTransition>

  <RoomMessageOverlay v-if='roomState.roomMessage !== null' />

  <PauseOverlay v-if='state.isPaused' />

  <FadeTransition>
    <GameStart v-if='state.gen === null' />
  </FadeTransition>

  <FadeTransition>
    <TypeSelection v-if='state.gen === "types"' />
  </FadeTransition>

  <Dialogs />

  <EndOverlay v-if='state.isEnded' />

  <SnackBar />
</template>
