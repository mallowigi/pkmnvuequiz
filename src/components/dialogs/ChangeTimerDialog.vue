<script setup lang="ts">
import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useDialogs } from '@/stores/useDialogs.ts';
import { useI18n } from 'vue-i18n';

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
      <p class="desc">{{ t('changeTimerDialog.description') }}</p>

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

<style scoped>
.overlay {
  z-index: 4;
}

.desc {
  margin-bottom: 10px;
}
</style>
