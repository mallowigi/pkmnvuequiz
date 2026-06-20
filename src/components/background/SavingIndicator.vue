<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import { useFirebase } from '@/composables/useFirebase.ts';

const { firebaseState } = useFirebase();
const { t } = useI18n();
</script>

<template>
  <Transition name="saving">
    <div
      v-if="firebaseState.isSaving"
      class="saving-indicator"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
      <div class="separator" />
      <span class="text">{{ t('nowSaving') }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.saving-indicator {
  position: fixed;
  top: anchor(--watermark-url bottom, 1.5rem);
  right: 8px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text);
  opacity: 0.5;
  pointer-events: none;
  user-select: none;

  .mobile & {
    display: none;
  }
}

.icon {
  filter: drop-shadow(0 0 4px rgba(160, 196, 255, 0.5));
}

.separator {
  width: 1px;
  height: 1.5rem;
  background-color: currentColor;
  opacity: 0.3;
}

.text {
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.02em;
}

/* Transition */
.saving-enter-active,
.saving-leave-active {
  transition: opacity 0.15s ease-out;
}

.saving-enter-from,
.saving-leave-to {
  opacity: 0;
}
</style>
