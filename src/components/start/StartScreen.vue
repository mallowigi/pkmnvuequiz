<script setup lang="ts">
import { useAuth } from '@vueuse/firebase';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import SaveButtons from '@/components/background/SaveButtons.vue';
import Leaderboards from '@/components/start/Leaderboards.vue';
import LoggedInInfo from '@/components/start/LoggedInInfo.vue';
import LoginControls from '@/components/start/LoginControls.vue';
import { useFirebase } from '@/composables/useFirebase.js';
import { useSettings } from '@/stores/useSettings.js';
import NewGameButtons from '@/components/start/NewGameButtons.vue';
import { useNameGenerator } from '@/composables/useNameGenerator.ts';
import { useSavedData } from '@/composables/useSavedData.ts';

const { t } = useI18n();
const { getSavedName } = useSavedData();
const { setName } = useSettings();
const { auth } = useFirebase();
const { user, isAuthenticated } = useAuth(auth);
const { generateName } = useNameGenerator();

onMounted(() => {
  const savedName = getSavedName();
  const randomName = generateName();
  if (!isAuthenticated) {
    setName(savedName || randomName);
  } else {
    setName(user.value?.displayName || savedName || randomName);
  }
});
</script>

<template>
  <div class="root">
    <p>{{ t('welcome') }}</p>

    <div class="top-section">
      <!-- Legged Out -->
      <LoginControls v-if="!isAuthenticated" />

      <!-- Logged In -->
      <LoggedInInfo v-else />
    </div>

    <hr class="separator-horizontal" />

    <div class="bottom-section">
      <NewGameButtons />

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
