<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import ChartIcon from '@/components/common/icons/ChartIcon.vue';
import CreditsIcon from '@/components/common/icons/CreditsIcon.vue';
import SettingsIcon from '@/components/common/icons/SettingsIcon.vue';
import LocaleChanger from '@/components/header/LocaleChanger.vue';
import { useCredits } from '@/stores/useCredits.ts';
import { useDialogs } from '@/stores/useDialogs.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import Avatar from '@/components/header/Avatar.vue';

const { setDialog } = useDialogs();
const { toggleSettings } = useGameFlow();
const { toggleShowCredits } = useCredits();
const { t } = useI18n();

const showLeaderBoards = () => {
  setDialog('leaderboards');
};

const clickToggleSettings = () => {
  toggleSettings();
};

const showCredits = () => {
  toggleShowCredits();
};
</script>

<template>
  <div class="root row">
    <div class="icons row">
      <ChartIcon
        @click="showLeaderBoards"
        v-tooltip:bottom="t('showLeaderBoards')"
      />

      <CreditsIcon
        @click="showCredits"
        v-tooltip:bottom="t('showCredits')"
      />

      <SettingsIcon
        @click="clickToggleSettings"
        v-tooltip:bottom="t('toggleSettings')"
      />

      <LocaleChanger />

      <Avatar />
    </div>

    <div class="url">pkmnvuequiz.netlify.app</div>
  </div>
</template>

<style scoped>
.root {
  border-top: 3px dotted var(--type-bg-color, var(--primary));
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.url {
  font-size: 20px;
  z-index: 10;
  padding: 4px 0 10px 40px;
  color: var(--text);
}
</style>
