<script setup>
import { computed } from 'vue';

import RoundedButton from '@/components/common/RoundedButton.vue';
import { useCurrentType } from '@/stores/useCurrentType.js';
import { useDialogs } from '@/stores/useDialogs.js';

const { setDialog } = useDialogs();
const { getCurrentType } = useCurrentType();

const buttonStyles = computed(() => {
  const type = getCurrentType();
  const color = type?.buttonColor;
  const bgColor = type?.bgColor;
  return {
    '--bg-color': bgColor,
    '--btn-color': color,
  };
});

const giveUp = () => {
  setDialog('giveup');
};

const resetGame = () => {
  setDialog('reset');
};
</script>

<template>
  <div class="row">
    <RoundedButton
      class="rad-br-tl"
      @click="giveUp()"
    >
      Give Up
    </RoundedButton>

    <RoundedButton
      class="rad-br-tl"
      @click="resetGame()"
    >
      Reset
    </RoundedButton>
  </div>

  <div class="row">
    <div class="longButton">
      <RoundedButton class="rad-tl cell-btn">
        Full Quiz
        <img
          src="@/assets/FullQuiz.png"
          alt="Full Quiz"
        />
      </RoundedButton>

      <RoundedButton class="rad-no cell-btn">
        Generations
        <img
          src="@/assets/GenQuiz.png"
          alt="Generations"
        />
      </RoundedButton>

      <RoundedButton class="rad-no cell-btn">
        Types
        <img
          src="@/assets/TypeQuiz.png"
          alt="Types"
        />
      </RoundedButton>

      <RoundedButton class="rad-br cell-btn">
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

.longButton {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0;
  margin: 10px 0 0 10px;
}

.cell-btn {
  margin: 0;
  border-left: 2px solid transparent;
  border-right-style: dotted;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;

  &:hover {
    background-color: var(--btn-color, var(--primary));
    border-color: var(--btn-color, var(--primary));
  }

  &:last-child {
    border-right-style: solid;
  }
}
</style>
