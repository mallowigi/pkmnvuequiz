<script setup>
import Background from '@/components/background/Background.vue';
import Credits from '@/components/background/Credits.vue';
import GenSelection from '@/components/genSelection/GenSelection.vue';
import RoomMessageOverlay from '@/components/background/RoomMessageOverlay.vue';
import PauseOverlay from '@/components/background/PauseOverlay.vue';
import SnackBar from '@/components/background/SnackBar.vue';
import FadeTransition from '@/components/common/FadeTransition.vue';
import { useState } from '@/stores/state.js';

const { state } = useState();
</script>

<template>
  <Background />

  <FadeTransition>
    <Credits v-if='state.showCredits' />
  </FadeTransition>

  <RoomMessageOverlay v-if='state.roomMessage !== null' />

  <PauseOverlay v-if='state.isPaused' />

  <FadeTransition>
    <GenSelection v-if='state.isStarted' />
  </FadeTransition>

  <SnackBar />
</template>
