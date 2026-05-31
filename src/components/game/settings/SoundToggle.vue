<script setup lang="ts">
import SegmentButton from '@/components/common/SegmentButton.vue';
import { useMessages } from '@/stores/useMessages.ts';
import { useState } from '@/stores/useState.ts';
import RoundedBox from '@/components/common/RoundedBox.vue';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { computed } from 'vue';

const { state, setSound } = useState();
const { showUserMessage } = useMessages();
const { flowState } = useGameFlow();

const applySound = (value: boolean) => {
  if (state.withSound === value) return;

  setSound(value);
  showUserMessage(`Sound ${value ? 'enabled' : 'disabled'}`);
};

const isDisabled = computed(() => flowState.isGivenUp || flowState.isEnded);
</script>

<template>
  <RoundedBox
    :class="{ disabled: isDisabled }"
    title="Toggle Sounds On/Off"
  >
    <SegmentButton
      :active="{
        left: state.withSound,
        right: !state.withSound,
      }"
      :attached="{
        right: true,
      }"
      @click:left="applySound(true)"
      @click:right="applySound(false)"
    >
      <template #prefix> Sound: </template>

      <template #left> On </template>
      <template #right> Off </template>
    </SegmentButton>
  </RoundedBox>
</template>

<style scoped></style>
