<script setup lang="ts">
import RoundedBox from '@/components/common/RoundedBox.vue';
import SegmentButton from '@/components/common/SegmentButton.vue';
import { useMessages } from '@/stores/useMessages.ts';
import { useState } from '@/stores/useState.ts';

const { state, setAutoPause } = useState();
const { showUserMessage } = useMessages();

const applyAutoPause = (value: boolean) => {
  if (state.autoPause === value) return;

  setAutoPause(value);
  showUserMessage(`Auto Pause ${value ? 'enabled' : 'disabled'}`);
};
</script>

<template>
  <RoundedBox
    v-game-ended
    v-tooltip="'Toggle Auto Pause On/Off'"
  >
    <SegmentButton
      :active="{
        left: state.autoPause,
        right: !state.autoPause,
      }"
      :attached="{
        right: true,
      }"
      @click:left="applyAutoPause(true)"
      @click:right="applyAutoPause(false)"
    >
      <template #prefix> Auto Pause: </template>

      <template #left> On </template>
      <template #right> Off </template>
    </SegmentButton>
  </RoundedBox>
</template>

<style scoped></style>
