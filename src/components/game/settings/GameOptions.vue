<script setup lang="ts">
import RoundedButton from '@/components/common/RoundedButton.vue';
import GameAbort from '@/components/game/settings/GameAbort.vue';
import GameModeSelection from '@/components/game/settings/GameModeSelection.vue';
import ModeSelection from '@/components/game/settings/ModeSelection.vue';
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

    <RoundedButton class="rad-br-tl transition-element">
      Shadows
      <img
        src="@/assets/raichu.png"
        alt="silhouette"
      />
    </RoundedButton>
  </div>
</template>

<style scoped>
.selection-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
</style>
