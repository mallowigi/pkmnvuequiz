<script setup lang="ts">
import RoundedBox from '@/components/common/RoundedBox.vue';
import SegmentButton from '@/components/common/SegmentButton.vue';
import { useMessages } from '@/stores/useMessages.ts';
import { useState } from '@/stores/useState.ts';
import { useI18n } from 'vue-i18n';

const { state, setCycleSprites } = useState();
const { showUserMessage } = useMessages();
const { t } = useI18n();

const applyCycleSprites = (value: boolean) => {
  if (state.withCycleSprites === value) return;

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
        left: state.withCycleSprites,
        right: !state.withCycleSprites,
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
