<script setup lang="ts">
import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import Leaderboards from '@/components/genSelection/Leaderboards.vue';
import { useDialogs } from '@/stores/useDialogs.ts';
import { useState } from '@/stores/useState.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { useCurrentGen } from '@/stores/useCurrentGen.ts';
import { computed } from 'vue';
import { capitalize } from '@/utils/utils.ts';

const { closeDialog } = useDialogs();
const { state } = useState();
const { currentTypeState } = useCurrentType();
const { currentGenState } = useCurrentGen();

const currentGameMode = computed(() => {
  switch (state.gameMode) {
    case 'gen':
      return `Gen ${capitalize(currentGenState.gen!)} Quiz`;
    case 'types':
      return `Types ${capitalize(currentTypeState.currentType!)} Quiz`;
    case 'special':
      return 'Special Quiz';
    default:
      return 'Full Quiz';
  }
});

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
      <h2>Top 3 {{ currentGameMode }} Trainers</h2>

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
