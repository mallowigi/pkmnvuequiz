<script setup>

import Overlay from '@/components/common/Overlay.vue';
import { useDialogs } from '@/stores/dialogs.js';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useState } from '@/stores/state.js';

const { toggleShowChaos } = useDialogs();
const { state, setMode } = useState();

const enableChaosMode = (e) => {
  e.stopPropagation();
  toggleShowChaos();
  setMode('chaos');
};

const disableChaosMode = (e) => {
  e.stopPropagation();
  toggleShowChaos();
  setMode('normal');
};

</script>

<template>
  <Overlay class='overlay' @click='toggleShowChaos()'>
    <div class='prompt'>
      <h2>Enable guessing without predetermined placements</h2>
      <p class='desc'>Quiz and timer will reset</p>

      <RoundedButton @click='enableChaosMode'>
        Enable
      </RoundedButton>

      <RoundedButton @click='disableChaosMode'>
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