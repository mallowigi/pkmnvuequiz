<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import RoundedBox from '@/components/common/RoundedBox.vue';
import SegmentButton from '@/components/common/SegmentButton.vue';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useMessages } from '@/stores/useMessages.js';
import { useState } from '@/stores/useState.js';
import { useCurrentCry } from '@/stores/useCurrentCry.ts';

const { state, setCriesShuffle } = useState();
const { showUserMessage } = useMessages();
const { flowState } = useGameFlow();
const { setRandomCurrentCry, clearCurrentCry } = useCurrentCry();
const { t } = useI18n();

const applyCriesShuffle = (value: boolean) => {
  if (state.withCriesShuffle === value) return;

  if (state.mode !== 'normal') {
    showUserMessage(t('criesShuffleOnlyInRegularModeTooltip'));
    return;
  }

  setCriesShuffle(value);
  if (value) {
    setRandomCurrentCry();
  } else {
    clearCurrentCry();
  }
  showUserMessage(t('criesShuffleSet', { status: value ? t('enabled') : t('disabled') }));
};

const isDisabled = computed(() => {
  if (flowState.isGivenUp || flowState.isEnded) return true;

  if (state.mode !== 'normal') return true;

  if (!state.gameMode) return false;

  return false;
});
</script>

<template>
  <RoundedBox
    v-tooltip="t('criesShuffleTooltip')"
    v-tooltip.disabled="t('criesShuffleOnlyInRegularModeTooltip')"
    :class="{ disabled: isDisabled }"
  >
    <SegmentButton
      :active="{
        left: state.withCriesShuffle,
        right: !state.withCriesShuffle,
      }"
      :attached="{
        right: true,
      }"
      @click:left="applyCriesShuffle(true)"
      @click:right="applyCriesShuffle(false)"
    >
      <template #prefix> {{ t('criesShuffle') }}: </template>

      <template #left> {{ t('on') }} </template>
      <template #right> {{ t('off') }} </template>
    </SegmentButton>
  </RoundedBox>
</template>

<style scoped></style>
