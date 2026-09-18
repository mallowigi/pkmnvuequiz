<script setup lang="ts">
import { useImage } from '@vueuse/core';

import { useAttackTypeStyles } from '@/composables/useAttackTypeStyles.ts';
import { useAttackDetails } from '@/stores/useAttackDetails.ts';
import { useDialogs } from '@/stores/useDialogs.ts';

const { attackDetailsState } = useAttackDetails();
const { setDialog } = useDialogs();

const styles = useAttackTypeStyles(attackDetailsState.currentAttack);

const { isReady } = useImage({ src: attackDetailsState.currentAttack?.artwork ?? '' });

const openArtworkDialog = () => {
  if (attackDetailsState.currentAttack?.artwork && isReady.value) {
    setDialog('attackArtwork');
  }
};
</script>

<template>
  <div
    class="pane-header"
    v-if="attackDetailsState.currentAttack"
  >
    <div
      class="artwork-gradient rad-br-tl"
      :style="styles"
    >
      <div class="artwork-container">
        <img
          v-if="attackDetailsState.currentAttack.artwork && isReady"
          :src="attackDetailsState.currentAttack.artwork"
          :alt="attackDetailsState.currentAttack.name"
          class="artwork"
          @click="openArtworkDialog"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.pane-header {
  padding: 4rem 1.5rem 1rem;
  text-align: center;
}

.artwork-gradient {
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--primary-type) 40%, var(--button)) 0%,
    color-mix(in srgb, var(--primary-type) 40%, var(--button)) 100%
  );
  border: 3px solid var(--type-btn-color, var(--primary));
  padding: 1.5rem;
  display: inline-block;
  margin: 0 auto 1rem;
}

.artwork-container {
  min-width: 300px;
  min-height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);

  img {
    border-radius: 20px;
  }

  &:hover {
    transition:
      box-shadow 0.3s ease,
      transform 0.3s ease;
    box-shadow: 0 10px 20px var(--type-btn-color, var(--primary));
    transform: scale(1.05);
  }
}

.artwork {
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
  filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.2));
}
</style>
