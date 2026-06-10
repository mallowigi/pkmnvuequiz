<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import { useAuth } from '@vueuse/firebase';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import SaveButtons from '@/components/background/SaveButtons.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import TextBox from '@/components/common/TextBox.vue';
import Leaderboards from '@/components/start/Leaderboards.vue';
import Socials from '@/components/start/Socials.vue';
import { useFirebase } from '@/composables/useFirebase.js';
import { useSavedData } from '@/composables/useSavedData.js';
import { useGameFlow } from '@/stores/useGameFlow.js';
import { useSettings } from '@/stores/useSettings.js';

const { t } = useI18n();
const name = useLocalStorage('pkmnQuizPlayerName', '');
const { setGameSelectionState } = useGameFlow();
const { settingsState, setName } = useSettings();
const { loadAutoSave, setReady, hasSavedState } = useSavedData();
const { authenticateWithGoogle, signout, auth } = useFirebase();
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

const editName = (event: Event) => {
  const target = event.target as HTMLInputElement;
  name.value = target.value;
  setName(target.value);
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

    <!-- Logged Out -->
    <div
      class="top-section"
      v-if="!isAuthenticated"
    >
      <Socials />

      <div class="separator-vertical">
        <div class="line"></div>
        <span class="or-text">{{ t('or') }}</span>
        <div class="line"></div>
      </div>

      <div class="login-column name-column">
        <span class="login-with">{{ t('loginAnonymously') }}</span>
        <form @submit.prevent="newGame">
          <TextBox
            class="large-text"
            type="text"
            :placeholder="t('changeNameDialog.placeholder')"
            @input="editName"
            :value="settingsState.name"
          />
        </form>
      </div>
    </div>

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

.login-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.login-with {
  font-weight: bold;
}

.danger-btn:hover {
  background-color: var(--danger);
  border-color: var(--danger);
}

.name-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.separator-vertical {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
}

.separator-vertical .line {
  width: 1px;
  background-color: var(--text);
  flex-grow: 1;
  opacity: 0.3;
}

.or-text {
  font-weight: bold;
  font-size: 1.5rem;
  margin: 8px 0;
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

.large-text {
  padding: 6px;
}
</style>
