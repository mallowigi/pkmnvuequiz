<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import AttackArtwork from '@/components/attackdex/attackInfo/AttackArtwork.vue';
import AttackBasicInfo from '@/components/attackdex/attackInfo/AttackBasicInfo.vue';
import AttackProfile from '@/components/attackdex/attackInfo/AttackProfile.vue';
import Overlay from '@/components/common/Overlay.vue';
import MorphTransition from '@/components/common/transitions/MorphTransition.vue';
import SlideInRightTransition from '@/components/common/transitions/SlideInRightTransition.vue';
import { useAttackDetails } from '@/stores/useAttackDetails.ts';

const { attackDetailsState, closeDetails } = useAttackDetails();
const { t } = useI18n();

const isVisible = ref(attackDetailsState.isOpen);

// Restores focus to whatever element opened the pane, so keyboard/AT users aren't stranded.
let previouslyFocusedElement: HTMLElement | null = null;

watch(
  () => attackDetailsState.isOpen,
  (isOpen) => {
    if (isOpen) {
      isVisible.value = true;
      previouslyFocusedElement = document.activeElement as HTMLElement | null;
    } else {
      previouslyFocusedElement?.focus?.();
      previouslyFocusedElement = null;
    }
  },
);

const onAfterLeave = () => {
  isVisible.value = false;
};
</script>

<template>
  <div v-if="isVisible">
    <Overlay
      v-if="attackDetailsState.isOpen"
      class="overlay"
      @close="closeDetails"
    />
    <SlideInRightTransition
      mode="in-out"
      @after-leave="onAfterLeave"
    >
      <aside
        class="details-pane"
        v-if="attackDetailsState.isOpen"
      >
        <MorphTransition mode="out-in">
          <div
            class="details-pane-contents"
            v-if="attackDetailsState.currentAttack"
          >
            <!-- Move Artwork -->
            <AttackArtwork />

            <!-- Name, Type, Category, Region and Description -->
            <AttackBasicInfo />

            <!-- Power, Accuracy, PP and Effect -->
            <AttackProfile />
          </div>

          <div
            class="details-pane-contents loading"
            v-if="attackDetailsState.loading"
          >
            <div class="loader"></div>
            <p>{{ t('loadingDetails') }}</p>
          </div>

          <div
            class="details-pane-contents error"
            v-if="attackDetailsState.error"
          >
            <p>{{ attackDetailsState.error }}</p>
          </div>
        </MorphTransition>

        <button
          class="close-btn"
          @click="closeDetails"
          aria-label="Close"
        >
          ×
        </button>
      </aside>
    </SlideInRightTransition>
  </div>
</template>

<style scoped>
.overlay {
  padding-right: 0;
}

:deep(.overlay-wrapper) {
  justify-content: flex-end;
}

.details-pane {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 5;
  max-width: 400px;
  min-width: 400px;
  height: 100vh;
  color: var(--text);
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  border-left: 2px solid var(--type-btn-color, var(--primary));

  background-image: url(@/assets/background-50-grey.svg);
  background-blend-mode: hard-light;
  background-repeat: no-repeat;
  background-size: 100vw;
  background-position: right bottom;
  background-attachment: scroll;
  background-color: var(--type-bg-color, var(--primary));

  .dark & {
    background-image: url(@/assets/background-dark-grey.svg);
  }

  &:has(.loading),
  &:has(.error) {
    justify-content: center;
  }

  .loading,
  .error {
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2rem;
  }
}

.details-pane-contents {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  gap: 1rem;
}

:deep(.box) {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: center;
  gap: 0.5em;
  margin: 0 1em;
  max-height: initial;
  align-self: stretch;
}

.loader {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: var(--type-btn-color, var(--primary));
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
  justify-self: center;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--text);
  cursor: pointer;
  z-index: 10;
  line-height: 1;
}
</style>
