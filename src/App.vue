<script setup>
import Background from '@/components/background/Background.vue';
import Credits from '@/components/background/Credits.vue';
import RoomMessageOverlay from '@/components/background/RoomMessageOverlay.vue';
import PauseOverlay from '@/components/background/PauseOverlay.vue';
import SnackBar from '@/components/background/SnackBar.vue';
import FadeTransition from '@/components/common/FadeTransition.vue';
import { useState } from '@/stores/state.js';
import TypeSelection from '@/components/genSelection/TypeSelection.vue';
import { useRoomMessages } from '@/stores/roomMessages.js';
import Dialogs from '@/components/dialogs/Dialogs.vue';
import EndOverlay from '@/components/background/EndOverlay.vue';
import GameStart from '@/components/genSelection/GameStart.vue';
import GameHeader from '@/components/header/GameHeader.vue';
import { onMounted, onUnmounted } from 'vue';

const { state, setDarkMode } = useState();
const { roomState } = useRoomMessages();

onMounted(() => {
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  // 1. Initial sync (handles BOTH true and false)
  setDarkMode(darkModeMediaQuery.matches);

  // 2. Define the listener function
  const handleDarkModeChange = (e) => {
    setDarkMode(e.matches);
  };

  // 3. Attach listener with compatibility fallback
  darkModeMediaQuery.addEventListener('change', handleDarkModeChange);

  // 4. Clean up to prevent memory leaks or duplicate listeners
  onUnmounted(() => {
    darkModeMediaQuery.removeEventListener('change', handleDarkModeChange);
  });
});

</script>

<template>
  <main :class='{ dark: state.isDark }'>
    <Background />

    <GameHeader />

    <FadeTransition>
      <Credits v-if='state.showCredits' />
    </FadeTransition>

    <RoomMessageOverlay v-if='roomState.roomMessage !== null' />

    <PauseOverlay v-if='state.isPaused' />

    <FadeTransition>
      <GameStart v-if='state.gameMode === null' />
    </FadeTransition>

    <FadeTransition>
      <TypeSelection v-if='state.gameMode === "types" && state.currentType === null' />
    </FadeTransition>

    <Dialogs />

    <EndOverlay v-if='state.isEnded' />

    <SnackBar />
  </main>
</template>

<style global>
:root {
  --text: #333;
  --text-inverted: #eee;
  --full-overlay: rgba(16, 17, 14, 1);
  --button: white;
  --button-hover: #666666;
  --primary: #8cc63f;
  --secondary: rgba(255, 255, 255, 0.85);
}

.dark {
  --text: #eee;
  --text-inverted: #333;
  --button: #111;
  --button-hover: #444444;
}
</style>