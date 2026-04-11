<script setup>

import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useState } from '@/stores/state.js';
import IconButton from '@/components/common/IconButton.vue';

const { setPaused } = useState();
</script>

<template>
  <Overlay class='full-overlay'>
    <div class='prompt'>
      <h2 class='left-margin'>Paused</h2>

      <RoundedButton :text='"Resume"'
                     :primary='true'
                     @click='setPaused(false)'>

      </RoundedButton>

      <div class='top-margin'>
        <p class='left-margin'>Save/Load Quiz State:</p>

        <IconButton>
          <img src='@/assets/download.png' alt='Download'>
        </IconButton>

        <IconButton>
          <img src='@/assets/upload.png' alt='Upload'>
        </IconButton>
      </div>
    </div>
  </Overlay>
</template>

<style scoped>
.full-overlay {
  z-index: 10;
  --overlay-bg: var(--full-black);
}

.left-margin {
  margin-left: 10px;
}

.top-margin {
  margin-top: 20px;
}

</style>