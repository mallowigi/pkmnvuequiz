<script setup lang="ts">
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useFirebase } from '@/composables/useFirebase.ts';
import { useAuth } from '@vueuse/firebase';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { signout, auth } = useFirebase();
const { user } = useAuth(auth);
</script>

<template>
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
</template>

<style scoped>
.danger-btn:hover {
  background-color: var(--danger);
  border-color: var(--danger);
}
</style>
