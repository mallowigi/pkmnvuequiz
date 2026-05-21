<script setup lang="ts">
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useMessages } from '@/stores/useMessages.js';
import { useState } from '@/stores/useState.js';
import { useGameFlow } from '@/stores/useGameFlow.ts';

const { state, toggleSpelling } = useState();
const { showUserMessage } = useMessages();
const { flowState } = useGameFlow();

const toggle = () => {
  toggleSpelling();
  showUserMessage('Spelling help toggled');
};
</script>

<template>
  <RoundedButton
    title="Toggle spelling help"
    class="spelling-toggle rad-br-tl"
    @click="toggle"
    :class="{ selected: state.withSpelling, disabled: flowState.isGivenUp || flowState.isEnded }"
  >
    Spelling Help
    <img
      src="@/assets/spellcheck.png"
      alt="Spellcheck"
    />
  </RoundedButton>
</template>

<style scoped>
.spelling-toggle {
  padding: 9px 14px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  & img {
    height: 28px;
  }

  &:hover {
    background-color: var(--type-dark-color);
    border-color: var(--type-dark-color);
  }

  &.selected {
    background-color: var(--type-btn-color);
    border-color: var(--type-btn-color);
    color: var(--type-fg-color);
  }
}
</style>
