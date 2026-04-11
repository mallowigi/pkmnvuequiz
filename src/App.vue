<script setup>
import Background from '@/components/background/Background.vue';
import Credits from '@/components/background/Credits.vue';
import { useState } from '@/stores/state.js';
import EndedOverlay from '@/components/background/EndedOverlay.vue';
import GenSelection from '@/components/genSelection/GenSelection.vue';

const { state } = useState();
</script>

<template>
  <Background />
  <Credits v-if='state.showCredits' />
  <EndedOverlay v-if='state.isEnded' />
  <GenSelection v-if='state.isStarted' />
</template>

