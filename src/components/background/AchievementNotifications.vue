<script setup lang="ts">
import { watch } from 'vue';

import AchievementItem from '@/components/dialogs/AchievementItem.vue';
import { usePlaySounds } from '@/composables/usePlaySounds.ts';
import { useAchievementToasts } from '@/stores/useAchievementToasts.ts';

const { state } = useAchievementToasts();
// useSound only works inside a component, so the sound is triggered here rather than from the store.
const { playAchievement } = usePlaySounds();

watch(
  () => state.achievements.length,
  (length, previous) => {
    if (length > previous) playAchievement();
  },
);
</script>

<template>
  <div class="achievement-notification-container">
    <TransitionGroup>
      <AchievementItem
        v-for="toast in state.achievements"
        :key="toast.uid"
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

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Keyframes live on the -active classes, which last the whole transition */
.v-enter-active {
  animation: slide-in 0.3s ease-out;
}

.v-leave-active {
  animation: slide-in 0.3s ease-in reverse;
}
</style>
