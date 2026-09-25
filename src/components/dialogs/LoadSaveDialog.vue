<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useSavedData } from '@/composables/useSavedData.ts';
import { useSaveSlots } from '@/composables/useSaveSlots.ts';
import { useAlerts } from '@/stores/useAlerts.ts';
import { useDialogs } from '@/stores/useDialogs.ts';
import type { CloudSaveSlot } from '@/types.ts';
import { formatElapsedTime } from '@/utils/utils.ts';

const { closeDialog } = useDialogs();
const { showAlert } = useAlerts();
const { listCloudSaves, loadFromFirebase, hasActiveLocalGame } = useSavedData();
const { getRelativeTimeParts } = useSaveSlots();
const { t } = useI18n();

const isLoading = ref(true);
const slots = ref<CloudSaveSlot[]>([]);

onMounted(async () => {
  slots.value = await listCloudSaves();
  isLoading.value = false;
});

const formatSavedAt = (updatedAt: number) => {
  const parts = getRelativeTimeParts(updatedAt);
  switch (parts.unit) {
    case 'justNow':
      return t('justNow');
    case 'date':
      return parts.date.toLocaleDateString();
    default:
      return t(parts.unit, { count: parts.count });
  }
};

const performLoad = async (sessionId: string) => {
  closeDialog();
  await loadFromFirebase(sessionId);
};

const selectSlot = (slot: CloudSaveSlot) => {
  if (!slot.isCurrent && hasActiveLocalGame()) {
    closeDialog();
    showAlert({
      description: t('loadSaveDialog.confirmOverwriteDescription'),
      onConfirm: () => performLoad(slot.sessionId),
      title: t('loadSaveDialog.confirmOverwriteTitle'),
    });
    return;
  }

  void performLoad(slot.sessionId);
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
    <div class="prompt load-save-dialog">
      <h2 class="dialog-title">{{ t('loadSaveDialog.title') }}</h2>

      <div class="dialog-content">
        <button
          v-for="slot in slots"
          :key="slot.sessionId"
          class="save-row"
          type="button"
          @click.stop="selectSlot(slot)"
        >
          <span class="save-row-top">
            <span class="save-summary">{{ slot.summary }}</span>
            <span
              v-if="slot.isCurrent"
              class="save-current"
            >
              ({{ t('loadSaveDialog.current') }})
            </span>
          </span>

          <span class="save-row-bottom">
            <span>{{ t('score') }}: {{ slot.score }}</span>
            <span>{{ formatElapsedTime(slot.elapsed) }}</span>
            <span>{{ formatSavedAt(slot.updatedAt) }}</span>
          </span>
        </button>
      </div>

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
.load-save-dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 480px;
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
  width: 100%;
  max-height: 60vh;
  overflow-y: auto;
  gap: 8px;
  padding-right: 4px;
}

.save-row {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  gap: 4px;
  padding: 10px 12px;
  border: 2px solid var(--type-btn-color);
  border-radius: 8px;
  background: var(--button);
  color: var(--text);
  cursor: pointer;
  text-align: left;
  font: inherit;
}

.save-row-top {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px;
  font-weight: bold;
  word-break: break-word;
}

.save-current {
  font-weight: normal;
  opacity: 0.8;
}

.save-row-bottom {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 12px;
  font-size: 0.85em;
  opacity: 0.85;
}
</style>
