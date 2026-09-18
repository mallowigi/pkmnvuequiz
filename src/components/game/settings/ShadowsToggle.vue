<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

import RoundedButton from '@/components/common/RoundedButton.vue';
import { useCurrentDex } from '@/composables/useCurrentDex.ts';
import { useDialogs } from '@/stores/useDialogs.ts';
import { useRooms } from '@/stores/useRooms.ts';
import { useState } from '@/stores/useState.ts';

const { state, displayShadows } = useState();
const { setDialog } = useDialogs();
const { showRemainingShadows } = useCurrentDex();
const { t } = useI18n();
const { isOwner } = storeToRefs(useRooms());

const toggle = () => {
  if (!state.withShadows) {
    setDialog('shadows', () => {
      displayShadows();
      showRemainingShadows();
    });
  }
};
</script>

<template>
  <RoundedButton
    v-tooltip="t('shadowsToggleTooltip')"
    class="rad-br-tl shadows-toggle"
    v-game-ended
    :selected="state.withShadows"
    @click="toggle"
    v-if="isOwner"
  >
    {{ t('revealShadows') }}
  </RoundedButton>
</template>

<style scoped>
.shadows-toggle {
  &.selected {
    pointer-events: none;
  }
}
</style>
