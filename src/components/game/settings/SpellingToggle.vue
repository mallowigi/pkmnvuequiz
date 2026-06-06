<script setup lang="ts">
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useMessages } from '@/stores/useMessages.js';
import { useState } from '@/stores/useState.js';
import { useI18n } from 'vue-i18n';

const { state, toggleSpelling } = useState();
const { showUserMessage } = useMessages();
const { t } = useI18n();

const toggle = () => {
  toggleSpelling();
  showUserMessage(t('spellingHelpSet', { status: state.withSpelling ? t('enabled') : t('disabled') }));
};
</script>

<template>
  <RoundedButton
    v-tooltip="t('spellingHelpTooltip')"
    class="spelling-toggle rad-br-tl"
    @click="toggle"
    v-game-ended
    :class="{ selected: state.withSpelling }"
  >
    {{ t('spellingHelp') }}
    <img
      src="@/assets/spellcheck.png"
      :alt="t('spellingHelp')"
    />
  </RoundedButton>
</template>

<style scoped>
.spelling-toggle {
  padding: 9px 14px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  & img {
    height: 28px;
  }

  &:hover {
    background-color: var(--type-dark-color);
    border-color: var(--type-dark-color);
  }

  &.selected {
    background-color: var(--type-btn-color);
    border-color: var(--type-btn-color);
    color: var(--type-fg-color);
  }
}
</style>
