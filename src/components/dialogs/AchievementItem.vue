<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import TrophyIcon from '@/components/common/icons/TrophyIcon.vue';
import RoundedBox from '@/components/common/RoundedBox.vue';
import { toRank } from '@/composables/useAchievements.ts';
import { useProfile } from '@/stores/useProfile.ts';
import type { Achievement } from '@/types.ts';

defineProps<{
  achievement: Achievement;
}>();

const { t } = useI18n();
const { profileState } = useProfile();
</script>

<template>
  <RoundedBox
    class="achievement-box"
    :class="toRank(profileState.achievements[achievement.id])"
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
</template>

<style scoped>
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

  &.bronze,
  &.silver,
  &.gold,
  &.platinum {
    opacity: 1;
  }

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
</style>
