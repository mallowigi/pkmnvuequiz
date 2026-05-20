<script setup lang="ts">
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useDialogs } from '@/stores/useDialogs.js';
import { useGameFlow } from '@/stores/useGameFlow.ts';

const { setDialog } = useDialogs();
const { flowState } = useGameFlow();

const giveUp = () => {
  setDialog('giveup');
};

const resetGame = () => {
  setDialog('reset');
};
</script>

<template>
  <div class="row">
    <RoundedButton
      class="rad-br-tl danger-btn"
      @click="giveUp"
      :class="{ disabled: flowState.isGivenUp || flowState.isEnded }"
    >
      Give Up
    </RoundedButton>

    <RoundedButton
      class="rad-br-tl danger-btn"
      @click="resetGame"
    >
      Reset
    </RoundedButton>
  </div>
</template>

<style scoped>
.danger-btn:hover {
  background-color: var(--danger);
  border-color: var(--danger);
}
</style>
