<script setup lang="ts">
import { useDark } from '@vueuse/core';
import { watchEffect, watch } from 'vue';

import Background from '@/components/background/Background.vue';
import Credits from '@/components/background/Credits.vue';
import EndOverlay from '@/components/background/EndOverlay.vue';
import PauseOverlay from '@/components/background/PauseOverlay.vue';
import RoomMessageOverlay from '@/components/background/RoomMessageOverlay.vue';
import SnackBar from '@/components/background/SnackBar.vue';
import FadeTransition from '@/components/common/FadeTransition.vue';
import Dialogs from '@/components/dialogs/Dialogs.vue';
import GameFooter from '@/components/footer/GameFooter.vue';
import Game from '@/components/game/Game.vue';
import GameSelection from '@/components/genSelection/GameSelection.vue';
import GameHeader from '@/components/header/GameHeader.vue';
import { TYPE_STYLE_KEYS, useTypeStyles } from '@/composables/useTypeStyles';
import { useCredits } from '@/stores/useCredits';
import { useGameFlow } from '@/stores/useGameFlow';
import { useRoomMessages } from '@/stores/useRoomMessages';
import { useState } from '@/stores/useState';

const { state, setDarkMode } = useState();
const { flowState } = useGameFlow();
const { credits } = useCredits();
const { roomState } = useRoomMessages();
const typeStyles = useTypeStyles();

watchEffect(() => {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  const styles = typeStyles.value;

  TYPE_STYLE_KEYS.forEach((key) => {
    const value = styles[key];

    if (value) {
      root.style.setProperty(key, value);
      return;
    }

    root.style.removeProperty(key);
  });
});

const isDark = useDark();

watch(
  isDark,
  () => {
    setDarkMode(isDark.value);
  },
  { immediate: true },
);
</script>

<template>
  <main
    class="main"
    :class="{ dark: state.isDark }"
    :style="typeStyles"
  >
    <Background />

    <GameHeader />

    <Game />

    <GameFooter />

    <FadeTransition>
      <Credits v-if="credits.showCredits" />
    </FadeTransition>

    <RoomMessageOverlay v-if="roomState.roomMessage !== null" />

    <FadeTransition>
      <PauseOverlay v-if="flowState.isPaused" />
    </FadeTransition>

    <FadeTransition>
      <GameSelection v-if="flowState.gameSelectionState" />
    </FadeTransition>

    <Dialogs />

    <EndOverlay v-if="flowState.isEnded" />

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

  --type-btn-color: var(--primary);
  --type-dark-color: var(--darkPrimary);
  --type-inline-color: inherit;
  --type-fg-color: var(--text);

  --max-width: 66%;
  --num-cols: 5;
  --sprite-width: 64px;
  --text-padding: 10px;

  --glow: #333;
  --animate-duration: 0.5s;
  --animate-delay: 0;
  --animate-repeat: 1;
}

.dark {
  --text: #fff;
  --text-inverted: #333;
  --button: #111;
  --button-hover: #444444;

  --type-btn-color: var(--primary);
  --type-dark-color: var(--darkPrimary);
  --type-inline-color: inherit;
  --type-fg-color: var(--text);

  --glow: black;
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
