<script setup lang="ts">
import SettingsIcon from '@/components/common/icons/SettingsIcon.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import DarkModeToggle from '@/components/header/DarkModeToggle.vue';
import GameTimer from '@/components/header/GameTimer.vue';
import PokemonCounts from '@/components/header/PokemonCounts.vue';
import PokemonInput from '@/components/header/PokemonInput.vue';
import Watermark from '@/components/header/Watermark.vue';
import { useGameFlow } from '@/stores/useGameFlow.ts';

const { toggleSettings } = useGameFlow();

const openSettings = () => {
  toggleSettings();
};
</script>

<template>
  <header class="header">
    <section class="controls">
      <div class="header-row first">
        <DarkModeToggle class="dark-mode-toggle" />

        <PokemonInput class="pokemon-input" />
      </div>

      <div class="header-row second">
        <!-- Counts -->
        <PokemonCounts />

        <!-- Timer -->
        <GameTimer />

        <!-- Settings -->
        <RoundedButton
          class="settings"
          primary
          @click="openSettings"
        >
          <SettingsIcon />
        </RoundedButton>
      </div>
    </section>

    <Watermark />
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
}

.header-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  .mobile & {
    justify-content: center;
    width: 100%;
  }
}

.controls {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  flex-wrap: wrap;
}

.settings {
  display: block;
  min-width: 0;
  margin: 0;

  * {
    color: var(--type-fg-color, var(--text));
    stroke: var(--type-fg-color, var(--text));
  }
}
</style>
