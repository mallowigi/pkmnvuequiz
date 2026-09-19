<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import CycleTypesIcon from '@/components/common/icons/CycleTypesIcon.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useMessages } from '@/stores/useMessages.ts';
import { useSettings } from '@/stores/useSettings.ts';

const { settingsState, setCycleTypes } = useSettings();
const { showUserMessage } = useMessages();
const { t } = useI18n();

const toggleCycleTypes = () => {
  const newValue = !settingsState.withCycleTypes;
  setCycleTypes(newValue);
  showUserMessage(t('cycleTypesSet', { status: newValue ? t('enabled') : t('disabled') }));
};
</script>

<template>
  <RoundedButton
    class="cycle-types-toggle rad-br-tl"
    :selected="settingsState.withCycleTypes"
    v-tooltip:top="t('cycleTypesTooltip')"
    v-game-ended
    @click="toggleCycleTypes"
  >
    <CycleTypesIcon />
  </RoundedButton>
</template>

<style scoped>
.cycle-types-toggle {
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
