<script setup lang="ts">
import { computed } from 'vue';

import RoundedBox from '@/components/common/RoundedBox.vue';
import SegmentButton from '@/components/common/SegmentButton.vue';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useMessages } from '@/stores/useMessages.js';
import { useState } from '@/stores/useState.js';

const { state, setTypeShuffle } = useState();
const { showUserMessage } = useMessages();
const { flowState } = useGameFlow();
const { setRandomCurrentType, clearCurrentType } = useCurrentType();

const applyTypeShuffle = (value: boolean) => {
  if (state.withTypeShuffle === value) return;

  if (state.mode !== 'normal') {
    showUserMessage('Type Shuffle can only be toggled in Regular mode');
    return;
  }

  setTypeShuffle(value);
  if (value) {
    setRandomCurrentType();
  } else {
    clearCurrentType();
  }
  showUserMessage(`Type Shuffle ${value ? 'enabled' : 'disabled'}`);
};

const isDisabled = computed(
  () => flowState.isGivenUp || flowState.isEnded || state.mode !== 'normal' || state.gameMode === 'types',
);
</script>

<template>
  <RoundedBox
    v-tooltip="'Guess the next Pokemon of a given type'"
    v-tooltip.disabled="'Type Shuffle can only be toggled in Regular mode'"
    :class="{ disabled: isDisabled }"
  >
    <SegmentButton
      :active="{
        left: state.withTypeShuffle,
        right: !state.withTypeShuffle,
      }"
      :attached="{
        right: true,
      }"
      @click:left="applyTypeShuffle(true)"
      @click:right="applyTypeShuffle(false)"
    >
      <template #prefix> Type Shuffle: </template>

      <template #left> On </template>
      <template #right> Off </template>
    </SegmentButton>
  </RoundedBox>
</template>

<style scoped></style>
