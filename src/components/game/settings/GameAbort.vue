<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import RoundedButton from '@/components/common/RoundedButton.vue';
import { useDialogs } from '@/stores/useDialogs.js';

const { setDialog } = useDialogs();
const { t } = useI18n();

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
      v-game-ended
    >
      {{ t('giveUp') }}
    </RoundedButton>

    <RoundedButton
      class="rad-br-tl danger-btn"
      @click="resetGame"
    >
      {{ t('reset') }}
    </RoundedButton>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  justify-content: space-between;

  .mobile & {
    justify-content: center;
    align-self: center;
  }
}
</style>
