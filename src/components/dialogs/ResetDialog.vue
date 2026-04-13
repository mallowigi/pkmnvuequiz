<script setup>

import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useState } from '@/stores/state.js';

const { state, setGen, resetState, setStarted } = useState();

const props = defineProps({
  toggleFunction: {
    type: Function,
    required: true,
  },
});

const reset = (e) => {
  const gen = state.gen;
  e.stopPropagation();
  props.toggleFunction();
  resetState();
  setGen(gen);
  setStarted(true);
};

const cancel = (e) => {
  e.stopPropagation();
  props.toggleFunction();
};

</script>

<template>
  <Overlay class='overlay' @click='props.toggleFunction()'>
    <div class='prompt'>
      <h2>Reset?</h2>
      <p class='desc'>Are you sure you want to reset?</p>

      <RoundedButton @click='reset'>
        Reset
      </RoundedButton>

      <RoundedButton @click='cancel'>
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