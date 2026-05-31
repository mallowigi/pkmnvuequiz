<script setup lang="ts">
import RoundedBox from '@/components/common/RoundedBox.vue';
import { languages } from '@/data/languages.ts';
import { computed } from 'vue';
import type { Language } from '@/types.ts';
import { useLanguages } from '@/stores/useLanguages.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';

const { languagesState, toggleLanguage } = useLanguages();
const { flowState } = useGameFlow();

const sortedLanguages = computed(() => {
  return Object.values(languages).sort((a, b) => a.index - b.index);
});

const hasLanguage = (id: Language) => {
  return languagesState.languages.has(id);
};
</script>

<template>
  <RoundedBox
    title="Guess Pokemon in other languages"
    v-game-ended
  >
    <div class="selection-content">
      <div
        v-for="language in sortedLanguages"
        :key="language.id"
        :title="language.name"
        class="toggle transition-element"
        @click="toggleLanguage(language.id)"
        :class="{ active: hasLanguage(language.id) }"
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
  border: solid 2px var(--type-btn-color);
  color: var(--type-btn-color);
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
    background: var(--type-btn-color);
    color: var(--type-fg-color);
  }

  &:hover {
    background: var(--type-dark-color);
    border-color: var(--type-dark-color);
    color: var(--type-fg-color);
  }
}
</style>
