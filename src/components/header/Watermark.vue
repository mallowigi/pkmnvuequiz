<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import ChartIcon from '@/components/common/icons/ChartIcon.vue';
import CreditsIcon from '@/components/common/icons/CreditsIcon.vue';
import SettingsIcon from '@/components/common/icons/SettingsIcon.vue';
import AvatarMenu from '@/components/header/AvatarMenu.vue';
import LocaleChanger from '@/components/header/LocaleChanger.vue';
import { useCredits } from '@/stores/useCredits.ts';
import { useDialogs } from '@/stores/useDialogs.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';

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
        class="hide-laptop"
        @click="showLeaderBoards"
        v-tooltip:bottom="t('showLeaderBoards')"
      />

      <CreditsIcon
        class="hide-laptop"
        @click="showCredits"
        v-tooltip:bottom="t('showCredits')"
      />

      <SettingsIcon
        class="hide-laptop"
        @click="clickToggleSettings"
        v-tooltip:bottom="t('toggleSettings')"
      />

      <LocaleChanger class="hide-laptop" />

      <AvatarMenu class="hide-laptop" />
    </div>

    <div class="watermark-url hide-laptop">pkmnvuequiz.netlify.app</div>
  </div>
</template>

<style scoped>
.root {
  border-top: 3px dotted var(--type-bg-color, var(--primary));
  position: absolute;
  right: 0;
}

.hide-laptop {
  .desktop & {
    display: none;
  }
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.watermark-url {
  font-size: 20px;
  z-index: 10;
  padding: 4px 10px 10px 40px;
  color: var(--text);
}

.icons {
  padding: 4px;
}
</style>
