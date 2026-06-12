<script setup lang="ts">
import { useAuth } from '@vueuse/firebase';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import Leaderboards from '@/components/start/Leaderboards.vue';
import { useFirebase } from '@/composables/useFirebase.ts';
import { useDialogs } from '@/stores/useDialogs.ts';
import { useSettings } from '@/stores/useSettings.ts';
import ProfilePic from '@/components/header/ProfilePic.vue';

const { closeDialog } = useDialogs();
const { auth } = useFirebase();
const { user } = useAuth(auth);
const { settingsState } = useSettings();

const { t } = useI18n();

const cancel = () => {
  closeDialog();
};

const initials = computed(() => {
  const parts = (settingsState.name || '').trim().split(' ').slice(0, 2);
  return parts
    .map((p) => p[0])
    .join('')
    .toUpperCase();
});
</script>

<template>
  <Overlay
    class="overlay"
    @close="cancel"
  >
    <div class="prompt profile-dialog">
      <h2>{{ t('userProfile') }}</h2>

      <div class="profile-content">
        <!--<div-->
        <!--  class="profile-avatar"-->
        <!--  :style="user?.photoURL ? { '&#45;&#45;avatar-url': `url('${user.photoURL}')` } : {}"-->
        <!--  :data-name="user?.photoURL ? '' : initials"-->
        <!--/>-->

        <ProfilePic
          class="profile-avatar"
          :size="100"
        />

        <h3 class="profile-name">{{ settingsState.name }}</h3>

        <div class="profile-records">
          <h4>{{ t('topPlays', { n: 3 }) }}</h4>

          <Leaderboards
            :uid="user?.uid"
            :gameMode="null"
          />
        </div>
      </div>

      <RoundedButton
        @click.stop="cancel"
        primary
      >
        {{ t('close') }}
      </RoundedButton>
    </div>
  </Overlay>
</template>

<style scoped>
.profile-dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: 600px;
  width: 90%;
}

.profile-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--type-btn-color, var(--primary));
  background-color: var(--darkPrimary, #333);
  background-image: var(--avatar-url);
  background-size: cover;
  background-position: center;
  position: relative;
  margin-bottom: 12px;

  &::after {
    content: attr(data-name);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 32px;
    font-weight: bold;
  }
}

.profile-name {
  font-size: 24px;
  margin: 0 0 24px 0;
  color: var(--text);
}

.profile-records {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-records h4 {
  margin: 0 0 12px 0;
  color: var(--text);
  font-size: 18px;
}

.large-text {
  padding: 6px;
  margin: 1em;
}

.row {
  justify-content: center;
  gap: 8px;
}
</style>
