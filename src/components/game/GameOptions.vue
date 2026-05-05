<script setup lang="ts">
import GameAbort from '@/components/game/GameAbort.vue';
import GameModeSelection from '@/components/game/GameModeSelection.vue';
import ModeSelection from '@/components/game/ModeSelection.vue';
import TimerSelection from '@/components/game/TimerSelection.vue';
import TypeShuffle from '@/components/game/TypeShuffle.vue';
</script>

<template class="root">
  <GameAbort />

  <div class="selection-row">
    <GameModeSelection />

    <TimerSelection />

    <ModeSelection />

    <TypeShuffle />
  </div>
</template>

<style scoped>
.selection-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
</style>
