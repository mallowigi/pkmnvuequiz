<script setup lang="ts">
import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useDialogs } from '@/stores/useDialogs.ts';

const { dialogs } = useDialogs();

type Props = {
  toggleFunction: () => void;
};

const props = defineProps<Props>();

const switchQuiz = () => {
  props.toggleFunction();

  if (dialogs.callback) {
    dialogs.callback();
  }
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
