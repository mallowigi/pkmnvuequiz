<script setup lang="ts">
import { useAuth } from '@vueuse/firebase';
import { computed } from 'vue';

import { useFirebase } from '@/composables/useFirebase.ts';
import { useSettings } from '@/stores/useSettings.ts';

const { settingsState } = useSettings();
const { auth } = useFirebase();
const { user } = useAuth(auth);

const initials = computed(() => {
  const parts = (settingsState.name || '').trim().split(' ').slice(0, 2);
  return parts
    .map((p) => p[0])
    .join('')
    .toUpperCase();
});

const emits = defineEmits(['clickPicture']);

const toggleMenu = () => {
  emits('clickPicture');
};
</script>

<template>
  <div
    class="avatar"
    v-tooltip:bottom="settingsState.name"
    :style="user?.photoURL ? { '--avatar-url': `url('${user.photoURL}')` } : {}"
    :data-name="user?.photoURL ? '' : initials"
    @click="toggleMenu"
  />
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
</style>
