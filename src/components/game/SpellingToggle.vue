<script setup lang="ts">
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useMessages } from '@/stores/useMessages.ts';
import { useState } from '@/stores/useState.ts';

const { state, toggleSpelling } = useState();
const { showUserMessage } = useMessages();

const toggle = () => {
  toggleSpelling();
  showUserMessage('Spelling help toggled');
};
</script>

<template>
  <RoundedButton
    class="spelling-toggle rad-br-tl"
    @click="toggle"
    :class="{ selected: state.withSpelling }"
  >
    Spelling Help
    <img src="@/assets/spellcheck.png" />
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
    color: var(--button);
  }
}
</style>
