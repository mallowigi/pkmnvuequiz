<script setup lang="ts">
import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useDialogs } from '@/stores/useDialogs.ts';

const { dialogs } = useDialogs();

interface Props {
  toggleFunction: () => void;
}

const props = defineProps<Props>();

const switchQuiz = (e: Event) => {
  e.stopPropagation();
  props.toggleFunction();

  if (dialogs.callback) {
    dialogs.callback();
  }
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
      <h2>Switch Quiz?</h2>
      <p class="desc">Quiz and timer will reset</p>

      <RoundedButton
        @click="switchQuiz"
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
