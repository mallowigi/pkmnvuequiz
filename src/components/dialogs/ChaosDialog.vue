<script setup>

import Overlay from '@/components/common/Overlay.vue';
import { useDialogs } from '@/stores/dialogs.js';

const { toggleShowChaos } = useDialogs();

</script>

<template>
  <Overlay class='overlay' @click='toggleShowChaos()'>
    <div class='prompt'>
      <h2>Enable guessing without predetermined placements</h2>
      <p>Quiz and timer will reset</p>
      <br>
      <div id='chaos-enable-yes' class='button roundedb transition-element buttondark'>Enable</div>
      <div id='chaos-enable-no' class='button hovr roundedb transition-element buttondark'>Cancel</div>
    </div>
  </Overlay>
</template>

<style scoped>
.overlay {
  z-index: 4;
}
</style>