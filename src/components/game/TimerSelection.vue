<script setup lang="ts">
import { computed } from 'vue';

import RoundedBox from '@/components/common/RoundedBox.vue';
import SegmentButton from '@/components/common/SegmentButton.vue';
import { useMessages } from '@/stores/useMessages.ts';
import { useState } from '@/stores/useState.ts';
import { useDialogs } from '@/stores/useDialogs.ts';

const { state, setMinutes, setIsLimited, setPaused } = useState();
const { setDialog } = useDialogs();
const { showUserMessage } = useMessages();

const setInfinite = () => {
  setIsLimited(false);
  showUserMessage('Timer unset.');
};

const setFinite = () => {
  // If the timer is already running and the elapsed time exceeds the new limit, end the game immediately
  if (state.timer.elapsed > state.timer.minutes * 60) {
    setDialog('giveup');
    return;
  }

  setIsLimited(true);
  showUserMessage(`Timer set to ${state.timer.minutes} minutes.`);
};

const togglePause = () => setPaused(!state.isPaused);

const minutes = computed({
  get: () => state.timer.minutes,
  set: (value) => {
    // If the timer is currently running and the new time limit is less than the elapsed time, end the game immediately
    if (state.timer.isLimited && state.timer.elapsed > value - 1 * 60) {
      setDialog('giveup');
      return;
    }

    setMinutes(value);
  },
});
</script>

<template>
  <RoundedBox class="timer-box">
    <SegmentButton
      :active="{
        left: !state.timer.isLimited,
        right: state.timer.isLimited,
        suffix: state.isPaused,
      }"
      :attached="{
        right: true,
      }"
      :noPointer="{
        right: true,
      }"
      :classes="{
        center: 'input-segment',
      }"
      @click:left="setInfinite"
      @click:right="setFinite"
      @click:suffix="togglePause"
    >
      <template #prefix> Timer: </template>

      <template #left> ∞ </template>

      <template #center>
        <div class="input-timer-container">
          <input
            type="number"
            name="timer"
            class="input-timer"
            min="1"
            max="999"
            v-model="minutes"
            autocomplete="off"
            placeholder="1"
          />
        </div>
      </template>

      <template #right> set </template>

      <template #suffix> ⏸ </template>
    </SegmentButton>
  </RoundedBox>
</template>

<style scoped>
:deep(.input-segment) {
  padding: 0;
  border-radius: 6px 0 0 3px;
  display: flex;
  align-items: stretch;
  flex: 1;
}

.input-timer-container {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;

  &::after {
    content: 'min';
    position: absolute;
    right: 3px;
    color: var(--input-text);
    pointer-events: none;
  }
}

.input-timer {
  border: none;
  box-sizing: border-box;
  font-size: 16px;
  border-radius: 3px 0 0 0px;
  color: var(--input-text);
  background: var(--input);
  padding: 2px 32px 2px 0;
  text-align: right;
  width: 100%;
  outline: none;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>
