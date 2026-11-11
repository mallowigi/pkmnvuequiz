<script setup lang="ts">
import { AnimatePresence, motion, type PanInfo } from 'motion-v';
import { computed, ref, useTemplateRef, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import AchievementItem from '@/components/dialogs/AchievementItem.vue';
import AchievementTabs from '@/components/dialogs/AchievementTabs.vue';
import { useAchievements } from '@/composables/useAchievements.ts';
import { useAchievementTabs } from '@/composables/useAchievementTabs.ts';
import { useDialogs } from '@/stores/useDialogs.ts';
import type { AchievementCategory } from '@/types.ts';

const { closeDialog } = useDialogs();
const { t } = useI18n();

const { achievements } = useAchievements();
const { activeTab, setTab } = useAchievementTabs();

const dialogContentRef = useTemplateRef<HTMLElement>('dialogContentRef');

const visibleAchievements = computed(() =>
  Object.values(achievements)
    .filter((achievement) => achievement.category === activeTab.value)
    .sort((a, b) => a.priority - b.priority),
);

const TAB_ORDER: AchievementCategory[] = ['total', 'game', 'pokemon', 'counters', 'timer', 'misc'];
const direction = ref<number>(1);

const nextTab = () => {
  const currentIndex = TAB_ORDER.indexOf(activeTab.value);
  if (currentIndex < TAB_ORDER.length - 1) {
    setTab(TAB_ORDER[currentIndex + 1]);
  }
};

const prevTab = () => {
  const currentIndex = TAB_ORDER.indexOf(activeTab.value);
  if (currentIndex > 0) {
    setTab(TAB_ORDER[currentIndex - 1]);
  }
};

const SWIPE_THRESHOLD = 50;

const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
  const offset = info.offset.x;
  const velocity = info.velocity.x;

  if (offset < -SWIPE_THRESHOLD || velocity < -500) {
    nextTab();
  } else if (offset > SWIPE_THRESHOLD || velocity > 500) {
    prevTab();
  }
};

watch(activeTab, (newTab, oldTab) => {
  const newIdx = TAB_ORDER.indexOf(newTab);
  const oldIdx = TAB_ORDER.indexOf(oldTab);
  direction.value = newIdx >= oldIdx ? 1 : -1;

  if (dialogContentRef.value) {
    dialogContentRef.value.scrollTop = 0;
  }
});

const gridVariants = {
  center: {
    x: 0,
  },
  enter: (dir: number) => ({
    x: dir > 0 ? 999 : -999,
  }),
  exit: (dir: number) => ({
    x: dir > 0 ? -999 : 999,
  }),
};
</script>

<template>
  <Overlay
    class="overlay"
    @close="closeDialog"
  >
    <div class="prompt achievements-dialog">
      <h2 class="dialog-title">{{ t('achievements') }}</h2>

      <AchievementTabs class="dialog-tabs" />

      <div
        ref="dialogContentRef"
        class="dialog-content"
      >
        <AnimatePresence
          :initial="false"
          :custom="direction"
          mode="wait"
        >
          <motion.div
            :key="activeTab"
            :custom="direction"
            :variants="gridVariants"
            initial="enter"
            animate="center"
            exit="exit"
            :transition="{ duration: 0.25, ease: 'easeInOut' }"
            drag="x"
            :drag-constraints="{ left: 0, right: 0 }"
            :drag-elastic="0.2"
            @drag-end="handleDragEnd"
            class="achievements-grid"
          >
            <AchievementItem
              :key="achievement.id"
              v-for="achievement in visibleAchievements"
              :achievement="achievement"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <RoundedButton
        class="dialog-close-btn"
        @click.stop="closeDialog"
        primary
      >
        {{ t('close') }}
      </RoundedButton>
    </div>
  </Overlay>
</template>

<style scoped>
.achievements-dialog {
  --bronze: #cd7f32;
  --silver: #c0c0c0;
  --gold: #ffd700;
  --platinum: #e5e4e2;
  --normal: var(--type-btn-color, var(--primary));

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 800px;
  width: 95%;
  height: min(80vh, 680px);
}

.dialog-title,
.dialog-tabs,
.dialog-close-btn {
  flex-shrink: 0;
}

.dialog-title {
  margin: 0;
  color: white;
  font-size: 22px;
}

.dialog-content {
  flex: 1;
  min-height: 0;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  align-content: start;
  gap: 1em;
  padding: 4px;
  width: 100%;

  .mobile & {
    grid-template-columns: 1fr;
  }
}

.achievement-progress {
  font-size: small;
  color: var(--text);
  line-height: 1;
}
</style>
