<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import { useAuth } from '@vueuse/firebase';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import SaveButtons from '@/components/background/SaveButtons.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import LoginControls from '@/components/start/LoginControls.vue';
import { useFirebase } from '@/composables/useFirebase.js';
import { useSavedData } from '@/composables/useSavedData.js';
import Leaderboards from '@/components/start/Leaderboards.vue';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useSettings } from '@/stores/useSettings.js';

const { t } = useI18n();
const name = useLocalStorage('pkmnQuizPlayerName', '');
const { setGameSelectionState } = useGameFlow();
const { settingsState, setName } = useSettings();
const { loadAutoSave, setReady, hasSavedState } = useSavedData();
const { signout, auth } = useFirebase();
const { user, isAuthenticated } = useAuth(auth);

const newGame = () => {
  if (!settingsState.name) {
    return;
  }

  setGameSelectionState('gen');
  setReady();
};

const continueGame = () => {
  loadAutoSave();
  setReady();
};

onMounted(() => {
  const savedName = name.value;
  if (savedName && !isAuthenticated) {
    setName(savedName);
  }
});
</script>

<template>
  <div class="root">
    <p>{{ t('welcome') }}</p>

    <!-- Legged Out -->
    <LoginControls v-if="!isAuthenticated" />

    <!-- Logged In -->
    <div
      class="top-section"
      v-else-if="isAuthenticated"
    >
      <div>
        <h1>{{ t('welcomeBack', { name: user?.displayName ?? 'Trainer' }) }}</h1>

        <RoundedButton
          primary
          class="danger-btn"
          :aria-label="t('signout')"
          @click="signout"
        >
          {{ t('signout') }}
        </RoundedButton>
      </div>
    </div>

    <hr class="separator-horizontal" />

    <div class="bottom-section">
      <div class="row">
        <RoundedButton
          primary
          :disabled="!settingsState.name"
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

.top-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 32px;
  width: 100%;
  justify-content: center;
  padding: 16px 0;
}

.danger-btn:hover {
  background-color: var(--danger);
  border-color: var(--danger);
}

.separator-horizontal {
  width: 100%;
  border: 0;
  border-top: 1px solid var(--text);
  opacity: 0.2;
  margin: 16px 0;
}

.bottom-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 8px;
  gap: 8px;
}
</style>
