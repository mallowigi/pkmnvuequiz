<script setup lang="ts">
import RoundedBox from '@/components/common/RoundedBox.vue';
import SegmentButton from '@/components/common/SegmentButton.vue';
import { useState } from '@/stores/useState.ts';
import { useMessages } from '@/stores/useMessages.ts';

const { state, setTypeShuffle } = useState();
const { showUserMessage } = useMessages();

const applyTypeShuffle = (value: boolean) => {
  if (state.withTypeShuffle === value) return;

  setTypeShuffle(value);
  showUserMessage(`Type Shuffle ${value ? 'enabled' : 'disabled'}`);
};
</script>

<template>
  <RoundedBox>
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
