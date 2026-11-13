<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import PawIcon from '@/components/common/icons/PawIcon.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useMessages } from '@/stores/useMessages.ts';
import { useSettings } from '@/stores/useSettings.ts';

const { settingsState, setWanderers } = useSettings();
const { showUserMessage } = useMessages();
const { t } = useI18n();

const toggleWanderers = () => {
  const newValue = !settingsState.withWanderers;
  setWanderers(newValue);
  showUserMessage(t('wanderersSet', { status: newValue ? t('enabled') : t('disabled') }));
};
</script>

<template>
  <RoundedButton
    class="wanderers-toggle rad-br-tl"
    :selected="settingsState.withWanderers"
    v-game-ended
    v-tooltip:top="t('wanderersTooltip')"
    @click="toggleWanderers"
  >
    <PawIcon />
  </RoundedButton>
</template>

<style scoped>
.wanderers-toggle {
  min-width: 0;
  padding: 9px 14px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  .mobile & {
    display: none;
  }
}
</style>
