<script setup lang="ts">
import { useAchievementTabs } from '@/composables/useAchievementTabs.ts';
import type { AchievementCategory } from '@/types.ts';
import { scrollToTop } from '@/utils/utils.ts';

const { activeTab, setTab, tabs } = useAchievementTabs();

const onSelectTab = (tabId: AchievementCategory) => {
  setTab(tabId);
  scrollToTop();
};
</script>

<template>
  <div class="tabs">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      type="button"
      class="tab-btn"
      :class="{ active: activeTab === tab.id }"
      @click="onSelectTab(tab.id)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<style scoped>
.tabs {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  overflow-x: auto;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  max-width: 100%;
  padding: 8px;
  border-radius: 12px;
  background: var(--full-overlay);
}

.tab-btn {
  padding: 8px 16px;
  background: var(--button);
  border: none;
  border-radius: 20px;
  color: var(--text);
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;

  &:hover {
    background: var(--button-hover);
    color: white;
  }

  &.active {
    background: var(--type-btn-color, var(--primary));
    color: white;
  }

  &:focus-visible {
    outline: 3px solid var(--primary);
    outline-offset: 3px;
  }
}
</style>
