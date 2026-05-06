<script setup lang="ts">
import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useState } from '@/stores/useState';
import type { Mode } from '@/types.ts';

const { setMode } = useState();

type Props = {
  caption: string;
  mode: Mode;
  toggleFunction: () => void;
};

const props = defineProps<Props>();

const enableMode = () => {
  props.toggleFunction();
  setMode(props.mode);
};

const disableMode = () => {
  props.toggleFunction();
};
</script>

<template>
  <Overlay
    class="overlay"
    @close="disableMode"
  >
    <div class="prompt">
      <h2>{{ props.caption }}</h2>
      <p class="desc">Quiz and timer will reset</p>

      <RoundedButton
        @click="enableMode"
        primary
      >
        Enable
      </RoundedButton>

      <RoundedButton
        @click.stop="disableMode"
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
