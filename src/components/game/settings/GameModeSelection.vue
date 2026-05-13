<script setup lang="ts">
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useCurrentGen } from '@/stores/useCurrentGen';
import { useCurrentType } from '@/stores/useCurrentType';
import { useDialogs } from '@/stores/useDialogs.js';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useState } from '@/stores/useState.js';
import { scrollToTop } from '@/utils/utils.ts';

const { setDialog } = useDialogs();
const { clearCurrentType } = useCurrentType();
const { clearCurrentGen } = useCurrentGen();
const { setGameMode, state } = useState();
const { setGameSelectionState } = useGameFlow();

const setFullQuiz = () => {
  if (state.gameMode === 'full') return;

  setDialog('switchQuiz', () => {
    setGameMode('full');
    clearCurrentGen();
    clearCurrentType();
    scrollToTop();
  });
};

const setGenQuiz = () => {
  setDialog('switchQuiz', () => {
    setGameSelectionState('gen');
    scrollToTop();
  });
};

const setTypeQuiz = () => {
  setDialog('switchQuiz', () => {
    setGameSelectionState('types');
    scrollToTop();
  });
};

const setSpecialQuiz = () => {
  if (state.gameMode === 'special') return;

  setDialog('switchQuiz', () => {
    setGameMode('special');
    clearCurrentGen();
    clearCurrentType();
    scrollToTop();
  });
};
</script>

<template>
  <div class="row">
    <RoundedButton
      class="rad-tl cell-btn"
      :selected="state.gameMode === 'full'"
      @click="setFullQuiz"
    >
      Full Quiz
      <img
        src="@/assets/FullQuiz.png"
        alt="Full Quiz"
      />
    </RoundedButton>

    <RoundedButton
      class="rad-no cell-btn"
      :selected="state.gameMode === 'gen'"
      @click="setGenQuiz"
    >
      Generations
      <img
        src="@/assets/GenQuiz.png"
        alt="Generations"
      />
    </RoundedButton>

    <RoundedButton
      class="rad-no cell-btn"
      :selected="state.gameMode === 'types'"
      @click="setTypeQuiz"
    >
      Types
      <img
        src="@/assets/TypeQuiz.png"
        alt="Types"
      />
    </RoundedButton>

    <RoundedButton
      class="rad-br cell-btn"
      :selected="state.gameMode === 'special'"
      @click="setSpecialQuiz"
    >
      Special Quiz
      <img
        src="@/assets/special.png"
        alt="Special Quiz"
      />
    </RoundedButton>
  </div>
</template>

<style scoped>
.row {
  margin: 10px 0 0 10px;
}

.cell-btn {
  margin: 0;
  border-right-style: dotted;
  border-left: none;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;

  &:hover {
    background-color: var(--type-dark-color);
    border-color: var(--type-dark-color);
    border-left: none;
  }

  &.selected {
    background-color: var(--type-btn-color);
    border-color: var(--type-btn-color);
    border-left: none;
    color: var(--type-fg-color);
  }

  &:first-child {
    border-left: 2px solid var(--type-btn-color);
  }

  &:last-child {
    border-right-style: solid;
  }
}
</style>
