<script setup lang="ts">
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useDialogs } from '@/stores/useDialogs.js';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { computed } from 'vue';

const { setDialog } = useDialogs();
const { flowState } = useGameFlow();

const giveUp = () => {
  setDialog('giveup');
};

const resetGame = () => {
  setDialog('reset');
};

const isDisabled = computed(() => flowState.isGivenUp || flowState.isEnded);
</script>

<template>
  <div class="row">
    <RoundedButton
      class="rad-br-tl danger-btn"
      @click="giveUp"
      :class="{ disabled: isDisabled }"
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
