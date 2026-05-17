<script setup lang="ts">
import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useGameFlow } from '@/stores/useGameFlow';
import { useDialogs } from '@/stores/useDialogs.ts';
import { usePokemons } from '@/stores/usePokemons.ts';

const { giveUp } = useGameFlow();
const { dialogs } = useDialogs();
const { showRemaining } = usePokemons();

type Props = {
  toggleFunction: () => void;
};

const props = defineProps<Props>();

const promptGiveUp = () => {
  props.toggleFunction();
  giveUp();
  showRemaining();

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
    @close="cancel"
  >
    <div class="prompt">
      <h2>Give Up?</h2>
      <p class="desc">Are you sure you want to give up?</p>

      <RoundedButton
        @click.stop="promptGiveUp"
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
