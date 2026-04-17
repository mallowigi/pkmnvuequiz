<script setup>
import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useState } from '@/stores/useState.js';

const { setEnded } = useState();

const props = defineProps({
  toggleFunction: {
    required: true,
    type: Function,
  },
});

const giveUp = (e) => {
  e.stopPropagation();
  props.toggleFunction();
  setEnded(true);
  // TODO show all missing shadows
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
      <h2>Give Up?</h2>
      <p class="desc">Are you sure you want to give up?</p>

      <RoundedButton
        @click="giveUp"
        primary
      >
        Give Up
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
