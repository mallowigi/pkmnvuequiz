<script setup lang="ts">
import Overlay from '@/components/common/Overlay.vue';
import GenChooser from '@/components/genSelection/GenChooser.vue';
import TypeChooser from '@/components/genSelection/TypeChooser.vue';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import FadeTransition from '@/components/common/FadeTransition.vue';
import Loading from '@/components/genSelection/Loading.vue';
import { usePkmnData } from '@/stores/usePkmnStore.ts';

const { flowState, setGameSelectionState } = useGameFlow();
const { data } = usePkmnData();

const close = () => {
  setGameSelectionState(null);
};
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

        <!-- Loader -->
        <Loading v-if="!data.isLoaded" />

        <!-- Game selection -->
        <div>
          <GenChooser v-if="flowState.gameSelectionState === 'gen'" />

          <TypeChooser v-if="flowState.gameSelectionState === 'types'" />
        </div>
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
