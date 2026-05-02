<script setup lang="ts">
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useDialogs } from '@/stores/useDialogs';
import { useState, setGameMode, setGen, setCurrentType } from '@/stores/useState';

const { setDialog } = useDialogs();
const { state } = useState();

const giveUp = () => {
  setDialog('giveup');
};

const resetGame = () => {
  setDialog('reset');
};

const setFullQuiz = () => {
  setDialog('switchQuiz', () => {
    setGameMode('full');
    setGen(null);
    setCurrentType(null);
  });
};

const setGenQuiz = () => {
  setDialog('switchQuiz', () => {
    setGameMode(null);
    setCurrentType(null);
  });
};

const setTypeQuiz = () => {
  setDialog('switchQuiz', () => {
    setGameMode('types');
    setGen(null);
  });
};

const setSpecialQuiz = () => {
  setDialog('switchQuiz', () => {
    setGameMode('special');
    setGen(null);
    setCurrentType(null);
  });
};
</script>

<template>
  <div class="row">
    <RoundedButton
      class="rad-br-tl danger-btn"
      @click="giveUp()"
    >
      Give Up
    </RoundedButton>

    <RoundedButton
      class="rad-br-tl danger-btn"
      @click="resetGame()"
    >
      Reset
    </RoundedButton>
  </div>

  <div class="row">
    <div class="column">
      <RoundedButton
        class="rad-tl cell-btn"
        :selected="state.gameMode === 'full'"
        @click="setFullQuiz()"
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
        @click="setGenQuiz()"
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
        @click="setTypeQuiz()"
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
        @click="setSpecialQuiz()"
      >
        Special Quiz
        <img
          src="@/assets/special.png"
          alt="Special Quiz"
        />
      </RoundedButton>
    </div>
  </div>
</template>

<style scoped>
.row {
  line-height: 30px;
}

.column {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0;
  margin: 10px 0 0 10px;
}

.danger-btn:hover {
  background-color: var(--danger);
  border-color: var(--danger);
}

.cell-btn {
  margin: 0;
  border-left: none;
  border-right-style: dotted;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;

  &.selected {
    border-left: none;
  }

  &:hover {
    background-color: var(--btn-color, var(--darkPrimary));
    border-color: var(--btn-color, var(--darkPrimary));
    border-left: none;
  }

  &:first-child {
    border-left: 2px solid var(--btn-color, var(--darkPrimary));
  }

  &:last-child {
    border-right-style: solid;
  }
}
</style>
