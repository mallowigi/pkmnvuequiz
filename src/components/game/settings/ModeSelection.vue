<script setup lang="ts">
import { computed } from 'vue';

import RoundedBox from '@/components/common/RoundedBox.vue';
import SegmentButton from '@/components/common/SegmentButton.vue';
import { useDialogs } from '@/stores/useDialogs.js';
import { useGameFlow } from '@/stores/useGameFlow.js';
import { usePokemons } from '@/stores/usePokemons.ts';
import { useState } from '@/stores/useState.js';
import { useTimer } from '@/stores/useTimer.ts';
import type { Mode } from '@/types.js';
import { scrollToTop } from '@/utils/utils.ts';

const { state, setMode } = useState();
const { flowState } = useGameFlow();
const { setDialog } = useDialogs();
const { resetPokemonState } = usePokemons();
const { resetTimer } = useTimer();

const applyMode = (mode: Mode) => {
  if (state.mode === mode) return;

  if (!flowState.isStarted) {
    setMode(mode);
    return;
  }
  setDialog(mode, () => {
    setMode(mode);
    resetPokemonState();
    resetTimer();
    scrollToTop();
  });
};

const isDisabled = computed(
  () => flowState.isGivenUp || flowState.isEnded || state.withTypeShuffle || state.mode !== 'normal',
);
</script>

<template>
  <RoundedBox :class="{ disabled: isDisabled }">
    <SegmentButton
      :active="{
        left: state.mode === 'chaos',
        center: state.mode === 'normal',
        right: state.mode === 'order',
      }"
      @click:left="applyMode('chaos')"
      @click:center="applyMode('normal')"
      @click:right="applyMode('order')"
    >
      <template #prefix> Mode: </template>

      <template #left>
        <span title="Chaos Mode: Find Pokemon in any order, without predefined placements">Chaos</span>
      </template>

      <template #center>
        <span title="Regular Mode: Find Pokemon in any order with predefined placements">Regular</span>
      </template>

      <template #right>
        <span title="Dex Order Mode: Find Pokemon in Pokedex order">Dex Order</span>
      </template>
    </SegmentButton>
  </RoundedBox>
</template>

<style scoped></style>
