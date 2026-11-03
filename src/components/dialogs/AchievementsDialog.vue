<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import TrophyIcon from '@/components/common/icons/TrophyIcon.vue';
import Overlay from '@/components/common/Overlay.vue';
import RoundedBox from '@/components/common/RoundedBox.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useAchievements } from '@/composables/useAchievements.ts';
import { useDialogs } from '@/stores/useDialogs.ts';
import { useProfile } from '@/stores/useProfile.ts';

const { closeDialog } = useDialogs();
const { t } = useI18n();

const { achievements } = useAchievements();
const { profileState } = useProfile();
</script>

<template>
  <Overlay
    class="overlay"
    @close="closeDialog"
  >
    <div class="prompt achievements-dialog">
      <h2 class="dialog-title">{{ t('achievements') }}</h2>

      <div class="dialog-content">
        <!-- Achievements grid will go here -->
        <RoundedBox
          class="achievement-box"
          :class="profileState.achievements[achievement.id]"
          v-for="achievement in achievements"
          :key="achievement.id"
        >
          <div class="achievement-icon">
            <TrophyIcon />
          </div>

          <div class="achievement-info">
            <h3 class="achievement-title">{{ t(achievement.name) }}</h3>
            <p class="achievement-desc">{{ t(achievement.description) }}</p>
            <meter
              v-if="achievement.progress && achievement.nextStep"
              :value="achievement.progress"
              :min="0"
              :max="achievement.nextStep"
            />
          </div>
        </RoundedBox>
      </div>

      <RoundedButton
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

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 800px;
  width: 95%;
}

.dialog-title {
  margin: 0;
  color: white;
  font-size: 22px;
}

.dialog-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5em;
  width: 100%;
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
  border: 2px solid var(--type-btn-color, var(--primary));

  &.bronze {
    --achievement-color: var(--bronze);
  }
  &.silver {
    --achievement-color: var(--silver);
  }
  &.gold {
    --achievement-color: var(--gold);
  }
  &.platinum {
    --achievement-color: var(--platinum);
  }

  &.bronze {
    border-color: var(--achievement-color);
    background: linear-gradient(
      135deg,
      var(--button) 0%,
      color-mix(in srgb, var(--achievement-color) 25%, var(--button)) 25%,
      var(--button) 50%,
      color-mix(in srgb, var(--achievement-color) 25%, var(--button)) 75%,
      var(--button) 100%
    );
  }
}

.achievement-info {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;
  margin: 0;
  min-width: 0;
  gap: 8px;

  .achievement-title {
    margin: 0;
    line-height: 1.2;
    font-size: 1em;
  }

  .achievement-desc {
    margin: 0;
    font-size: small;
    line-height: 1.4;
  }
}

.achievement-icon {
  :deep(svg) {
    fill: var(--achievement-color);
  }
}
</style>
