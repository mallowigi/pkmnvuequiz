<script setup lang="ts">
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useMessages } from '@/stores/useMessages.js';
import { useState } from '@/stores/useState.js';
import { useI18n } from 'vue-i18n';

const { state, toggleShowShinies } = useState();
const { showUserMessage } = useMessages();
const { t } = useI18n();

const toggleShiny = () => {
  toggleShowShinies();
  showUserMessage(t('shinyCharmSet', { status: state.withShinies ? t('enabled') : t('disabled') }));
};
</script>

<template>
  <RoundedButton
    v-tooltip="t('shinyCharmTooltip')"
    class="rad-br-tl shiny-toggle-icon"
    :class="{ selected: state.withShinies }"
    @click="toggleShiny"
  >
    <img
      src="@/assets/shiny.svg"
      :alt="t('shinyCharm')"
    />
  </RoundedButton>
</template>

<style scoped>
.shiny-toggle-icon {
  min-width: 0;
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    width: 35px;
  }

  &:hover {
    background-color: #ff7b9a;
    border-color: #ff7b9a;
  }

  &.selected {
    background-color: var(--type-btn-color);
    border-color: var(--type-btn-color);
  }
}
</style>
