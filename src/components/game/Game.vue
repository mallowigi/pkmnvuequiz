<script setup lang="ts">
import GameOptions from '@/components/game/GameOptions.vue';
import { useState } from '@/stores/useState';

const { state } = useState();
</script>

<template>
  <div class="game">
    <div style="flex: 1">&nbsp;</div>
    <GameOptions v-if="state.gameMode !== null && !state.isEnded" />
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
