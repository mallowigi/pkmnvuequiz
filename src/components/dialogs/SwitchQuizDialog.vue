<script setup lang="ts">
import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useDialogs } from '@/stores/useDialogs.ts';

const { dialogs, closeDialog } = useDialogs();

const switchQuiz = () => {
  closeDialog();

  if (dialogs.callback) {
    dialogs.callback();
  }
};

const cancel = () => {
  closeDialog();
};
</script>

<template>
  <Overlay
    class="overlay"
    @close="cancel"
  >
    <div class="prompt">
      <h2>Switch Quiz?</h2>
      <p class="desc">Quiz and timer will reset</p>

      <RoundedButton @click.stop="switchQuiz"> Switch </RoundedButton>

      <RoundedButton @click.stop="cancel"> Cancel </RoundedButton>
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
