<script setup lang="ts">
import SaveButtons from '@/components/background/SaveButtons.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import TextBox from '@/components/common/TextBox.vue';
import Leaderboards from '@/components/genSelection/Leaderboards.vue';
import { useSavedData } from '@/composables/useSavedData.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useState } from '@/stores/useState.ts';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLocalStorage } from '@vueuse/core';

const { t } = useI18n();
const name = useLocalStorage('pkmnQuizPlayerName', '');
const { setGameSelectionState } = useGameFlow();
const { state, setName } = useState();
const { loadAutoSave, setReady, hasSavedState } = useSavedData();

const newGame = () => {
  if (!state.name) {
    return;
  }

  setGameSelectionState('gen');
  setReady();
};

const continueGame = () => {
  loadAutoSave();
  setReady();
};

const editName = (event: Event) => {
  const target = event.target as HTMLInputElement;
  name.value = target.value;
  setName(target.value);
};

onMounted(() => {
  const savedName = name.value;
  if (savedName) {
    setName(savedName);
  }
});
</script>

<template>
  <div class="root">
    <p>{{ t('welcome') }}</p>

    <div class="row">
      <form @submit.prevent="newGame">
        <TextBox
          class="large-text"
          type="text"
          :placeholder="t('changeNameDialog.placeholder')"
          @input="editName"
          :value="state.name"
        />
      </form>
    </div>

    <div class="row">
      <RoundedButton
        primary
        :disabled="!state.name"
        @click="newGame"
      >
        {{ t('newGame') }}
      </RoundedButton>

      <RoundedButton
        primary
        v-if="hasSavedState()"
        @click="continueGame"
      >
        {{ t('continue') }}
      </RoundedButton>
    </div>

    <!-- Save/Load -->
    <SaveButtons />

    <!-- Leaderboards -->
    <h2>{{ t('topGuessers', { n: 3 }) }}</h2>
    <Leaderboards />
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

.large-text {
  padding: 6px;
}
</style>
