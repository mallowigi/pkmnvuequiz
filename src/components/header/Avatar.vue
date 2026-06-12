<script setup lang="ts">
import { onClickOutside, onKeyStroke } from '@vueuse/core';
import { useAuth } from '@vueuse/firebase';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useFirebase } from '@/composables/useFirebase.ts';
import { useDialogs } from '@/stores/useDialogs.ts';
import { useSettings } from '@/stores/useSettings.ts';

const { auth, signout } = useFirebase();
const { user, isAuthenticated } = useAuth(auth);
const { settingsState } = useSettings();
const { setDialog } = useDialogs();
const { t } = useI18n();

const isMenuOpen = ref(false);
const avatarContainer = ref<HTMLElement | null>(null);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const openProfile = () => {
  setDialog('changeName');
  isMenuOpen.value = false;
};

const openLogin = () => {
  setDialog('login');
  isMenuOpen.value = false;
};

const handleLogout = async () => {
  await signout();
  isMenuOpen.value = false;
};

onClickOutside(avatarContainer, () => {
  isMenuOpen.value = false;
});

onKeyStroke('Escape', () => {
  isMenuOpen.value = false;
});

const initials = computed(() => {
  const parts = (settingsState.name || '').trim().split(' ').slice(0, 2);
  return parts
    .map((p) => p[0])
    .join('')
    .toUpperCase();
});

const profilePic = computed(() => settingsState.profilePic);
</script>

<template>
  <div
    class="avatar-container"
    ref="avatarContainer"
  >
    <div
      class="avatar"
      v-tooltip:bottom="settingsState.name"
      :style="user?.photoURL ? { '--avatar-url': `url('${profilePic ?? user.photoURL}')` } : {}"
      :data-name="user?.photoURL ? '' : initials"
      @click="toggleMenu"
    />

    <div v-if="isAuthenticated">
      <div
        v-if="isMenuOpen"
        class="avatar-menu"
      >
        <div
          class="menu-item"
          @click="openProfile"
        >
          {{ t('userProfile') }}
        </div>
        <div
          class="menu-item"
          @click="handleLogout"
        >
          {{ t('signout') }}
        </div>
      </div>
    </div>

    <div v-else>
      <div
        v-if="isMenuOpen"
        class="avatar-menu"
      >
        <div
          class="menu-item"
          @click="openLogin"
        >
          {{ t('login') }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes accordion {
  from {
    transform: scaleY(0);
    opacity: 0;
  }

  to {
    transform: scaleY(1);
    opacity: 1;
  }
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid var(--text);
  background-color: var(--darkPrimary, #333);
  background-image: var(--avatar-url);
  background-size: cover;
  background-position: center;
  cursor: pointer;
  position: relative;
  anchor-name: --avatar;

  &::after {
    content: attr(data-name);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
  }
}

.avatar-menu {
  position: absolute;
  top: calc(anchor(--avatar bottom) + 8px);
  right: anchor(--avatar right);

  background: var(--button);
  border: 1px solid var(--type-btn-color, var(--primary));
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: var(--text);
  border-radius: 4px;
  line-height: 16px;
  font-size: 16px;
  font-family: 'Roboto Condensed', sans-serif;
  padding: 0;
  z-index: 100;
  animation: accordion 0.2s ease-out;
  cursor: pointer;
}

.menu-item {
  line-height: 48px;
  min-width: 160px;
  border: none;
  box-shadow: none;
  outline: none;
  color: var(--text);
  padding: 0 12px;
  cursor: pointer;
  transition:
    background-color 0.2s,
    color 0.2s;

  &:hover {
    background-color: var(--type-dark-color, var(--darkPrimary));
    color: var(--text-inverted);
  }
}
</style>
