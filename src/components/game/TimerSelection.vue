<script setup lang="ts">
import { computed } from 'vue';

import RoundedBox from '@/components/common/RoundedBox.vue';
import { useState } from '@/stores/useState.ts';
import { useMessages } from '@/stores/useMessages.ts';

const { state, setMinutes, setIsLimited, setPaused } = useState();
const { showUserMessage } = useMessages();

const setInfinite = () => {
  setIsLimited(false);
  showUserMessage('Timer unset.');
};

const setFinite = () => {
  setIsLimited(true);
  showUserMessage(`Timer set to ${state.timer.minutes} minutes.`);
};

const togglePause = () => setPaused(!state.isPaused);

const minutes = computed({
  get: () => state.timer.minutes,
  set: (value) => setMinutes(value),
});
</script>

<template>
  <RoundedBox>
    Timer:
    <div
      class="smolbutton"
      :class="{ active: !state.timer.isLimited }"
      @click="setInfinite"
    >
      ∞
    </div>

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

    <div
      class="smolbutton attached"
      :class="{ active: state.timer.isLimited }"
      @click="setFinite"
    >
      set
    </div>

    <div
      class="smolbutton"
      :class="{ active: state.isPaused }"
      @click="togglePause"
    >
      ⏸
    </div>
  </RoundedBox>
</template>

<style scoped>
.smolbutton {
  border: solid 2px var(--type-btn-color, var(--primary));
  color: var(--type-btn-color, var(--primary));
  border-radius: 6px 3px 6px 3px;
  text-align: center;
  text-decoration: none;
  padding: 3px 5px 3px 5px;
  vertical-align: middle;
  line-height: 16px;
  cursor: pointer;

  &.active {
    background: var(--type-btn-color, var(--primary));
    color: var(--button);
  }

  &.attached {
    border-radius: 0 3px 6px 0;
    margin-left: -10px;
  }
}

.input-timer-container {
  position: relative;
  &::after {
    content: 'min';
    position: absolute;
    right: 6px;
    color: var(--input-text);
  }
}

.input-timer {
  border: solid 2px var(--type-btn-color, var(--primary));
  box-sizing: border-box;
  font-size: 16px;
  color: var(--input-text);
  background: var(--input);
  padding: 2px 36px 2px 6px;
  text-align: right;
  border-radius: 6px 0 0 3px;
  -moz-appearance: textfield;
  outline: none;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>
