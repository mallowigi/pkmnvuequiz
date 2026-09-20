<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import CarouselVerticalIcon from '@/components/common/icons/CarouselVerticalIcon.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useMessages } from '@/stores/useMessages.ts';
import { useSettings } from '@/stores/useSettings.ts';

const { settingsState, setScrollIntoView } = useSettings();
const { showUserMessage } = useMessages();
const { t } = useI18n();

const toggleScrollIntoView = () => {
  const newValue = !settingsState.withScrollIntoView;
  setScrollIntoView(newValue);
  showUserMessage(t('scrollIntoViewSet', { status: newValue ? t('enabled') : t('disabled') }));
};
</script>

<template>
  <RoundedButton
    class="scroll-toggle rad-br-tl"
    :selected="settingsState.withScrollIntoView"
    v-tooltip:top="t('scrollIntoViewTooltip')"
    v-game-ended
    @click="toggleScrollIntoView"
  >
    <CarouselVerticalIcon />
  </RoundedButton>
</template>

<style scoped>
.scroll-toggle {
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
