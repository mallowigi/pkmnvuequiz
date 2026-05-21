<script setup lang="ts">
import { ref, watch } from 'vue';

import RoundedBox from '@/components/common/RoundedBox.vue';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { usePokemons } from '@/stores/usePokemons.ts';

const { flowState } = useGameFlow();
const { findClosestPokemon } = usePokemons();

const hintShown = ref(false);
const hint = ref('not found');

const toggle = () => {
  hintShown.value = !hintShown.value;

  if (hintShown.value) {
    hint.value = findClosestPokemon(flowState.lastInput!) || 'not found';
  }
};

watch(
  () => flowState.lastInput,
  () => {
    hintShown.value = false;
  },
);
</script>

<template>
  <RoundedBox class="cell">
    <div class="label rad-bl">
      <div class="txt">Closest spelling:</div>
    </div>

    <div class="button rad-tr transition-element">
      <div
        @click="toggle"
        :hidden="hintShown"
      >
        click to reveal
      </div>

      <div
        @click="toggle"
        :hidden="!hintShown"
        class="txt hint"
      >
        {{ hint }}
      </div>
    </div>
  </RoundedBox>
</template>

<style scoped>
.cell {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  min-width: 150px;
  border-radius: 3px 20px;
  padding: 0;
  gap: 0;
}

.label {
  background: var(--type-btn-color, var(--primary));
  color: var(--type-fg-color, var(--text));
  padding: 10px 18px;
}

.button {
  cursor: pointer;
  padding: 10px 18px;

  &:hover {
    background-color: var(--type-dark-color, var(--darkPrimary));
    border-color: var(--type-dark-color, var(--darkPrimary));
  }
}

.hint {
  font-size: 20px;
}
</style>
