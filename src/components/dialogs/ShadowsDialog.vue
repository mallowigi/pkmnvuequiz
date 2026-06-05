<script setup lang="ts">
import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useState } from '@/stores/useState';
import { useDialogs } from '@/stores/useDialogs.ts';
import { useI18n } from 'vue-i18n';

const { displayShadows } = useState();
const { dialogs, closeDialog } = useDialogs();
const { t } = useI18n();

const enableReveal = () => {
  closeDialog();
  displayShadows();

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
      <h2>{{ t('shadowsDialog.title') }}</h2>
      <p class="desc">{{ t('shadowsDialog.description') }}</p>

      <RoundedButton
        @click.stop="enableReveal"
        primary
      >
        {{ t('reveal') }}
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
