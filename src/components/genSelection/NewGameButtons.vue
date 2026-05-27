<script setup lang="ts">
import SaveButtons from '@/components/background/SaveButtons.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useSavedData } from '@/composables/useSavedData.ts';
import { useState } from '@/stores/useState.ts';
import TextBox from '@/components/common/TextBox.vue';

const { setGameSelectionState } = useGameFlow();
const { state } = useState();
const { loadAutoSave, setReady, hasSavedState } = useSavedData();

const newGame = () => {
  setGameSelectionState('gen');
  setReady();
};

const continueGame = () => {
  loadAutoSave();
  setReady();
};
</script>

<template>
  <div class="root">
    <p>Welcome to the Pokémon Quiz! Select an option to begin.</p>

    <div class="row">
      <TextBox
        type="text"
        placeholder="Enter your name"
        v-model="state.name"
      />
    </div>

    <div class="row">
      <RoundedButton
        primary
        :disabled="!state.name"
        @click="newGame"
      >
        New Game
      </RoundedButton>

      <RoundedButton
        primary
        v-if="hasSavedState()"
        @click="continueGame"
      >
        Continue
      </RoundedButton>
    </div>

    <SaveButtons />
  </div>
</template>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 8px;
  gap: 8px;
}
</style>
