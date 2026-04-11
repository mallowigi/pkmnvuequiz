<script setup>
import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useState } from '@/stores/state.js';

const { setPause } = useState();

</script>

<template>
  <Overlay class='full-overlay'>
    <div class='prompt'>
      <h2 id='return-message'></h2>
      <RoundedButton :text='"Exit"' @click='setPause(false)' />
    </div>
  </Overlay>
</template>

<style scoped>
.full-overlay {
  background-color: var(--full-black);
}

.prompt {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  text-align: center;
  color: white;
}

</style>