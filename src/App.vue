<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

import Background from '@/components/background/Background.vue';
import Credits from '@/components/background/Credits.vue';
import EndOverlay from '@/components/background/EndOverlay.vue';
import PauseOverlay from '@/components/background/PauseOverlay.vue';
import RoomMessageOverlay from '@/components/background/RoomMessageOverlay.vue';
import SnackBar from '@/components/background/SnackBar.vue';
import FadeTransition from '@/components/common/FadeTransition.vue';
import Dialogs from '@/components/dialogs/Dialogs.vue';
import GameFooter from '@/components/footer/GameFooter.vue';
import GameStart from '@/components/genSelection/GameStart.vue';
import TypeSelection from '@/components/genSelection/TypeSelection.vue';
import GameHeader from '@/components/header/GameHeader.vue';
import { useCredits } from '@/stores/useCredits';
import { useRoomMessages } from '@/stores/useRoomMessages';
import { useState } from '@/stores/useState';
import Game from '@/components/game/Game.vue';
import { useTypeStyles } from '@/composables/useTypeStyles';

const { state, setDarkMode } = useState();
const { credits } = useCredits();
const { roomState } = useRoomMessages();
const typeStyles = useTypeStyles();

onMounted(() => {
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  // 1. Initial sync (handles BOTH true and false)
  setDarkMode(darkModeMediaQuery.matches);

  // 2. Define the listener function
  const handleDarkModeChange = (e: MediaQueryListEvent) => {
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
  <main
    class="main"
    :class="{ dark: state.isDark }"
    :style="typeStyles"
  >
    <Background />

    <GameHeader />

    <Game class="game" />

    <GameFooter />

    <FadeTransition>
      <Credits v-if="credits.showCredits" />
    </FadeTransition>

    <RoomMessageOverlay v-if="roomState.roomMessage !== null" />

    <PauseOverlay v-if="state.isPaused" />

    <FadeTransition>
      <GameStart v-if="state.gameMode === null" />
    </FadeTransition>

    <FadeTransition>
      <TypeSelection v-if="state.gameMode === 'types' && state.currentType === null" />
    </FadeTransition>

    <Dialogs />

    <EndOverlay v-if="state.isEnded" />

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
  --darkPrimary: #65ae04;
  --danger: #d00;
  --secondary: rgba(255, 255, 255, 0.85);
  --input: #eee;
  --input-text: #333;
}

.dark {
  --text: #eee;
  --text-inverted: #333;
  --button: #111;
  --button-hover: #444444;
}
</style>

<style scoped>
.main {
  min-height: 100vh;
  max-width: 1600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
