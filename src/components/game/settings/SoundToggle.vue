<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import VolumeIcon from '@/components/common/icons/VolumeIcon.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useMessages } from '@/stores/useMessages.ts';
import { useSettings } from '@/stores/useSettings.ts';

const { settingsState, setSound } = useSettings();
const { showUserMessage } = useMessages();
const { t } = useI18n();

const toggleSound = () => {
  const newValue = !settingsState.withSound;
  setSound(newValue);
  showUserMessage(t('soundSet', { status: newValue ? t('enabled') : t('disabled') }));
};
</script>

<template>
  <RoundedButton
    class="sound-toggle rad-br-tl"
    :selected="settingsState.withSound"
    v-game-ended
    v-tooltip:top="t('soundTooltip')"
    @click="toggleSound"
  >
    <VolumeIcon />
  </RoundedButton>
</template>

<style scoped>
.sound-toggle {
  padding: 9px 14px 8px;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
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
      filter: brightness(0) invert(1);
    }
  }
}
</style>
