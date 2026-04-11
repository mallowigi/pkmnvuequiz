<script setup>
import Background from '@/components/background/Background.vue';
import Credits from '@/components/background/Credits.vue';
import { useState } from '@/stores/state.js';
import GenSelection from '@/components/genSelection/GenSelection.vue';
import RoomMessageOverlay from '@/components/background/RoomMessageOverlay.vue';
import PauseOverlay from '@/components/background/PauseOverlay.vue';

const { state } = useState();
</script>

<template>
  <Background />
  <Credits v-if='state.showCredits' />
  <RoomMessageOverlay v-if='state.roomMessage !== null' />
  <PauseOverlay v-if='state.isPaused' />
  <GenSelection v-if='state.isStarted' />
</template>

