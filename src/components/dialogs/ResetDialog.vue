<script setup lang="ts">
import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useState } from '@/stores/useState';

const { state, setGen, resetState, setStarted } = useState();

const props = defineProps({
  toggleFunction: {
    required: true,
    type: Function,
  },
});

const reset = (e: Event) => {
  const gen = state.gen;
  e.stopPropagation();
  props.toggleFunction();
  resetState();
  setGen(gen);
  setStarted(true);
};

const cancel = (e: Event) => {
  e.stopPropagation();
  props.toggleFunction();
};
</script>

<template>
  <Overlay
    class="overlay"
    @click="props.toggleFunction()"
  >
    <div class="prompt">
      <h2>Reset?</h2>
      <p class="desc">Are you sure you want to reset?</p>

      <RoundedButton
        @click="reset"
        primary
      >
        Reset
      </RoundedButton>

      <RoundedButton
        @click="cancel"
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
