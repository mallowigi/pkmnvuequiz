<script setup lang="ts">
import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useState } from '@/stores/useState';

const { toggleShadows } = useState();

const props = defineProps({
  toggleFunction: {
    required: true,
    type: Function,
  },
});

const enableReveal = (e: Event) => {
  e.stopPropagation();
  props.toggleFunction();
  toggleShadows();
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
      <h2>Reveal Shadows?</h2>
      <p class="desc">Cannot be undone without reset</p>

      <RoundedButton
        @click="enableReveal"
        primary
      >
        Reveal
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
