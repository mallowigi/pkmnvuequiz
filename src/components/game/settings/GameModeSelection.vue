<script setup lang="ts">
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useDialogs } from '@/stores/useDialogs.js';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useState } from '@/stores/useState.js';
import { useQuiz } from '@/composables/useQuiz.ts';
import { useI18n } from 'vue-i18n';

const { setDialog } = useDialogs();
const { state } = useState();
const { setGameSelectionState } = useGameFlow();
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
  setDialog('switchQuiz', () => {
    setGameSelectionState('special');
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
      <span class="hide-mobile">{{ t('fullQuiz') }}</span>
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
      <span class="hide-mobile">{{ t('gen') }}</span>
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
      <span class="hide-mobile">{{ t('types') }}</span>
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
      <span class="hide-mobile">{{ t('specialQuiz') }}</span>
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
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  min-width: 90px;

  & > .mode {
    .mobile & {
      display: none;
    }
  }

  &:hover {
    background-color: var(--type-dark-color, var(--darkPrimary));
    border-color: var(--type-dark-color, var(--darkPrimary));
    border-left: none;
  }

  &.selected {
    background-color: var(--type-btn-color, var(--primary));
    border-color: var(--type-btn-color, var(--primary));
    border-left: none;
    color: var(--type-fg-color, var(--text));

    img {
      filter: brightness(0) invert(1);
    }
  }

  &:first-child {
    border-left: 2px solid var(--type-btn-color, var(--primary));
  }

  &:last-child {
    border-right-style: solid;
  }
}
</style>
