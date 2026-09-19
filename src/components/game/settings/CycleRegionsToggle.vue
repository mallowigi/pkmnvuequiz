<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import CycleRegionsIcon from '@/components/common/icons/CycleRegionsIcon.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useMessages } from '@/stores/useMessages.ts';
import { useSettings } from '@/stores/useSettings.ts';

const { settingsState, setCycleRegions } = useSettings();
const { showUserMessage } = useMessages();
const { t } = useI18n();

const toggleCycleRegions = () => {
  const newValue = !settingsState.withCycleRegions;
  setCycleRegions(newValue);
  showUserMessage(t('cycleRegionsSet', { status: newValue ? t('enabled') : t('disabled') }));
};
</script>

<template>
  <RoundedButton
    class="cycle-regions-toggle rad-br-tl"
    :selected="settingsState.withCycleRegions"
    v-tooltip:top="t('cycleRegionsTooltip')"
    v-game-ended
    @click="toggleCycleRegions"
  >
    <CycleRegionsIcon />
  </RoundedButton>
</template>

<style scoped>
.cycle-regions-toggle {
  min-width: 0;
  padding: 9px 14px 8px;
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
