<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import RoundedButton from '@/components/common/RoundedButton.vue';
import { useMessages } from '@/stores/useMessages.ts';
import { useSettings } from '@/stores/useSettings.ts';

const { settingsState, toggleShadowHelper } = useSettings();
const { showUserMessage } = useMessages();
const { t } = useI18n();

const toggle = () => {
  toggleShadowHelper();
  showUserMessage(t('shadowHelperSet', { status: settingsState.withShadowHelper ? t('enabled') : t('disabled') }));
};

const tooltipMessage = `${t('shadowHotkeyTooltip', { key: ',' })}`;
</script>

<template>
  <RoundedButton
    class="hotkey-toggle"
    v-tooltip="tooltipMessage"
    v-game-ended
    :selected="settingsState.withShadowHelper"
    @click="toggle"
  >
    <img
      src="@/assets/raichu.png"
      :alt="t('silhouette')"
    />
  </RoundedButton>
</template>

<style scoped>
.hotkey-toggle {
  padding: 9px 14px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  & img {
    margin: -5px;
    width: 52px;
    height: 39px;
    object-fit: none;
    object-position: 50% 100%;
    filter: brightness(0) invert(0.7);
  }

  &.selected {
    & img {
      filter: brightness(0) invert(0.3);
    }
  }

  &:hover {
    & img {
      filter: brightness(0) invert(0.8);
    }
  }
}
</style>
