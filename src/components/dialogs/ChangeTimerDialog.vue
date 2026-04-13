<script setup>

import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { setStartTime, useState } from '@/stores/state.js';

const { setEndTime } = useState();

const props = defineProps({
  timer: {
    type: Number,
    required: true,
  },
  toggleFunction: {
    type: Function,
    required: true,
  },
});

const switchTimer = (e) => {
  e.stopPropagation();
  props.toggleFunction();
  setStartTime();
  setEndTime(props.timer);
};

const cancel = (e) => {
  e.stopPropagation();
  props.toggleFunction();
};

</script>

<template>
  <Overlay class='overlay' @click='props.toggleFunction()'>
    <div class='prompt'>
      <h2>Change timer?</h2>
      <p class='desc'>Quiz and timer will reset</p>

      <RoundedButton @click='switchTimer'>
        Switch
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