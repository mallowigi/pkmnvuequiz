<script setup lang="ts">
import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useState } from '@/stores/useState';

const { toggleShadows } = useState();

type Props = {
  toggleFunction: () => void;
};

const props = defineProps<Props>();

const enableReveal = () => {
  props.toggleFunction();
  toggleShadows();
};

const cancel = () => {
  props.toggleFunction();
};
</script>

<template>
  <Overlay
    class="overlay"
    @click.stop="props.toggleFunction()"
  >
    <div class="prompt">
      <h2>Reveal Shadows?</h2>
      <p class="desc">Cannot be undone without reset</p>

      <RoundedButton
        @click.stop="enableReveal"
        primary
      >
        Reveal
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
