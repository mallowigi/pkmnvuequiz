<script setup>
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useDialogs } from '@/stores/useDialogs.js';

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
      class="rad-br-tl"
      @click="giveUp()"
    >
      Give Up
    </RoundedButton>

    <RoundedButton
      class="rad-br-tl"
      @click="resetGame()"
    >
      Reset
    </RoundedButton>
  </div>
</template>

<style scoped>
.row {
  line-height: 30px;
}
</style>
