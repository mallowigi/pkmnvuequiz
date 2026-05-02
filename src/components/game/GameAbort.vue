<script setup lang="ts">
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useDialogs } from '@/stores/useDialogs.ts';

const { setDialog } = useDialogs();

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
