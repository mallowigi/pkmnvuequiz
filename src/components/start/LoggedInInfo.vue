<script setup lang="ts">
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useFirebase } from '@/composables/useFirebase.ts';
import { useAuth } from '@vueuse/firebase';
import { useI18n } from 'vue-i18n';
import { useSettings } from '@/stores/useSettings.ts';

const { t } = useI18n();
const { settingsState } = useSettings();
const { signout, auth } = useFirebase();
const { user } = useAuth(auth);
</script>

<template>
  <div>
    <h1>{{ t('welcomeBack', { name: user?.displayName ?? settingsState.name }) }}</h1>

    <RoundedButton
      primary
      class="danger-btn"
      :aria-label="t('signout')"
      @click="signout"
    >
      {{ t('signout') }}
    </RoundedButton>
  </div>
</template>
