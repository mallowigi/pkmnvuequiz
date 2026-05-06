<script setup lang="ts">
import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useState } from '@/stores/useState';

const { setEnded } = useState();

type Props = {
  toggleFunction: () => void;
};

const props = defineProps<Props>();

const giveUp = () => {
  props.toggleFunction();
  setEnded(true);
  // TODO show all missing shadows
};

const cancel = () => {
  props.toggleFunction();
};
</script>

<template>
  <Overlay
    class="overlay"
    @click.stop="props.toggleFunction()"
    @keydown.esc="props.toggleFunction()"
  >
    <div class="prompt">
      <h2>Give Up?</h2>
      <p class="desc">Are you sure you want to give up?</p>

      <RoundedButton
        @click.stop="giveUp"
        primary
      >
        Give Up
      </RoundedButton>

      <RoundedButton
        @click.stop="cancel"
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
