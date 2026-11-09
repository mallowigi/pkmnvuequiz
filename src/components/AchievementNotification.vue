<script setup lang="ts">
import AchievementItem from '@/components/dialogs/AchievementItem.vue';
import { useAchievementToasts } from '@/stores/useAchievementToasts.ts';

const { state } = useAchievementToasts();
</script>

<template>
  <div class="achievement-notification-container">
    <TransitionGroup>
      <AchievementItem
        :key="achievement.id"
        v-for="achievement in state.achievements"
        :achievement="achievement"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.achievement-notification-container {
  position: fixed;
  top: anchor(--watermark-url bottom, 3rem);
  right: 8px;
  z-index: 9998;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;

  .mobile & {
    top: auto;
    bottom: 16px;
    right: 16px;
    left: 16px;
  }
}

.achievement-notification {
  --bronze: #cd7f32;
  --silver: #c0c0c0;
  --gold: #ffd700;
  --platinum: #e5e4e2;
  --achievement-color: var(--normal);
  --normal: var(--type-btn-color, var(--primary));

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 8px;
  border: 2px solid var(--achievement-color);
  background: linear-gradient(
    135deg,
    var(--button) 0%,
    color-mix(in srgb, var(--achievement-color) 25%, var(--button)) 25%,
    var(--button) 50%,
    color-mix(in srgb, var(--achievement-color) 25%, var(--button)) 75%,
    var(--button) 100%
  );
  max-width: 320px;
  pointer-events: auto;

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

.achievement-icon {
  flex-shrink: 0;

  :deep(svg) {
    fill: var(--achievement-color);
  }
}

.achievement-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;

  .achievement-title {
    margin: 0;
    line-height: 1.2;
    font-size: 14px;
    color: var(--text);
  }

  .achievement-desc {
    font-size: 12px;
    line-height: 1.4;
    margin: 4px 0 0;
    color: var(--text);
    opacity: 0.8;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.rank-badge {
  flex-shrink: 0;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: var(--achievement-color);
  color: var(--button);
}

/* Transition animations */
.v-enter-active,
.v-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
