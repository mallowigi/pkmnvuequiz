<script setup>
import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useState } from '@/stores/useState.js';

const { setGen } = useState();

const props = defineProps({
  gen: {
    required: true,
    type: String,
  },
  toggleFunction: {
    required: true,
    type: Function,
  },
});

const switchQuiz = (e) => {
  e.stopPropagation();
  props.toggleFunction();
  setGen(props.gen);
};

const cancel = (e) => {
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
      <h2>Switch Quiz?</h2>
      <p class="desc">Quiz and timer will reset</p>

      <RoundedButton
        @click="switchQuiz"
        primary
      >
        Switch
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
