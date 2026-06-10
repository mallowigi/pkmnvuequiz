<script setup lang="ts">
import RoundedBox from '@/components/common/RoundedBox.vue';
import SegmentButton from '@/components/common/SegmentButton.vue';
import { useMessages } from '@/stores/useMessages.ts';
import { useI18n } from 'vue-i18n';
import { useSettings } from '@/stores/useSettings.ts';

const { settingsState, setSound } = useSettings();
const { showUserMessage } = useMessages();
const { t } = useI18n();

const applySound = (value: boolean) => {
  if (settingsState.withSound === value) return;

  setSound(value);
  showUserMessage(t('soundSet', { status: value ? t('enabled') : t('disabled') }));
};
</script>

<template>
  <RoundedBox
    v-game-ended
    v-tooltip="t('soundTooltip')"
  >
    <SegmentButton
      :active="{
        left: settingsState.withSound,
        right: !settingsState.withSound,
      }"
      :attached="{
        right: true,
      }"
      @click:left="applySound(true)"
      @click:right="applySound(false)"
    >
      <template #prefix> {{ t('sound') }}: </template>

      <template #left> {{ t('on') }} </template>
      <template #right> {{ t('off') }} </template>
    </SegmentButton>
  </RoundedBox>
</template>

<style scoped></style>
