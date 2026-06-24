<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import FacebookIcon from '@/components/common/icons/FacebookIcon.vue';
import GitHubIcon from '@/components/common/icons/GitHubIcon.vue';
import GoogleIcon from '@/components/common/icons/GoogleIcon.vue';
import XIcon from '@/components/common/icons/XIcon.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useFirebase } from '@/composables/useFirebase.js';

const { authenticateWithGoogle, authenticateWithFacebook, authenticateWithX, authenticateWithGithub } = useFirebase();
const { t } = useI18n();

const loginWithGoogle = () => {
  authenticateWithGoogle();
};

const loginFacebook = () => {
  authenticateWithFacebook();
};

const loginWithX = () => {
  authenticateWithX();
};

const loginWithGithub = () => {
  authenticateWithGithub();
};
</script>

<template>
  <div class="login-column">
    <span class="login-with">{{ t('loginWith') }}</span>

    <div class="login-providers">
      <RoundedButton
        class="provider-btn google"
        primary
        @click="loginWithGoogle"
        :aria-label="t('google')"
      >
        <GoogleIcon />
      </RoundedButton>

      <RoundedButton
        class="provider-btn facebook"
        primary
        @click="loginFacebook"
        :aria-label="t('facebook')"
      >
        <FacebookIcon />
      </RoundedButton>

      <RoundedButton
        class="provider-btn x"
        primary
        @click="loginWithX"
        :aria-label="t('x')"
      >
        <XIcon />
      </RoundedButton>

      <RoundedButton
        class="provider-btn github"
        primary
        @click="loginWithGithub"
        :aria-label="t('github')"
      >
        <GitHubIcon />
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

.provider-btn.github {
  --type-bg-color: #24292e;
  --type-btn-color: #24292e;
  --type-fg-color: white;
}
</style>
