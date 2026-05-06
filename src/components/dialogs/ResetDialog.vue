<script setup lang="ts">
import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useState } from '@/stores/useState';

const { state, setGen, resetState, setStarted } = useState();

type Props = {
  toggleFunction: () => void;
};

const props = defineProps<Props>();

const reset = () => {
  const gen = state.gen;
  props.toggleFunction();
  resetState();
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
