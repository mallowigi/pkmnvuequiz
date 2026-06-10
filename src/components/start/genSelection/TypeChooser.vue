<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import RoundedButton from '@/components/common/RoundedButton.vue';
import { useQuiz } from '@/composables/useQuiz.js';
import { useTranslations } from '@/composables/useTranslations.js';
import { typesList } from '@/data/pokemonTypes';
import { useCurrentType } from '@/stores/useCurrentType';
import { useGameFlow } from '@/stores/useGameFlow.js';

const { setGameSelectionState } = useGameFlow();
const { getSpecialType } = useCurrentType();
const { setTypeOrSpecial } = useQuiz();
const { getTypeTranslation, getSpecialTypeTranslation } = useTranslations();
const { t } = useI18n();

const specialType = computed(() => getSpecialType());

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
      <div class="type-name">{{ getTypeTranslation(typeMeta.id) }}</div>
    </RoundedButton>

    <!-- Special -->
    <RoundedButton
      class="button-type button-special"
      @click="setTypeOrSpecial('special')"
      :style="{ backgroundColor: specialType.bgColor, color: specialType.fgColor }"
    >
      <img
        :src="`/assets/types/${specialType.icon}.svg`"
        :alt="specialType.name"
        class="symbol"
      />
      <div class="type-name">{{ getSpecialTypeTranslation(specialType.id) }}</div>
    </RoundedButton>

    <RoundedButton
      class="button-type button-back"
      @click="goBack"
    >
      <div class="type-name">{{ t('back') }}</div>
    </RoundedButton>
  </div>
</template>

<style scoped>
.type-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(7, auto);
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 2px;
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

.button-special {
  grid-row: 7;
  grid-column: 1;
}

.button-back {
  grid-row: 7;
  grid-column: 2;
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
