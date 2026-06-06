<script setup lang="ts">
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useCurrentGen } from '@/stores/useCurrentGen';
import { useCurrentType } from '@/stores/useCurrentType';
import { useDialogs } from '@/stores/useDialogs.js';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import { useState } from '@/stores/useState.js';
import { scrollToTop } from '@/utils/utils.ts';
import { useTimer } from '@/stores/useTimer.ts';
import { useQuiz } from '@/composables/useQuiz.ts';
import { useI18n } from 'vue-i18n';

const { setDialog } = useDialogs();
const { clearCurrentType } = useCurrentType();
const { clearCurrentGen } = useCurrentGen();
const { setGameMode, state, setMode } = useState();
const { setGameSelectionState } = useGameFlow();
const { resetPokemonState } = usePokemons();
const { resetTimer } = useTimer();
const { t } = useI18n();

const { setFullQuiz } = useQuiz({ withDialog: true });

const setGenQuiz = () => {
  setDialog('switchQuiz', () => {
    setGameSelectionState('gen');
  });
};

const setTypeQuiz = () => {
  setDialog('switchQuiz', () => {
    setGameSelectionState('types');
  });
};

const setSpecialQuiz = () => {
  if (state.gameMode === 'special') return;

  setDialog('switchQuiz', () => {
    setGameMode('special');
    setMode('normal');
    clearCurrentGen();
    clearCurrentType();
    resetPokemonState();
    resetTimer();
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
      {{ t('fullQuiz') }}
      <img
        src="@/assets/FullQuiz.png"
        :alt="t('fullQuiz')"
      />
    </RoundedButton>

    <RoundedButton
      class="rad-no cell-btn"
      :selected="state.gameMode === 'gen'"
      @click="setGenQuiz"
    >
      {{ t('gen') }}
      <img
        src="@/assets/GenQuiz.png"
        :alt="t('gen')"
      />
    </RoundedButton>

    <RoundedButton
      class="rad-no cell-btn"
      :selected="state.gameMode === 'types'"
      @click="setTypeQuiz"
    >
      {{ t('types') }}
      <img
        src="@/assets/TypeQuiz.png"
        :alt="t('types')"
      />
    </RoundedButton>

    <RoundedButton
      class="rad-br cell-btn"
      :selected="state.gameMode === 'special'"
      @click="setSpecialQuiz"
    >
      {{ t('specialQuiz') }}
      <img
        src="@/assets/special.png"
        :alt="t('specialQuiz')"
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
