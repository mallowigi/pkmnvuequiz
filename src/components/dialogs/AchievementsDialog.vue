<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import TrophyIcon from '@/components/common/icons/TrophyIcon.vue';
import Overlay from '@/components/common/Overlay.vue';
import RoundedBox from '@/components/common/RoundedBox.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import AchievementTabs from '@/components/dialogs/AchievementTabs.vue';
import { useAchievements } from '@/composables/useAchievements.ts';
import { useAchievementTabs } from '@/composables/useAchievementTabs.ts';
import { useDialogs } from '@/stores/useDialogs.ts';
import { useProfile } from '@/stores/useProfile.ts';

const { closeDialog } = useDialogs();
const { t } = useI18n();

const { achievements, checkAchievements, toRank } = useAchievements();
const { profileState } = useProfile();
const { activeTab } = useAchievementTabs();

const dialogContentRef = useTemplateRef<HTMLElement>('dialogContentRef');
const firstTime = ref(true);

const visibleAchievements = computed(() =>
  Object.values(achievements)
    .filter((achievement) => achievement.category === activeTab.value)
    .sort((a, b) => a.priority - b.priority),
);

watch(activeTab, () => {
  if (dialogContentRef.value) {
    dialogContentRef.value.scrollTop = 0;
  }
});

onMounted(() => {
  if (firstTime.value) {
    checkAchievements();
    firstTime.value = false;
  }
});
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
        <!-- Achievements grid will go here -->
        <RoundedBox
          class="achievement-box"
          :class="toRank(profileState.achievements[achievement.id])"
          v-for="achievement in visibleAchievements"
          :key="achievement.id"
        >
          <div class="achievement-icon">
            <TrophyIcon />
          </div>

          <div class="achievement-info">
            <h3 class="achievement-title">{{ t(achievement.name) }}</h3>

            <p class="achievement-desc">
              <span v-if="achievement.nextStep">{{ t('next') }}:</span> {{ t(achievement.description) }}
            </p>

            <meter
              class="achievement-meter"
              v-if="achievement.progress && achievement.nextStep"
              :value="achievement.progress"
              :min="0"
              :max="achievement.nextStep"
              :data-label="`${achievement.progress} / ${achievement.nextStep}`"
            />
          </div>
        </RoundedBox>
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
  height: min(80vh, 650px);
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-content: start;
  gap: 1em;
  padding: 4px;

  .mobile & {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) and (min-width: 481px) {
  .dialog-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .dialog-content {
    grid-template-columns: 1fr;
  }
}

.achievement-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  max-height: 8em;
  height: 8em;
  opacity: 0.6;
  --achievement-color: var(--normal);
  border-color: var(--achievement-color);
  background: linear-gradient(
    135deg,
    var(--button) 0%,
    color-mix(in srgb, var(--achievement-color) 25%, var(--button)) 25%,
    var(--button) 50%,
    color-mix(in srgb, var(--achievement-color) 25%, var(--button)) 75%,
    var(--button) 100%
  );

  &.bronze {
    --achievement-color: var(--bronze);
    opacity: 1;
  }
  &.silver {
    --achievement-color: var(--silver);
    opacity: 1;
  }
  &.gold {
    --achievement-color: var(--gold);
    opacity: 1;
  }
  &.platinum {
    --achievement-color: var(--platinum);
    opacity: 1;
  }
}

.achievement-info {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;
  margin: 0;
  padding: 4px;
  min-width: 0;

  .achievement-title {
    margin: 0;
    line-height: 1.2;
    font-size: 14px;
  }

  .achievement-desc {
    font-size: 12px;
    line-height: 1.4;
    margin: 1em 0 0;
    line-clamp: 3;
  }
}

.achievement-meter {
  height: 12px;
  border-radius: 4px;
  background: none;
  margin: 0.5em 0;
  width: 100%;
  position: relative;

  &::-webkit-meter-bar {
    background: none;
    background-color: var(--text);
    border-radius: 4px;
  }

  &::-webkit-meter-optimum-value {
    background: none;
    background-color: var(--achievement-color);
    -webkit-transition: width 0.5s;
    transition: width 0.5s;
  }

  &::after {
    content: attr(data-label);
    position: absolute;
    top: 4px;
    right: 0;
    font-size: small;
  }
}

.achievement-icon {
  :deep(svg) {
    fill: var(--achievement-color);
  }
}

.achievement-progress {
  font-size: small;
  color: var(--text);
  line-height: 1;
}
</style>
