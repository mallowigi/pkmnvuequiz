<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import BlueskyIcon from '@/components/common/icons/BlueskyIcon.vue';
import FacebookIcon from '@/components/common/icons/FacebookIcon.vue';
import GoogleIcon from '@/components/common/icons/GoogleIcon.vue';
import XIcon from '@/components/common/icons/XIcon.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useFirebase } from '@/composables/useFirebase.js';

const { authenticateWithGoogle } = useFirebase();
const { t } = useI18n();

const login = () => {
  authenticateWithGoogle();
};
</script>

<template>
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
</template>

<style scoped>
.login-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.login-with {
  font-weight: bold;
  max-width: 250px;
  line-height: 1.4;
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
</style>
