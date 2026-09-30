<script setup lang="ts">
import { useMediaQuery, usePreferredDark } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { watchEffect, watch, computed, useTemplateRef } from 'vue';

import AttackDetailsPane from '@/components/attackdex/attackInfo/AttackDetailsPane.vue';
import Background from '@/components/background/Background.vue';
import Credits from '@/components/background/Credits.vue';
import EndOverlay from '@/components/background/EndOverlay.vue';
import Help from '@/components/background/Help.vue';
import PauseOverlay from '@/components/background/PauseOverlay.vue';
import PullToRefresh from '@/components/background/PullToRefresh.vue';
import RoomMessageOverlay from '@/components/background/RoomMessageOverlay.vue';
import SavingIndicator from '@/components/background/SavingIndicator.vue';
import SnackBar from '@/components/background/SnackBar.vue';
import Tooltip from '@/components/background/Tooltip.vue';
import FadeTransition from '@/components/common/transitions/FadeTransition.vue';
import Dialogs from '@/components/dialogs/Dialogs.vue';
import GameFooter from '@/components/footer/GameFooter.vue';
import Game from '@/components/game/Game.vue';
import PokemonDetailsPane from '@/components/game/pokemonInfo/PokemonDetailsPane.vue';
import GameHeader from '@/components/header/GameHeader.vue';
import MobileControls from '@/components/navigation/MobileControls.vue';
import GameSelection from '@/components/start/genSelection/GameSelection.vue';
import { useAppBreakpoints } from '@/composables/useAppBreakpoints.ts';
import { TYPE_STYLE_KEYS, useTypeStyles } from '@/composables/useTypeStyles';
import OfflineBanner from '@/OfflineBanner.vue';
import ReloadPrompt from '@/ReloadPrompt.vue';
import ScrollTop from '@/ScrollTop.vue';
import { useCredits } from '@/stores/useCredits';
import { useGameFlow } from '@/stores/useGameFlow';
import { useHelp } from '@/stores/useHelp.ts';
import { useRooms } from '@/stores/useRooms.ts';
import { useState } from '@/stores/useState';

const { state, setDarkMode } = useState();
const { flowState } = useGameFlow();
const { isInGame } = storeToRefs(useGameFlow());
const { credits } = useCredits();
const { roomState } = useRooms();
const typeStyles = useTypeStyles();
const { helpState } = useHelp();

const { isMobile, isLaptop, isDesktop } = useAppBreakpoints();
const isTouchLayout = useMediaQuery('(hover: none) and (pointer: coarse)');
const gameContent = useTemplateRef<HTMLElement>('gameContent');
const scrollContainer = computed(() => (isTouchLayout.value ? gameContent.value : null));

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

const hasPullToRefresh = computed(() => isTouchLayout.value && isInGame.value && !flowState.gameSelectionState);

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
    :class="{
      dark: state.isDark,
      mobile: isMobile,
      laptop: isLaptop,
      desktop: isDesktop,
      missingno: flowState.missingno,
      'touch-layout': isTouchLayout,
    }"
    :style="typeStyles"
  >
    <!-- Offline Banner-->
    <OfflineBanner />

    <!-- Pull to Refresh (mobile) -->
    <PullToRefresh
      v-if="hasPullToRefresh"
      :scroll-container="scrollContainer"
    />

    <!-- New Release Reload Prompt-->
    <ReloadPrompt />

    <!-- Background images -->
    <Background />

    <!-- Header -->
    <GameHeader />

    <div
      ref="gameContent"
      class="game-content"
    >
      <Game />
      <GameFooter />
    </div>

    <!-- Credits-->
    <FadeTransition>
      <Credits v-if="credits.showCredits" />
    </FadeTransition>

    <!-- Help-->
    <FadeTransition>
      <Help v-if="helpState.showHelp" />
    </FadeTransition>

    <!-- Room messages -->
    <RoomMessageOverlay v-if="roomState.isActive" />

    <!-- Pause -->
    <FadeTransition>
      <PauseOverlay v-if="flowState.isPaused" />
    </FadeTransition>

    <!-- Game Selection -->
    <FadeTransition>
      <GameSelection v-if="flowState.gameSelectionState" />
    </FadeTransition>

    <!-- Dialogs container -->
    <Dialogs />

    <!-- Ended Game -->
    <EndOverlay v-if="flowState.isEnded" />

    <!-- Notifications -->
    <SnackBar />

    <!-- Saving Indicator -->
    <SavingIndicator />

    <!-- Tooltips -->
    <Tooltip />

    <!-- Scroll Top -->
    <ScrollTop :scroll-container="scrollContainer" />

    <!-- Details Pane -->
    <PokemonDetailsPane />

    <!-- Attack Details -->
    <AttackDetailsPane />

    <!-- Mobile Controls -->
    <MobileControls v-if="isMobile" />
  </main>
</template>

<style scoped>
.main {
  min-height: 100dvh;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &.mobile {
    padding-bottom: 80px;
  }
}

.game-content {
  display: contents;
}

.main.touch-layout {
  height: 100dvh;
  min-height: 0;
  padding-bottom: 0;
  overflow: clip;

  > .header {
    flex-shrink: 0;
  }

  .game-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior-y: contain;
    scroll-behavior: smooth;
  }

  &.mobile .game-content {
    padding-bottom: 80px;
  }
}
</style>
