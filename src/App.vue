<script setup>
import BackgroundSwitcher from '@/components/background/Background.vue';
import Credits from '@/components/background/Credits.vue';
import GenSelection from '@/components/genSelection/GenSelection.vue';
import RoomMessageOverlay from '@/components/background/RoomMessageOverlay.vue';
import PauseOverlay from '@/components/background/PauseOverlay.vue';
import SnackBar from '@/components/background/SnackBar.vue';
import FadeTransition from '@/components/common/FadeTransition.vue';
import { useState } from '@/stores/state.js';
import TypeSelection from '@/components/typeSelection/TypeSelection.vue';
import { useRoomMessages } from '@/stores/roomMessages.js';
import { onMounted } from 'vue';

const { state, setGen } = useState();
const { state: roomMessages } = useRoomMessages();

onMounted(() => {
  setGen('types');
});

</script>

<template>
  <BackgroundSwitcher />

  <FadeTransition>
    <Credits v-if='state.showCredits' />
  </FadeTransition>

  <RoomMessageOverlay v-if='roomMessages.roomMessage !== null' />

  <PauseOverlay v-if='state.isPaused' />

  <FadeTransition>
    <GenSelection v-if='state.gen === null' />
  </FadeTransition>

  <FadeTransition>
    <TypeSelection v-if='state.gen === "types"' />
  </FadeTransition>

  <SnackBar />
</template>
