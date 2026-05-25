<script setup lang="ts">
import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useGameFlow } from '@/stores/useGameFlow';
import SaveButtons from '@/components/background/SaveButtons.vue';

const { resumeGame } = useGameFlow();

const resume = () => resumeGame();
</script>

<template>
  <Overlay
    class="full-overlay"
    @close="resume"
  >
    <div class="prompt">
      <h2 class="left-margin">Paused</h2>

      <RoundedButton
        :primary="true"
        @click.stop="resume"
      >
        Resume
      </RoundedButton>

      <SaveButtons />
    </div>
  </Overlay>
</template>

<style scoped>
.full-overlay {
  z-index: 10;
  --overlay-bg: var(--full-overlay);
}

.left-margin {
  margin-left: 10px;
}
</style>
