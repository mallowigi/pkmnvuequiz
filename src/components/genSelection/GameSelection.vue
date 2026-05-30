<script setup lang="ts">
import Overlay from '@/components/common/Overlay.vue';
import FadeTransition from '@/components/common/transitions/FadeTransition.vue';
import GenChooser from '@/components/genSelection/GenChooser.vue';
import Loading from '@/components/genSelection/Loading.vue';
import NewGameButtons from '@/components/genSelection/NewGameButtons.vue';
import TypeChooser from '@/components/genSelection/TypeChooser.vue';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { usePkmnData } from '@/stores/usePkmnStore.ts';
import { useState } from '@/stores/useState.ts';

const { state } = useState();
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
            src="@/assets/logo.gif"
            class="titlecard"
            alt="Logo"
          />
        </div>

        <FadeTransition mode="out-in">
          <!-- Loader -->
          <Loading v-if="!data.isLoaded" />

          <!-- New Game / Continue -->
          <NewGameButtons v-else-if="data.isLoaded && flowState.gameSelectionState === 'new'" />

          <!-- Game selection -->
          <div v-else>
            <h3 class="title">Hello, {{ state.name }}</h3>

            <GenChooser v-if="flowState.gameSelectionState === 'gen'" />

            <TypeChooser v-if="flowState.gameSelectionState === 'types'" />
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
