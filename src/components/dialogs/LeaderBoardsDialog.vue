<script setup lang="ts">
import { computed } from 'vue';

import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import Leaderboards from '@/components/genSelection/Leaderboards.vue';
import { useCurrentGen } from '@/stores/useCurrentGen.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { useDialogs } from '@/stores/useDialogs.ts';
import { useState } from '@/stores/useState.ts';
import { capitalize } from '@/utils/utils.ts';

const { closeDialog } = useDialogs();
const { state } = useState();
const { getCurrentType } = useCurrentType();
const { getCurrentGen } = useCurrentGen();

const currentGameMode = computed(() => {
  switch (state.gameMode) {
    case 'gen':
      return `${capitalize(getCurrentGen()?.name ?? '')} Quiz`;
    case 'types':
      return `${capitalize(getCurrentType()?.name ?? '')} Quiz`;
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
      <h2>Top 3 {{ currentGameMode }} Guessers</h2>

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
