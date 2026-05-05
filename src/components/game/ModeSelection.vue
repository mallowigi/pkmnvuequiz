<script setup lang="ts">
import RoundedBox from '@/components/common/RoundedBox.vue';
import SegmentButton from '@/components/common/SegmentButton.vue';
import { useState } from '@/stores/useState.ts';
import type { Mode } from '@/types.ts';
import { useDialogs } from '@/stores/useDialogs.ts';

const { state, setMode } = useState();
const { setDialog } = useDialogs();

const applyMode = (mode: Mode) => {
  if (state.mode === mode) return;

  if (!state.isStarted) {
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
