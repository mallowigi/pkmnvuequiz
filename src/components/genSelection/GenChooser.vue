<script setup>
import { gens } from '@/data/gens.js';
import CyclingType from '@/components/genSelection/CyclingType.vue';
import CyclingStarters from '@/components/genSelection/CyclingStarters.vue';
import { useCurrentGen } from '@/stores/gen.js';
import { useState } from '@/stores/state.js';

const { setGameMode } = useState();
const { setCurrentGen } = useCurrentGen();

const setGen = (gen) => {
  setGameMode('gen');
  setCurrentGen(gen);
};

</script>

<template>
  <div class='container'>
    <div class='gens-grid'>

      <!-- Full quiz-->
      <div></div>
      <div class='cell-full'>
        <div class='cell rad-bl-tr'
             @click='setGameMode("full")'>
          Full quiz
        </div>
      </div>
      <div></div>

      <!-- Gens -->
      <div class='cell rad-bl'
           v-for='(gen, i) in gens'
           :class='{ "rad-bl": i % 3 === 0, "rad": i % 3 === 1, "rad-tr": i % 3 === 2 }'
           @click='setGen(gen.id)'
           :key='gen.id'>
        <div hidden>{{ gen.id }}</div>
        <div class='gen-name'>{{ gen.name }}</div>

        <CyclingStarters :gen='gen' :start='i % 3' />
      </div>

      <!-- Types -->
      <div></div>
      <div>
        <CyclingType class='cell cell-type rad-bl-tr ' />
      </div>
      <div></div>

      <div></div>
      <div class='cell rad-bl-tr'
           @click='setGameMode("special")'>
        Special
        <img alt='Special'
             src='/src/assets/special.png'
             class='inverted-symbol'>
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

.inverted-symbol {
  width: 30px;
  filter: brightness(0) invert(1);
}

.gen-name {
  display: inline-block;
}

</style>
