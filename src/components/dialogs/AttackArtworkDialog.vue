<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import Overlay from '@/components/common/Overlay.vue';
import { useAttackDetails } from '@/stores/useAttackDetails.ts';
import { useDialogs } from '@/stores/useDialogs.ts';

const { attackDetailsState } = useAttackDetails();
const { closeDialog } = useDialogs();
const { t } = useI18n();
</script>

<template>
  <Overlay
    class="overlay"
    @close="closeDialog"
  >
    <div class="artwork-fullscreen">
      <img
        v-if="attackDetailsState.currentAttack?.artwork"
        :src="attackDetailsState.currentAttack.artwork"
        :alt="attackDetailsState.currentAttack.name"
        class="artwork"
      />

      <button
        class="close-btn"
        :aria-label="t('close')"
        @click.stop="closeDialog"
      >
        &times;
      </button>
    </div>
  </Overlay>
</template>

<style scoped>
.overlay {
  z-index: 9;
}

.artwork-fullscreen {
  position: relative;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
}

.artwork {
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 20px;
  filter: drop-shadow(0 5px 20px rgba(0, 0, 0, 0.4));
}

.close-btn {
  position: absolute;
  top: -1rem;
  right: -1rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: none;
  background: var(--button);
  color: var(--text);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
