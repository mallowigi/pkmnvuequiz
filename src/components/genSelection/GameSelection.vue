<script setup lang="ts">
import FadeTransition from '@/components/common/FadeTransition.vue';
import Overlay from '@/components/common/Overlay.vue';
import GenChooser from '@/components/genSelection/GenChooser.vue';
import Loading from '@/components/genSelection/Loading.vue';
import TypeChooser from '@/components/genSelection/TypeChooser.vue';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { usePkmnData } from '@/stores/usePkmnStore.ts';
import SaveButtons from '@/components/background/SaveButtons.vue';
import { watch } from 'vue';
import { useMessages } from '@/stores/useMessages.ts';

const { flowState, setGameSelectionState } = useGameFlow();
const { data } = usePkmnData();
const { showUserMessage } = useMessages();

const close = () => {
  if (!flowState.isStarted) {
    return;
  }
  setGameSelectionState(null);
};

watch(
  () => data.isLoaded && !flowState.isStarted,
  () => {
    showUserMessage('Welcome to the Pokémon Quiz! Select a generation to begin.');
  },
);
</script>

<template>
  <Overlay @close="close">
    <FadeTransition>
      <div class="prompt">
        <!-- Logo -->
        <div
          id="logo"
          v-if="!flowState.isStarted && flowState.gameSelectionState === 'gen'"
        >
          <img
            src="@/assets/logo.gif"
            class="titlecard"
            alt="Logo"
          />
        </div>

        <FadeTransition mode="out-in">
          <!-- Loader -->
          <Loading v-if="!data.isLoaded" />

          <!-- Game selection -->
          <div v-else>
            <GenChooser v-if="flowState.gameSelectionState === 'gen'" />

            <TypeChooser v-if="flowState.gameSelectionState === 'types'" />

            <SaveButtons />
          </div>
        </FadeTransition>
      </div>
    </FadeTransition>
  </Overlay>
</template>

<style scoped>
.prompt {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  color: white;
  transform: translate(-50%, -70%);
}

.titlecard {
  display: block;
  width: 100%;
  height: 100%;
  padding-top: 30%;
  max-width: 600px;
}
</style>
