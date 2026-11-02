<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useDialogs } from '@/stores/useDialogs.ts';

const { closeDialog } = useDialogs();
const { t } = useI18n();
</script>

<template>
  <Overlay
    class="overlay"
    @close="closeDialog"
  >
    <div class="prompt achievements-dialog">
      <h2 class="dialog-title">{{ t('achievements') }}</h2>

      <div class="dialog-content">
        <!-- Achievements grid will go here -->
      </div>

      <RoundedButton
        @click.stop="closeDialog"
        primary
      >
        {{ t('close') }}
      </RoundedButton>
    </div>
  </Overlay>
</template>

<style scoped>
.achievements-dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 800px;
  width: 95%;
}

.dialog-title {
  margin: 0;
  color: white;
  font-size: 22px;
}

.dialog-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: 70vh;
  overflow-y: auto;
  gap: 16px;
  padding-right: 4px;
}
</style>
