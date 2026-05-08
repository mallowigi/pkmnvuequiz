<script setup lang="ts">
import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useGameFlow } from '@/stores/useGameFlow';
import { usePokemons } from '@/stores/usePokemons';
import { useState } from '@/stores/useState';
import { useTimer } from '@/stores/useTimer';

const { resetFlowState, setStarted } = useGameFlow();
const { resetPokemonState } = usePokemons();
const { state, setGen, resetState } = useState();
const { resetTimer } = useTimer();

type Props = {
  toggleFunction: () => void;
};

const props = defineProps<Props>();

const reset = () => {
  const gen = state.gen;
  props.toggleFunction();
  resetState();
  resetPokemonState();
  resetTimer();
  resetFlowState();
  setGen(gen);
  setStarted(true);
};

const cancel = () => {
  props.toggleFunction();
};
</script>

<template>
  <Overlay
    class="overlay"
    @close="cancel"
  >
    <div class="prompt">
      <h2>Reset?</h2>
      <p class="desc">Are you sure you want to reset?</p>

      <RoundedButton
        @click.stop="reset"
        primary
      >
        Reset
      </RoundedButton>

      <RoundedButton
        @click.stop="cancel"
        primary
      >
        Cancel
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
