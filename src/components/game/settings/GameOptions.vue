<script setup lang="ts">
import GameAbort from '@/components/game/settings/GameAbort.vue';
import GameModeSelection from '@/components/game/settings/GameModeSelection.vue';
import ModeSelection from '@/components/game/settings/ModeSelection.vue';
import ShadowsToggle from '@/components/game/settings/ShadowsToggle.vue';
import ShinyToggle from '@/components/game/settings/ShinyToggle.vue';
import SpellingToggle from '@/components/game/settings/SpellingToggle.vue';
import TimerSelection from '@/components/game/settings/TimerSelection.vue';
import TypeShuffle from '@/components/game/settings/TypeShuffle.vue';
</script>

<template class="root">
  <GameAbort />

  <div class="selection-row">
    <GameModeSelection />

    <TimerSelection />

    <ModeSelection />

    <TypeShuffle />
  </div>

  <div class="selection-row">
    <ShinyToggle />

    <SpellingToggle />

    <ShadowsToggle />
  </div>
</template>

<style scoped>
.selection-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
</style>
