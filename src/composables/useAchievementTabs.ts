import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type { AchievementCategory } from '@/types.ts';

type TabInfo = {
  id: AchievementCategory;
  label: string;
};

// Shared across all consumers so the tabs and the dialog stay in sync
const activeTab = ref<AchievementCategory>('total');

export const useAchievementTabs = () => {
  const { t } = useI18n();

  const tabs = computed<TabInfo[]>(() => [
    { id: 'total', label: t('lifetime') },
    { id: 'game', label: t('inGame') },
    { id: 'timer', label: t('time') },
    { id: 'pokemon', label: t('pokemon') },
    { id: 'counters', label: t('counters') },
    { id: 'misc', label: t('misc') },
  ]);

  const setTab = (tab: AchievementCategory) => {
    activeTab.value = tab;
  };

  return {
    activeTab,
    setTab,
    tabs,
  };
};
