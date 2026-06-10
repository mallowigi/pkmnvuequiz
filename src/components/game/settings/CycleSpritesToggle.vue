<script setup lang="ts">
import RoundedBox from '@/components/common/RoundedBox.vue';
import SegmentButton from '@/components/common/SegmentButton.vue';
import { useMessages } from '@/stores/useMessages.ts';
import { useI18n } from 'vue-i18n';
import { useSettings } from '@/stores/useSettings.ts';

const { settingsState, setCycleSprites } = useSettings();
const { showUserMessage } = useMessages();
const { t } = useI18n();

const applyCycleSprites = (value: boolean) => {
  if (settingsState.withCycleSprites === value) return;

  setCycleSprites(value);
  showUserMessage(t('cycleSpritesSet', { status: value ? t('enabled') : t('disabled') }));
};
</script>

<template>
  <RoundedBox
    v-tooltip="t('cycleSpritesTooltip')"
    v-game-ended
  >
    <SegmentButton
      :active="{
        left: settingsState.withCycleSprites,
        right: !settingsState.withCycleSprites,
      }"
      :attached="{
        right: true,
      }"
      @click:left="applyCycleSprites(true)"
      @click:right="applyCycleSprites(false)"
    >
      <template #prefix> {{ t('cycleSprites') }} </template>

      <template #left> {{ t('on') }} </template>
      <template #right> {{ t('off') }} </template>
    </SegmentButton>
  </RoundedBox>
</template>

<style scoped></style>
