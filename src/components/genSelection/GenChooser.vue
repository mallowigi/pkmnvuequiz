<script setup>
import { useState } from '@/stores/state.js';
import { gens } from '@/data/gens.js';

const { setGen, state } = useState();
</script>

<template>
  <h2>Gen: {{ state.gen }}</h2>

  <div class='playtext' id='playtext'>
    <div class='gens-grid'>
      <div></div>
      <div class='padfull'>
        <div class='pad rad-bl-tr green'
             @click='setGen("full")'>Full quiz
        </div>
      </div>
      <div></div>

      <div class='pad rad-bl green'
           v-for='(gen, i) in gens'
           :class='{ "rad-bl": i % 3 === 0, "rad": i % 3 === 1, "rad-tr": i % 3 === 2 }'
           @click='setGen(gen.id)'
           :key='gen.id'>
        <div class='hidden'>{{ gen.id }}</div>
        <div class='inline-block'>{{ gen.name }}</div>
        <img :alt='gen.name'
             :src='gen.sprite'
             class='sprite cropped'>
      </div>

      <div></div>
      <div>
        <div class='pad rad-bl-tr green'
             @click='setGen("types")'>
          Types <img alt='Start' src='@/assets/types/ICE.svg' class='inverted-symbol'>
        </div>
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

.sprite {
  margin: -3px -10px 0 0;
  padding-right: 2px;
  float: right;
}

.cropped {
  width: 30px;
  height: 30px;
  object-fit: none;
  object-position: 50% 100%;
}

.inverted-symbol {
  width: 42px;
  margin: -5px -12px -15px 8px;
  filter: brightness(0) invert(1);
}
</style>
