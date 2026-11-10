<script setup lang="ts">
import AchievementItem from '@/components/dialogs/AchievementItem.vue';
import { useAchievementToasts } from '@/stores/useAchievementToasts.ts';

const { state } = useAchievementToasts();
</script>

<template>
  <div class="achievement-notification-container">
    <TransitionGroup>
      <AchievementItem
        v-for="toast in state.achievements"
        :key="`${toast.achievement.id}-${toast.tier}`"
        :achievement="toast.achievement"
        :tier="toast.tier"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.achievement-notification-container {
  --bronze: #cd7f32;
  --silver: #c0c0c0;
  --gold: #ffd700;
  --platinum: #e5e4e2;
  --normal: var(--type-btn-color, var(--primary));
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
