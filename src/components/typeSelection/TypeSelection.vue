<script setup>

import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { types } from '@/data/types.js';
import { useState } from '@/stores/state.js';

const { setCurrentType } = useState();
</script>

<template>
  <Overlay>
    <div class='prompt type-grid'>
      <RoundedButton
          v-for='type in types'
          class='button-type'
          @click='setCurrentType(type.id)'
          :style='{ backgroundColor: type.bgColor, color: type.fgColor }'
      >
        <img :src='`/src/assets/types/${type.icon}.svg`'
             :alt='type.name'
             class='symbol'>
        <div hidden>{{ type.symbol }}</div>
        <div class='type-name'>{{ type.name }}</div>
      </RoundedButton>
    </div>
  </Overlay>
</template>

<style scoped>
.type-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  flex-direction: column;
}

.button-type {
  border: 2px solid var(--text);
  border-radius: 35px 5px 15px 35px;
  padding: 14px 20px;
  margin: 3px 1px;
  font-size: 18px;
  min-width: 80px;

  &:hover {
    border-color: white;
  }
}

.symbol {
  filter: brightness(0) invert(1);
  width: 42px;
  margin: 0 -5px -10px -5px;
}

.type-name {
  display: inline-block;
  min-width: 65px;
  padding: 5px 0 5px 15px;
  margin: 0 -5px 0 0;
  vertical-align: top;
}
</style>