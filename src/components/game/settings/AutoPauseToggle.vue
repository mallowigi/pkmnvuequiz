<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import EyePauseIcon from '@/components/common/icons/EyePauseIcon.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useMessages } from '@/stores/useMessages.ts';
import { useSettings } from '@/stores/useSettings.ts';

const { settingsState, toggleAutoPause } = useSettings();
const { showUserMessage } = useMessages();
const { t } = useI18n();

const toggleAutoPauseValue = () => {
  const newValue = !settingsState.autoPause;
  toggleAutoPause(newValue);
  showUserMessage(t('autoPauseSet', { status: newValue ? t('enabled') : t('disabled') }));
};
</script>

<template>
  <RoundedButton
    class="auto-pause-toggle rad-br-tl"
    :selected="settingsState.autoPause"
    v-game-ended
    v-tooltip:top="t('autoPauseTooltip')"
    @click="toggleAutoPauseValue"
  >
    <EyePauseIcon />
  </RoundedButton>
</template>

<style scoped>
.auto-pause-toggle {
  min-width: 0;
  padding: 9px 14px 8px;
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
