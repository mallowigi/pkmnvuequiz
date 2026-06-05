<script setup lang="ts">
import { computed } from 'vue';

import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import Leaderboards from '@/components/genSelection/Leaderboards.vue';
import { useCurrentGen } from '@/stores/useCurrentGen.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { useDialogs } from '@/stores/useDialogs.ts';
import { useState } from '@/stores/useState.ts';
import { capitalize } from '@/utils/utils.ts';

import { useI18n } from 'vue-i18n';

const { closeDialog } = useDialogs();
const { state } = useState();
const { getCurrentType } = useCurrentType();
const { getCurrentGen } = useCurrentGen();
const { t } = useI18n();

const currentGameMode = computed(() => {
  switch (state.gameMode) {
    case 'gen':
      return `${capitalize(t((getCurrentGen()?.name ?? '').toLowerCase()))} ${t('quiz')}`;
    case 'types':
      return `${capitalize(t((getCurrentType()?.name ?? '').toLowerCase()))} ${t('quiz')}`;
    case 'special':
      return t('specialQuiz');
    default:
      return t('fullQuiz');
  }
});

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
      <h2>{{ t('leaderboardsDialog.title', { mode: currentGameMode }) }}</h2>

      <Leaderboards />

      <RoundedButton
        @click.stop="cancel"
        primary
      >
        {{ t('close') }}
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
