<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import RoundedBox from '@/components/common/RoundedBox.vue';
import SegmentButton from '@/components/common/SegmentButton.vue';
import { useMessages } from '@/stores/useMessages.ts';
import { useSettings } from '@/stores/useSettings.ts';

const { settingsState, toggleShadowHelper } = useSettings();
const { showUserMessage } = useMessages();
const { t } = useI18n();

const toggle = () => {
  toggleShadowHelper();
  showUserMessage(t('shadowHelperSet', { status: settingsState.withShadowHelper ? t('enabled') : t('disabled') }));
};
</script>

<template>
  <RoundedBox
    class="hotkey-toggle"
    v-tooltip="t('shadowHotkeyTooltip', { key: ',' })"
    v-game-ended
  >
    <SegmentButton
      :active="{
        left: settingsState.withShadowHelper,
      }"
      @click:left="toggle"
    >
      <template #prefix>{{ t('shadowHelperToggle') }}</template>
      <template #left>&nbsp;,&nbsp;</template>
      <template #suffix> {{ t('shadowHelperToggleSuffix') }}</template>
    </SegmentButton>
  </RoundedBox>
</template>

<style scoped>
.hotkey-toggle {
  .mobile & {
    display: none;
  }
}
</style>
