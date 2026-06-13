<script setup lang="ts">
import { usePreferredDark } from '@vueuse/core';
import { watchEffect, watch } from 'vue';

import Background from '@/components/background/Background.vue';
import Credits from '@/components/background/Credits.vue';
import EndOverlay from '@/components/background/EndOverlay.vue';
import PauseOverlay from '@/components/background/PauseOverlay.vue';
import RoomMessageOverlay from '@/components/background/RoomMessageOverlay.vue';
import SnackBar from '@/components/background/SnackBar.vue';
import Tooltip from '@/components/background/Tooltip.vue';
import FadeTransition from '@/components/common/transitions/FadeTransition.vue';
import Dialogs from '@/components/dialogs/Dialogs.vue';
import GameFooter from '@/components/footer/GameFooter.vue';
import Game from '@/components/game/Game.vue';
import GameHeader from '@/components/header/GameHeader.vue';
import GameSelection from '@/components/start/genSelection/GameSelection.vue';
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

const isDark = usePreferredDark();

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

    <Tooltip />
  </main>
</template>

<style></style>

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
