<script setup lang="ts">
import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useState } from '@/stores/useState';

const { setEndTime, setStartTime } = useState();

type Props = {
  timer: number;
  toggleFunction: () => void;
};

const props = defineProps<Props>();

const switchTimer = () => {
  props.toggleFunction();
  setStartTime();
  setEndTime(props.timer);
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
      <h2>Change timer?</h2>
      <p class="desc">Quiz and timer will reset</p>

      <RoundedButton
        @click.stop="switchTimer"
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
