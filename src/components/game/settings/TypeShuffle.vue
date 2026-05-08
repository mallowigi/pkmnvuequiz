<script setup lang="ts">
import RoundedBox from '@/components/common/RoundedBox.vue';
import SegmentButton from '@/components/common/SegmentButton.vue';
import { useMessages } from '@/stores/useMessages.js';
import { useState } from '@/stores/useState.js';

const { state, setTypeShuffle } = useState();
const { showUserMessage } = useMessages();

const applyTypeShuffle = (value: boolean) => {
  if (state.withTypeShuffle === value) return;

  if (state.mode !== 'normal') {
    showUserMessage('Type Shuffle can only be toggled in Regular mode');
    return;
  }

  setTypeShuffle(value);
  showUserMessage(`Type Shuffle ${value ? 'enabled' : 'disabled'}`);
};
</script>

<template>
  <RoundedBox title="Guess the next Pokemon of a given type">
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
