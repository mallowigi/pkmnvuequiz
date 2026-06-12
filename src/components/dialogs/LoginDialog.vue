<script setup lang="ts">
import { useAuth } from '@vueuse/firebase';
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';

import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import LoginControls from '@/components/start/LoginControls.vue';
import { useFirebase } from '@/composables/useFirebase.ts';
import { useDialogs } from '@/stores/useDialogs.ts';

const { auth } = useFirebase();
const { isAuthenticated } = useAuth(auth);
const { closeDialog } = useDialogs();

const { t } = useI18n();

const cancel = () => {
  closeDialog();
};

watch(isAuthenticated, (newVal) => {
  if (newVal) {
    closeDialog();
  }
});
</script>

<template>
  <Overlay
    class="overlay"
    @close="cancel"
  >
    <div class="prompt">
      <h2>{{ t('login') }}</h2>

      <LoginControls />

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
.large-text {
  padding: 6px;
  margin: 1em;
}

.row {
  justify-content: center;
  gap: 8px;
}
</style>
