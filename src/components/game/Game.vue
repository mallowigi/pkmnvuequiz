<script setup lang="ts">
import RegionBoxes from '@/components/game/RegionBoxes.vue';
import GameOptions from '@/components/game/settings/GameOptions.vue';
import { useGameFlow } from '@/stores/useGameFlow';
import { useState } from '@/stores/useState';
import Spacer from '@/components/common/Spacer.vue';
import MissedNames from '@/components/game/MissedNames.vue';
import ExpandTransition from '@/components/common/ExpandTransition.vue';

const { state } = useState();
const { flowState } = useGameFlow();
</script>

<template>
  <div class="game">
    <ExpandTransition>
      <MissedNames v-if="flowState.isGivenUp" />
    </ExpandTransition>

    <RegionBoxes />
    <Spacer />
    <GameOptions v-if="state.gameMode !== null && !flowState.isEnded" />
  </div>
</template>

<style scoped>
.game {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  flex: 1;
}
</style>
