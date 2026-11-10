<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import TrophyIcon from '@/components/common/icons/TrophyIcon.vue';
import RoundedBox from '@/components/common/RoundedBox.vue';
import { toRank } from '@/composables/useAchievements.ts';
import { useProfile } from '@/stores/useProfile.ts';
import type { Achievement } from '@/types.ts';

const props = defineProps<{
  achievement: Achievement;
  tier?: number;
}>();

const { t } = useI18n();
const { profileState } = useProfile();

const isNotification = computed(() => {
  return props.tier !== undefined;
});

const tierInfo = computed(() => {
  return props.tier ? props.achievement.getTierInfo(props.tier) : undefined;
});

const title = computed(() => {
  return tierInfo?.value?.name ?? props.achievement.name;
});

const description = computed(() => {
  return tierInfo?.value?.description ?? props.achievement.description;
});

const rank = computed(() => {
  return toRank(props.tier ?? profileState.achievements[props.achievement.id]);
});
</script>

<template>
  <RoundedBox
    class="achievement-box"
    :class="[rank, { compact: isNotification }]"
  >
    <div class="achievement-icon">
      <TrophyIcon />
    </div>

    <div class="achievement-info">
      <h3 class="achievement-title">{{ t(title) }}</h3>

      <p class="achievement-desc">
        <span v-if="!isNotification && achievement.nextStep">{{ t('next') }}:</span> {{ t(description) }}
      </p>

      <meter
        class="achievement-meter"
        v-if="!isNotification && achievement.progress && achievement.nextStep"
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

  &.compact {
    position: relative;
    overflow: hidden;
    height: auto;
    max-height: none;
    gap: 8px;
    padding: 6px 10px;
    max-width: 280px;

    .achievement-info {
      padding: 0;
      align-items: flex-start;
      text-align: left;
    }

    .achievement-title {
      font-size: 13px;
      overflow-wrap: anywhere;
    }

    .achievement-desc {
      font-size: 11px;
      margin: 2px 0 0;
      overflow-wrap: anywhere;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      overflow: hidden;
    }

    .achievement-icon {
      transform: scale(0.75);
    }

    /* Shimmer: a soft highlight sweeping across for as long as the toast is visible */
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(105deg, transparent 35%, rgb(255 255 255 / 0.25) 50%, transparent 65%);
      transform: translateX(-100%);
      animation: shimmer 2s ease-in-out infinite;
      pointer-events: none;
    }
  }

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

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  60%,
  100% {
    transform: translateX(100%);
  }
}
</style>
