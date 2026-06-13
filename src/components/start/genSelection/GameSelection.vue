<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import Overlay from '@/components/common/Overlay.vue';
import FadeTransition from '@/components/common/transitions/FadeTransition.vue';
import GenChooser from '@/components/start/genSelection/GenChooser.vue';
import TypeChooser from '@/components/start/genSelection/TypeChooser.vue';
import Loading from '@/components/start/Loading.vue';
import StartScreen from '@/components/start/StartScreen.vue';
import { useGameFlow } from '@/stores/useGameFlow.js';
import { usePkmnData } from '@/stores/usePkmnStore.js';
import { useSettings } from '@/stores/useSettings.js';

const { t } = useI18n();

const { settingsState } = useSettings();
const { flowState, setGameSelectionState } = useGameFlow();
const { data } = usePkmnData();

const close = () => {
  if (!flowState.isStarted) {
    return;
  }
  setGameSelectionState(null);
};
</script>

<template>
  <Overlay @close="close">
    <FadeTransition>
      <div class="prompt">
        <!-- Logo -->
        <div v-if="!flowState.isStarted">
          <img
            src="../../../assets/logo.gif"
            class="titlecard"
            alt="Logo"
          />
        </div>

        <FadeTransition mode="out-in">
          <!-- Loader -->
          <Loading v-if="!data.isLoaded" />

          <!-- New Game / Continue -->
          <StartScreen v-else-if="data.isLoaded && flowState.gameSelectionState === 'new'" />

          <!-- Game selection -->
          <div v-else>
            <h3 class="title">{{ t('hello', { name: settingsState.name }) }}</h3>

            <GenChooser v-if="flowState.gameSelectionState === 'gen'" />

            <TypeChooser v-if="flowState.gameSelectionState === 'types'" />
          </div>
        </FadeTransition>
      </div>
    </FadeTransition>
  </Overlay>
</template>

<style scoped>
.titlecard {
  display: block;
  width: 100%;
  height: 100%;
  max-width: 600px;
}
</style>
