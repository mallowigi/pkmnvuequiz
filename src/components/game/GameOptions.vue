<script setup lang="ts">
import RoundedButton from '@/components/common/RoundedButton.vue';
import GameModeSelection from '@/components/game/GameModeSelection.vue';
import { useDialogs } from '@/stores/useDialogs';

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
      @click="giveUp()"
    >
      Give Up
    </RoundedButton>

    <RoundedButton
      class="rad-br-tl danger-btn"
      @click="resetGame()"
    >
      Reset
    </RoundedButton>
  </div>

  <GameModeSelection />
</template>

<style scoped>
.row {
  line-height: 30px;
}

.danger-btn:hover {
  background-color: var(--danger);
  border-color: var(--danger);
}
</style>
