<script setup lang="ts">
import { useAuth } from '@vueuse/firebase';

import { useFirebase } from '@/composables/useFirebase.ts';
import { useSettings } from '@/stores/useSettings.ts';

const { auth } = useFirebase();
const { user } = useAuth(auth);
const { settingsState } = useSettings();
</script>

<template>
  <div
    class="avatar"
    v-tooltip:bottom="user?.displayName || settingsState.name"
    :style="{ '--avatar-url': `url(${user?.photoURL})` }"
  />
</template>

<style scoped>
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid var(--text);
  background: var(--avatar-url);
  background-size: cover;
  cursor: pointer;
}
</style>
