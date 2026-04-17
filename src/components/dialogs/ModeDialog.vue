<script setup>
import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useState } from '@/stores/useState.js';

const { setMode } = useState();

const props = defineProps({
  caption: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  toggleFunction: {
    type: Function,
    required: true,
  },
});

const enableMode = (e) => {
  e.stopPropagation();
  props.toggleFunction();
  setMode(props.mode);
};

const disableMode = (e) => {
  e.stopPropagation();
  props.toggleFunction();
};
</script>

<template>
  <Overlay class="overlay" @click="props.toggleFunction()">
    <div class="prompt">
      <h2>{{ props.caption }}</h2>
      <p class="desc">Quiz and timer will reset</p>

      <RoundedButton @click="enableMode" primary> Enable </RoundedButton>

      <RoundedButton @click="disableMode" primary> Cancel </RoundedButton>
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
