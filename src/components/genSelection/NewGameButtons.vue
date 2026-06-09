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
import { useFirebase } from '@/composables/useFirebase.ts';
import GoogleIcon from '@/components/common/icons/GoogleIcon.vue';
import FacebookIcon from '@/components/common/icons/FacebookIcon.vue';
import XIcon from '@/components/common/icons/XIcon.vue';
import BlueskyIcon from '@/components/common/icons/BlueskyIcon.vue';

const { t } = useI18n();
const name = useLocalStorage('pkmnQuizPlayerName', '');
const { setGameSelectionState } = useGameFlow();
const { state, setName } = useState();
const { loadAutoSave, setReady, hasSavedState } = useSavedData();
const { authenticateWithGoogle, loginState, signout } = useFirebase();

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

const login = () => {
  authenticateWithGoogle();
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

    <div
      class="top-section"
      v-if="!loginState.user"
    >
      <div class="login-column">
        <span class="login-with">{{ t('loginWith') }}</span>

        <div class="login-providers">
          <RoundedButton
            class="provider-btn google"
            primary
            @click="login"
            :aria-label="t('google')"
          >
            <GoogleIcon />
          </RoundedButton>

          <RoundedButton
            class="provider-btn facebook"
            primary
            disabled
            :aria-label="t('facebook')"
          >
            <FacebookIcon />
          </RoundedButton>

          <RoundedButton
            class="provider-btn x"
            primary
            disabled
            :aria-label="t('x')"
          >
            <XIcon />
          </RoundedButton>

          <RoundedButton
            class="provider-btn bluesky"
            primary
            disabled
            :aria-label="t('bluesky')"
          >
            <BlueskyIcon />
          </RoundedButton>
        </div>
      </div>

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
            :value="state.name"
          />
        </form>
      </div>
    </div>

    <div
      class="top-section"
      v-else-if="loginState.user"
    >
      <div>
        <h1>{{ t('welcomeBack', { name: loginState.user.displayName }) }}</h1>

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

.login-providers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.provider-btn {
  min-width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  margin: 0;
}

.provider-btn.google {
  --type-bg-color: #4285f4;
  --type-btn-color: #4285f4;
  --type-fg-color: white;
}

.provider-btn.facebook {
  --type-bg-color: #1877f2;
  --type-btn-color: #1877f2;
  --type-fg-color: white;
}

.provider-btn.x {
  --type-bg-color: #000000;
  --type-btn-color: #000000;
  --type-fg-color: white;
}

.provider-btn.bluesky {
  --type-bg-color: #0085ff;
  --type-btn-color: #0085ff;
  --type-fg-color: white;
}

.danger-btn:hover {
  background-color: var(--danger);
  border-color: var(--danger);
}

.provider-btn.disabled {
  opacity: 0.5;
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
