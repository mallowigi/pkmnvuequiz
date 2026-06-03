<script setup lang="ts">
import ChartIcon from '@/components/common/icons/ChartIcon.vue';
import UserIcon from '@/components/common/icons/UserIcon.vue';
import SettingsIcon from '@/components/common/icons/SettingsIcon.vue';
import { useDialogs } from '@/stores/useDialogs.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import CreditsIcon from '@/components/common/icons/CreditsIcon.vue';
import { useCredits } from '@/stores/useCredits.ts';
import LocaleChanger from '@/components/header/LocaleChanger.vue';

const { setDialog } = useDialogs();
const { toggleSettings } = useGameFlow();
const { toggleShowCredits } = useCredits();

const showLeaderBoards = () => {
  setDialog('leaderboards');
};

const showChangeNameDialog = () => {
  setDialog('changeName');
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
        v-tooltip:bottom="'Show Leaderboards'"
      />

      <UserIcon
        @click="showChangeNameDialog"
        v-tooltip:bottom="'Change Name'"
      />

      <SettingsIcon
        @click="clickToggleSettings"
        v-tooltip:bottom="'Toggle Settings'"
      />

      <CreditsIcon
        @click="showCredits"
        v-tooltip:bottom="'Show Credits'"
      />

      <LocaleChanger />
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
