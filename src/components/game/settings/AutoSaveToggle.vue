<script setup lang="ts">
import { useAuth } from '@vueuse/firebase';
import { useI18n } from 'vue-i18n';

import CloudShareIcon from '@/components/common/icons/CloudShareIcon.vue';
import CloudUpIcon from '@/components/common/icons/CloudUpIcon.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useFirebase } from '@/composables/useFirebase.ts';
import { useMessages } from '@/stores/useMessages.ts';
import { useRooms } from '@/stores/useRooms.ts';
import { useSettings } from '@/stores/useSettings.ts';

const { settingsState, setSaveToCloud } = useSettings();
const { showUserMessage } = useMessages();
const { t } = useI18n();
const { auth } = useFirebase();
const { isAuthenticated } = useAuth(auth);
const { roomState } = useRooms();

const toggleAutoSave = () => {
  const newValue = !settingsState.autoSync;
  setSaveToCloud(newValue);
  showUserMessage(t('autoSaveSet', { status: newValue ? t('enabled') : t('disabled') }));
};
</script>

<template>
  <RoundedButton
    class="auto-save-toggle rad-br-tl"
    :selected="settingsState.autoSync"
    v-game-ended
    v-if="isAuthenticated && !roomState.isActive"
    v-tooltip:top="t('autoSaveTooltip')"
    @click="toggleAutoSave"
  >
    <CloudShareIcon />
  </RoundedButton>
</template>

<style scoped>
.auto-save-toggle {
  padding: 9px 14px 8px;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  & img {
    margin: -5px;
    width: 52px;
    height: 39px;
    object-fit: none;
    object-position: 50% 100%;
    filter: brightness(0) invert(0.7);
  }

  &.selected {
    & img {
      filter: brightness(0) invert(1);
    }
  }

  .mobile & {
    display: none;
  }
}
</style>
