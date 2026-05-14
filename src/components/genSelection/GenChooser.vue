<script setup lang="ts">
import CyclingStarters from '@/components/genSelection/CyclingStarters.vue';
import CyclingType from '@/components/genSelection/CyclingType.vue';
import { gens } from '@/data/gens';
import { useCurrentGen } from '@/stores/useCurrentGen';
import { useGameFlow } from '@/stores/useGameFlow';
import { useState } from '@/stores/useState';
import type { Gen } from '@/types.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { usePokemons } from '@/stores/usePokemons.ts';

const { setStarted, setGameSelectionState } = useGameFlow();
const { setGameMode } = useState();
const { setCurrentGen, clearCurrentGen } = useCurrentGen();
const { clearCurrentType } = useCurrentType();
const { resetPokemonState } = usePokemons();

const setFullQuiz = () => {
  setGameMode('full');
  clearCurrentGen();
  clearCurrentType();
  resetPokemonState();
  setStarted(true);
};

const setGen = (gen: Gen) => {
  setGameMode('gen');
  clearCurrentType();
  setCurrentGen(gen);
  resetPokemonState();
  setStarted(true);
};

const setType = () => {
  clearCurrentGen();
  clearCurrentType();
  resetPokemonState();
  setGameSelectionState('types');
};
</script>

<template>
  <div class="container">
    <div class="gens-grid">
      <!-- Full quiz-->
      <div></div>
      <div class="cell-full">
        <div
          class="cell rad-bl-tr"
          @click="setFullQuiz"
        >
          Full quiz
        </div>
      </div>
      <div></div>

      <!-- Gens -->
      <div
        class="cell rad-bl"
        v-for="(gen, id, i) in gens"
        :class="{ 'rad-bl': i % 3 === 0, rad: i % 3 === 1, 'rad-tr': i % 3 === 2 }"
        @click="setGen(id as Gen)"
        :key="id"
      >
        <div hidden>{{ id }}</div>
        <div class="gen-name">{{ gen.name }}</div>

        <CyclingStarters
          :gen="gen"
          :start="i % 3"
        />
      </div>

      <!-- Types -->
      <div></div>
      <div>
        <CyclingType
          class="cell cell-type rad-bl-tr"
          @click="setType"
        />
      </div>
      <div></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}

.gens-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(120px, 1fr));
  gap: 6px;
  margin: 3px;
  text-align: center;
}

.cell {
  background: var(--primary);
  color: white;
  padding: 16px 20px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  min-height: 30px;
  line-height: 30px;
  font-size: 18px;
  min-width: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    opacity: 0.9;
  }
}

.cell-full {
  padding: 16px 0 8px;
}

.cell-type {
  padding: 10px 20px;
}

.gen-name {
  display: inline-block;
}
</style>
