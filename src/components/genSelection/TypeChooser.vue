<script setup lang="ts">
import { computed } from 'vue';

import RoundedButton from '@/components/common/RoundedButton.vue';
import { typesList } from '@/data/pokemonTypes';
import { useCurrentGen } from '@/stores/useCurrentGen.ts';
import { useCurrentType } from '@/stores/useCurrentType';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useState } from '@/stores/useState';
import type { Type } from '@/types.ts';
import { usePokemons } from '@/stores/usePokemons.ts';

const { setStarted, setGameSelectionState } = useGameFlow();
const { setGameMode } = useState();
const { setCurrentType, clearCurrentType, getSpecialType } = useCurrentType();
const { clearCurrentGen } = useCurrentGen();
const { resetPokemonState } = usePokemons();

const specialType = computed(() => getSpecialType());

const setTypeOrSpecial = (type: string) => {
  clearCurrentGen();
  switch (type) {
    case 'special':
      setGameMode('special');
      clearCurrentType();
      resetPokemonState();
      break;
    default:
      setGameMode('types');
      setCurrentType(type as Type);
      resetPokemonState();
  }
  setGameSelectionState(null);
  setStarted(true);
};

const goBack = () => {
  setGameSelectionState('gen');
};
</script>

<template>
  <div class="type-grid">
    <!--Types -->
    <RoundedButton
      v-for="typeMeta in typesList"
      :key="typeMeta.id"
      class="button-type"
      @click="setTypeOrSpecial(typeMeta.id)"
      :style="{ backgroundColor: typeMeta.bgColor, color: typeMeta.fgColor }"
    >
      <img
        :src="`/assets/types/${typeMeta.icon}.svg`"
        :alt="typeMeta.name"
        class="symbol"
      />
      <div hidden>{{ typeMeta.symbol }}</div>
      <div class="type-name">{{ typeMeta.name }}</div>
    </RoundedButton>

    <!-- Special -->
    <RoundedButton
      class="button-type"
      @click="setTypeOrSpecial('special')"
      :style="{ backgroundColor: specialType.bgColor, color: specialType.fgColor }"
    >
      <img
        :src="`/assets/types/${specialType.icon}.svg`"
        :alt="specialType.name"
        class="symbol"
      />
      <div class="type-name">{{ specialType.name }}</div>
    </RoundedButton>

    <RoundedButton
      class="button-type button-back"
      @click="goBack"
    >
      <div class="type-name">Back</div>
    </RoundedButton>
  </div>
</template>

<style scoped>
.type-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  flex-direction: column;
}

.button-type {
  border: 2px solid #333;
  border-radius: 35px 5px 15px 35px;
  padding: 14px 20px;
  font-size: 18px;
  min-width: 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;

  &:hover {
    border-color: white;
  }
}

.symbol {
  filter: brightness(0) invert(1);
  width: 42px;
}

.type-name {
  display: inline-block;
  min-width: 65px;
  vertical-align: top;
}
</style>
