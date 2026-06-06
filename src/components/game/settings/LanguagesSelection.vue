<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import RoundedBox from '@/components/common/RoundedBox.vue';
import { languages } from '@/data/languages.ts';
import { useLanguages } from '@/stores/useLanguages.ts';
import type { LanguageInfo } from '@/types.ts';
import { useMessages } from '@/stores/useMessages.ts';
import { useTranslations } from '@/composables/useTranslations.ts';

const { languagesState, toggleLanguage } = useLanguages();
const { t } = useI18n();
const { showUserMessage } = useMessages();
const { getLanguageTranslation } = useTranslations();

const sortedLanguages = computed(() => {
  return Object.values(languages).sort((a, b) => a.index - b.index);
});

const hasLanguage = (language: LanguageInfo) => {
  return languagesState.languages.has(language.id);
};

const setLanguage = (language: LanguageInfo, value: boolean) => {
  if (hasLanguage(language) === value) return;

  toggleLanguage(language.id);
  showUserMessage(
    t('languageSet', { lang: getLanguageTranslation(language.id), status: value ? t('enabled') : t('disabled') }),
  );
};
</script>

<template>
  <RoundedBox
    v-tooltip="t('languagesTooltip')"
    v-game-ended
  >
    <div class="selection-content">
      <div
        v-for="language in sortedLanguages"
        :key="language.id"
        v-tooltip="getLanguageTranslation(language.id)"
        class="toggle transition-element"
        @click="setLanguage(language, !hasLanguage(language))"
        :class="{ active: hasLanguage(language) }"
      >
        {{ language.symbol }}
      </div>
    </div>
  </RoundedBox>
</template>

<style scoped>
.selection-content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
}

.toggle {
  border: solid 2px var(--type-btn-color, var(--primary));
  color: var(--type-btn-color, var(--primary));
  border-radius: 6px 3px 6px 3px;
  text-align: center;
  text-decoration: none;
  padding: 6px 4px 4px 3px;
  vertical-align: middle;
  line-height: 16px;
  cursor: pointer;
  font-size: 12px;
  font-family: 'Roboto Condensed', sans-serif;

  &.active {
    background: var(--type-btn-color, var(--primary));
    color: var(--type-fg-color, var(--text));
  }

  &:hover {
    background: var(--type-dark-color, var(--darkPrimary));
    border-color: var(--type-dark-color, var(--darkPrimary));
    color: var(--type-fg-color, var(--text));
  }
}
</style>
