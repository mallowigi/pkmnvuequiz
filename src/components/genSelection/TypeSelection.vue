<script setup>
import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { types } from '@/data/types.js';
import { useCurrentType } from '@/stores/useCurrentType.js';
import { useState } from '@/stores/useState.js';

const { setGameMode } = useState();
const { setCurrentType } = useCurrentType();

const setTypeOrSpecial = (type) => {
  switch (type) {
    case 'special':
      setGameMode('special');
      break;
    default:
      setCurrentType(type);
  }
};

const goBack = () => setGameMode(null);
</script>

<template>
  <Overlay>
    <div class="prompt type-grid">
      <RoundedButton
        v-for="typeMeta in types"
        :key="typeMeta.id"
        class="button-type"
        @click="setTypeOrSpecial(typeMeta.id)"
        :style="{ backgroundColor: typeMeta.bgColor, color: typeMeta.fgColor }"
      >
        <img
          :src="`/src/assets/types/${typeMeta.icon}.svg`"
          :alt="typeMeta.name"
          class="symbol"
        />
        <div hidden>{{ typeMeta.symbol }}</div>
        <div class="type-name">{{ typeMeta.name }}</div>
      </RoundedButton>

      <div></div>

      <RoundedButton
        class="button-type button-back"
        @click="goBack"
      >
        <div class="type-name">Back</div>
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
