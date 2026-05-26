<script setup lang="ts">
import SaveButtons from '@/components/background/SaveButtons.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { usePkmnData } from '@/stores/usePkmnStore.ts';
import { useSavedData } from '@/composables/useSavedData.ts';

const { data } = usePkmnData();
const { flowState, setGameSelectionState } = useGameFlow();
const { loadAutoSave } = useSavedData();

const newGame = () => {
  setGameSelectionState('gen');
};

const continueGame = () => {
  loadAutoSave();
};
</script>

<template>
  <div class="root">
    <p>Welcome to the Pokémon Quiz! Select an option to begin.</p>

    <div class="row">
      <RoundedButton
        primary
        @click="newGame"
      >
        New Game
      </RoundedButton>

      <RoundedButton
        primary
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
