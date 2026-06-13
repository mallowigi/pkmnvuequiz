<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import TextBox from '@/components/common/TextBox.vue';
import Socials from '@/components/start/Socials.vue';
import { useSavedData } from '@/composables/useSavedData.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useSettings } from '@/stores/useSettings.ts';
import { onMounted } from 'vue';
import { useNameGenerator } from '@/composables/useNameGenerator.ts';

const { t } = useI18n();
const { settingsState, setName } = useSettings();
const { setGameSelectionState } = useGameFlow();
const { setReady, setSavedName, getSavedName } = useSavedData();
const { generateName } = useNameGenerator();

const editName = (event: Event) => {
  const target = event.target as HTMLInputElement;
  setSavedName(target.value);
  setName(target.value);
};

const newGame = () => {
  if (!settingsState.name) {
    return;
  }

  setGameSelectionState('gen');
  setReady();
};

onMounted(() => {
  setName(getSavedName() || generateName());
});
</script>

<template>
  <div class="twocols">
    <!-- Socials Login -->
    <Socials />

    <div class="separator-vertical">
      <div class="line"></div>
      <span class="or-text">{{ t('or') }}</span>
      <div class="line"></div>
    </div>

    <!-- Anonymous Login -->
    <div class="login-column name-column">
      <span class="login-with">{{ t('enterName') }}</span>
      <form @submit.prevent="newGame">
        <TextBox
          class="large-text"
          maxlength="50"
          type="text"
          :placeholder="t('enterName')"
          @input="editName"
          :value="settingsState.name"
        />
      </form>
    </div>
  </div>
</template>

<style scoped>
.twocols {
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

  & .line {
    width: 1px;
    background-color: var(--text-inverted);
    flex-grow: 1;
    opacity: 0.3;
  }
}

.or-text {
  font-weight: bold;
  font-size: 1.5rem;
  margin: 8px 0;
}

.large-text {
  padding: 6px;
  width: 200px;
}
</style>
