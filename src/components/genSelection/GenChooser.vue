<script setup>
import { useState } from '@/stores/state.js';
import { gens } from '@/data/gens.js';
import CyclingType from '@/components/genSelection/CyclingType.vue';
import CyclingStarters from '@/components/genSelection/CyclingStarters.vue';

const { setGen } = useState();
</script>

<template>
  <div class='playtext' id='playtext'>
    <div class='gens-grid'>

      <!-- Full quiz-->
      <div></div>
      <div class='padfull'>
        <div class='pad rad-bl-tr green'
             @click='setGen("full")'>
          Full quiz
        </div>
      </div>
      <div></div>

      <!-- Gens -->
      <div class='pad rad-bl green'
           v-for='(gen, i) in gens'
           :class='{ "rad-bl": i % 3 === 0, "rad": i % 3 === 1, "rad-tr": i % 3 === 2 }'
           @click='setGen(gen.id)'
           :key='gen.id'>
        <div hidden>{{ gen.id }}</div>
        <div class='inline-block'>{{ gen.name }}</div>

        <CyclingStarters :gen='gen' :start='i % 3' />
      </div>

      <!-- Types -->
      <div></div>
      <div>
        <CyclingType />
      </div>
      <div></div>

    </div>
  </div>
</template>

<style scoped>
.playtext {
  opacity: 1;
  display: flex;
  justify-content: center;
}

.gens-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  margin: 3px;
  text-align: center;
}

.pad {
  color: white;
  padding: 14px 20px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  min-height: 30px;
  line-height: 30px;
  font-size: 18px;
  min-width: 80px;
}

</style>
