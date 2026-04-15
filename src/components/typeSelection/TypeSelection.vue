<script setup>

import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { types } from '@/data/types.js';
import { useCurrentType } from '@/stores/currentType.js';
import { useState } from '@/stores/state.js';

const { setCurrentType } = useCurrentType();
const { setGen } = useState();

const selectType = (type) => {
  setGen(type);
  setCurrentType(type);
};

</script>

<template>
  <Overlay>
    <div class='prompt type-grid'>
      <RoundedButton
          v-for='typeMeta in types'
          :key='typeMeta.id'
          class='button-type'
          @click='() => selectType(typeMeta.id)'
          :style='{ backgroundColor: typeMeta.bgColor, color: typeMeta.fgColor }'
      >
        <img :src='`/src/assets/types/${typeMeta.icon}.svg`'
             :alt='typeMeta.name'
             class='symbol'>
        <div hidden>{{ typeMeta.symbol }}</div>
        <div class='type-name'>{{ typeMeta.name }}</div>
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
  border: 2px solid #333;
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