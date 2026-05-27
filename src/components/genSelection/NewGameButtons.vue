<script setup lang="ts">
import SaveButtons from '@/components/background/SaveButtons.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import TextBox from '@/components/common/TextBox.vue';
import { useSavedData } from '@/composables/useSavedData.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useState } from '@/stores/useState.ts';
import { useFirebase } from '@/composables/useFirebase.ts';

const { setGameSelectionState } = useGameFlow();
const { state, setName } = useState();
const { loadAutoSave, setReady, hasSavedState } = useSavedData();

const newGame = () => {
  setGameSelectionState('gen');
  setReady();
};

const continueGame = () => {
  loadAutoSave();
  setReady();
};

const { leaderBoards } = useFirebase();
</script>

<template>
  <div class="root">
    <p>Welcome to the Pokémon Quiz!</p>

    <div class="row">
      <TextBox
        type="text"
        placeholder="Enter your name"
        @input="setName"
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

    <div class="leaderboard">
      <h2>Top Players</h2>
      <div v-if="leaderBoards">
        <div
          v-for="user in leaderBoards"
          :key="user.id"
        >
          {{ user.name }} &mdash; {{ user.time }}
        </div>
      </div>
    </div>
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
