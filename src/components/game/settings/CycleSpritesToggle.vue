<script setup lang="ts">
import RoundedBox from '@/components/common/RoundedBox.vue';
import SegmentButton from '@/components/common/SegmentButton.vue';
import { useMessages } from '@/stores/useMessages.ts';
import { useState } from '@/stores/useState.ts';

const { state, setCycleSprites } = useState();
const { showUserMessage } = useMessages();

const applyCycleSprites = (value: boolean) => {
  if (state.withCycleSprites === value) return;

  setCycleSprites(value);
  showUserMessage(`Cycle Sprites ${value ? 'enabled' : 'disabled'}`);
};
</script>

<template>
  <RoundedBox
    v-tooltip="'Toggle Cycle Sprites On/Off'"
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
      <template #prefix> Cycle sprites: </template>

      <template #left> On </template>
      <template #right> Off </template>
    </SegmentButton>
  </RoundedBox>
</template>

<style scoped></style>
