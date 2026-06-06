<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useDialogs } from '@/stores/useDialogs.ts';
import { useState } from '@/stores/useState';
import type { Mode } from '@/types.ts';

const { setMode } = useState();
const { dialogs, closeDialog } = useDialogs();
const { t } = useI18n();

type Props = {
  caption: string;
  mode: Mode;
};

const props = defineProps<Props>();

const enableMode = () => {
  closeDialog();
  setMode(props.mode);

  if (dialogs.callback) {
    dialogs.callback();
  }
};

const disableMode = () => {
  closeDialog();
};
</script>

<template>
  <Overlay
    class="overlay"
    @close="disableMode"
  >
    <div class="prompt">
      <h2>{{ props.caption }}</h2>
      <p class="desc">{{ t('resetWarning') }}</p>

      <RoundedButton
        @click="enableMode"
        primary
      >
        {{ t('enable') }}
      </RoundedButton>

      <RoundedButton
        @click.stop="disableMode"
        primary
      >
        {{ t('cancel') }}
      </RoundedButton>
    </div>
  </Overlay>
</template>

<style scoped></style>
