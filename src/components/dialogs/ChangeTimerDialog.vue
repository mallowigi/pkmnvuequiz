<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useDialogs } from '@/stores/useDialogs.ts';

const { dialogs, closeDialog } = useDialogs();
const { t } = useI18n();

const switchTimer = () => {
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
      <h2>{{ t('changeTimerDialog.title') }}</h2>
      <p class="desc">{{ t('resetWarning') }}</p>

      <RoundedButton
        @click.stop="switchTimer"
        primary
      >
        {{ t('switch') }}
      </RoundedButton>

      <RoundedButton
        @click.stop="cancel"
        primary
      >
        {{ t('cancel') }}
      </RoundedButton>
    </div>
  </Overlay>
</template>

<style scoped></style>
