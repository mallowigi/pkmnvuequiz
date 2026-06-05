<script setup lang="ts">
import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useCurrentGen } from '@/stores/useCurrentGen';
import { useDialogs } from '@/stores/useDialogs.ts';
import { useGameFlow } from '@/stores/useGameFlow';
import { usePokemons } from '@/stores/usePokemons';
import { useState } from '@/stores/useState';
import { useTimer } from '@/stores/useTimer';
import { useI18n } from 'vue-i18n';

const { resetFlowState, startGame } = useGameFlow();
const { resetPokemonState } = usePokemons();
const { resetState } = useState();
const { setCurrentGen, currentGenState } = useCurrentGen();
const { resetTimer } = useTimer();
const { dialogs, closeDialog } = useDialogs();
const { t } = useI18n();

const reset = () => {
  const gen = currentGenState.gen;
  closeDialog();
  // resetState();
  resetPokemonState();
  resetTimer();
  resetFlowState();
  // setCurrentGen(gen);
  startGame();

  if (dialogs.callback) {
    dialogs.callback();
  }
};

const cancel = () => {
  closeDialog();
};
</script>

<template>
  <Overlay
    class="overlay"
    @close="cancel"
  >
    <div class="prompt">
      <h2>{{ t('resetDialog.title') }}</h2>
      <p class="desc">{{ t('resetDialog.description') }}</p>

      <RoundedButton
        @click.stop="reset"
        primary
      >
        {{ t('reset') }}
      </RoundedButton>

      <RoundedButton
        @click.stop="cancel"
        primary
      >
        {{ t('cancel') }}
      </RoundedButton>
    </div>
  </Overlay>
</template>

<style scoped>
.overlay {
  z-index: 4;
}

.desc {
  margin-bottom: 10px;
}
</style>
