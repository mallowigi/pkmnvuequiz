<script setup lang="ts">
import RoundedBox from '@/components/common/RoundedBox.vue';
import SegmentButton from '@/components/common/SegmentButton.vue';
import { useMessages } from '@/stores/useMessages.ts';
import { useI18n } from 'vue-i18n';
import { useSettings } from '@/stores/useSettings.ts';

const { settingsState, setAutoPause } = useSettings();
const { showUserMessage } = useMessages();
const { t } = useI18n();

const applyAutoPause = (value: boolean) => {
  if (settingsState.autoPause === value) return;

  setAutoPause(value);
  showUserMessage(t('autoPauseSet', { status: value ? t('enabled') : t('disabled') }));
};
</script>

<template>
  <RoundedBox
    v-game-ended
    v-tooltip="t('autoPauseTooltip')"
  >
    <SegmentButton
      :active="{
        left: settingsState.autoPause,
        right: !settingsState.autoPause,
      }"
      :attached="{
        right: true,
      }"
      @click:left="applyAutoPause(true)"
      @click:right="applyAutoPause(false)"
    >
      <template #prefix> {{ t('autoPause') }} </template>

      <template #left> {{ t('on') }} </template>
      <template #right> {{ t('off') }} </template>
    </SegmentButton>
  </RoundedBox>
</template>

<style scoped></style>
