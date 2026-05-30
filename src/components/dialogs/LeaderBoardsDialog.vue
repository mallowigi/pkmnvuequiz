<script setup lang="ts">
import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import Leaderboards from '@/components/genSelection/Leaderboards.vue';
import { useDialogs } from '@/stores/useDialogs.ts';

const { closeDialog } = useDialogs();

const cancel = () => {
  closeDialog();
};
</script>

<template>
  <Overlay
    class="overlay"
    @close="cancel"
  >
    <div class="prompt">
      <h2>Top 3 Trainers</h2>

      <Leaderboards />

      <RoundedButton
        @click.stop="cancel"
        primary
      >
        Close
      </RoundedButton>
    </div>
  </Overlay>
</template>

<style scoped>
.overlay {
  z-index: 4;
}

.desc {
  margin-bottom: 10px;
}
</style>
