<script setup lang="ts">
import CycleSpritesToggle from '@/components/game/settings/CycleSpritesToggle.vue';
import GameAbort from '@/components/game/settings/GameAbort.vue';
import GameModeSelection from '@/components/game/settings/GameModeSelection.vue';
import ModeSelection from '@/components/game/settings/ModeSelection.vue';
import ShadowHotkeyToggle from '@/components/game/settings/ShadowHotkeyToggle.vue';
import ShadowsToggle from '@/components/game/settings/ShadowsToggle.vue';
import ShinyToggle from '@/components/game/settings/ShinyToggle.vue';
import SoundToggle from '@/components/game/settings/SoundToggle.vue';
import SpellingToggle from '@/components/game/settings/SpellingToggle.vue';
import TimerSelection from '@/components/game/settings/TimerSelection.vue';
import TypeShuffle from '@/components/game/settings/TypeShuffle.vue';
import LanguagesSelection from '@/components/game/settings/LanguagesSelection.vue';
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

    <ShadowHotkeyToggle />

    <CycleSpritesToggle />

    <SoundToggle />
  </div>

  <div class="selection-row">
    <LanguagesSelection />
  </div>
</template>

<style scoped>
.selection-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
</style>
