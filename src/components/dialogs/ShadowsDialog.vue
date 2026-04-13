<script setup>

import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useState } from '@/stores/state.js';

const { toggleShadows } = useState();

const props = defineProps({
  toggleFunction: {
    type: Function,
    required: true,
  },
});

const enableReveal = (e) => {
  e.stopPropagation();
  props.toggleFunction();
  toggleShadows();
};

const cancel = (e) => {
  e.stopPropagation();
  props.toggleFunction();
};

</script>

<template>
  <Overlay class='overlay' @click='props.toggleFunction()'>
    <div class='prompt'>
      <h2>Reveal Shadows?</h2>
      <p class='desc'>Cannot be undone without reset</p>

      <RoundedButton @click='enableReveal' primary>
        Reveal
      </RoundedButton>

      <RoundedButton @click='cancel' primary>
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