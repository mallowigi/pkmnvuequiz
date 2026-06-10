<script setup lang="ts">
import Socials from '@/components/start/Socials.vue';
import TextBox from '@/components/common/TextBox.vue';
import { useI18n } from 'vue-i18n';
import { useLocalStorage } from '@vueuse/core';
import { useSettings } from '@/stores/useSettings.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useSavedData } from '@/composables/useSavedData.ts';

const { t } = useI18n();
const name = useLocalStorage('pkmnQuizPlayerName', '');
const { settingsState, setName } = useSettings();
const { setGameSelectionState } = useGameFlow();
const { setReady } = useSavedData();

const editName = (event: Event) => {
  const target = event.target as HTMLInputElement;
  name.value = target.value;
  setName(target.value);
};

const newGame = () => {
  if (!settingsState.name) {
    return;
  }

  setGameSelectionState('gen');
  setReady();
};
</script>

<template>
  <div class="top-section">
    <Socials />

    <div class="separator-vertical">
      <div class="line"></div>
      <span class="or-text">{{ t }}</span>
      <div class="line"></div>
    </div>

    <div class="login-column name-column">
      <span class="login-with">{{ t }}</span>
      <form @submit.prevent="newGame">
        <TextBox
          class="large-text"
          type="text"
          :placeholder="t"
          @input="editName"
          :value="settingsState.name"
        />
      </form>
    </div>
  </div>
</template>

<style scoped>
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

.large-text {
  padding: 6px;
}
</style>
