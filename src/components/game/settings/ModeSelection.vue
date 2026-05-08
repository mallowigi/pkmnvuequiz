<script setup lang="ts">
import RoundedBox from '@/components/common/RoundedBox.vue';
import SegmentButton from '@/components/common/SegmentButton.vue';
import { useDialogs } from '@/stores/useDialogs.js';
import { useGameFlow } from '@/stores/useGameFlow.js';
import { useState } from '@/stores/useState.js';
import type { Mode } from '@/types.js';

const { state, setMode } = useState();
const { flowState } = useGameFlow();
const { setDialog } = useDialogs();

const applyMode = (mode: Mode) => {
  if (state.mode === mode) return;

  if (!flowState.isStarted) {
    setMode(mode);
    return;
  }

  setDialog(mode);
};
</script>

<template>
  <RoundedBox>
    <SegmentButton
      :active="{
        left: state.mode === 'chaos',
        center: state.mode === 'normal',
        right: state.mode === 'order',
      }"
      @click:left="applyMode('chaos')"
      @click:center="applyMode('normal')"
      @click:right="applyMode('order')"
    >
      <template #prefix> Mode: </template>

      <template #left> Chaos </template>

      <template #center> Regular </template>

      <template #right> Dex Order </template>
    </SegmentButton>
  </RoundedBox>
</template>

<style scoped></style>
