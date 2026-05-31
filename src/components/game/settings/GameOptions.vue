<script setup lang="ts">
import SlideDownTransition from '@/components/common/transitions/SlideDownTransition.vue';
import AutoPauseToggle from '@/components/game/settings/AutoPauseToggle.vue';
import CycleSpritesToggle from '@/components/game/settings/CycleSpritesToggle.vue';
import GameAbort from '@/components/game/settings/GameAbort.vue';
import GameModeSelection from '@/components/game/settings/GameModeSelection.vue';
import LanguagesSelection from '@/components/game/settings/LanguagesSelection.vue';
import ModeSelection from '@/components/game/settings/ModeSelection.vue';
import MultiplayerInvite from '@/components/game/settings/MultiplayerInvite.vue';
import ShadowHotkeyToggle from '@/components/game/settings/ShadowHotkeyToggle.vue';
import ShadowsToggle from '@/components/game/settings/ShadowsToggle.vue';
import ShinyToggle from '@/components/game/settings/ShinyToggle.vue';
import SoundToggle from '@/components/game/settings/SoundToggle.vue';
import SpellingToggle from '@/components/game/settings/SpellingToggle.vue';
import TimerSelection from '@/components/game/settings/TimerSelection.vue';
import TypeShuffle from '@/components/game/settings/TypeShuffle.vue';
import { useGameFlow } from '@/stores/useGameFlow.ts';

const { flowState } = useGameFlow();
</script>

<template>
  <GameAbort />

  <div class="selection-row">
    <GameModeSelection />

    <TimerSelection />

    <ModeSelection />

    <TypeShuffle />
  </div>

  <SlideDownTransition>
    <div v-if="flowState.isSettingsOpen">
      <div>
        <div class="selection-row">
          <ShinyToggle />

          <SpellingToggle />

          <ShadowsToggle />

          <ShadowHotkeyToggle />

          <CycleSpritesToggle />

          <SoundToggle />

          <AutoPauseToggle />
        </div>

        <div class="selection-row">
          <LanguagesSelection />

          <MultiplayerInvite />
        </div>
      </div>
    </div>
  </SlideDownTransition>
</template>

<style scoped>
.selection-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
</style>
