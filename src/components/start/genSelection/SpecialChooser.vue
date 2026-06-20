<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import RoundedButton from '@/components/common/RoundedButton.vue';
import { useQuiz } from '@/composables/useQuiz.js';
import { useCurrentType } from '@/stores/useCurrentType';
import { useGameFlow } from '@/stores/useGameFlow.js';

const { setGameSelectionState } = useGameFlow();
const { getSpecialType, getMegaType } = useCurrentType();
const { setTypeOrSpecial } = useQuiz();
const { t } = useI18n();

const specialType = computed(() => getSpecialType());

const megaType = computed(() => getMegaType());

const goBack = () => {
  setGameSelectionState('gen');
};
</script>

<template>
  <div class="type-grid">
    <!-- Special -->
    <RoundedButton
      class="button-type special"
      @click="setTypeOrSpecial('special')"
      :style="{ '--bgColor': specialType.bgColor, '--fgColor': '#fff' }"
    >
      <img
        :src="`/assets/types/${specialType.icon}.svg`"
        :alt="t('special')"
        class="symbol"
      />
      <div class="type-name">{{ t('special') }}</div>
    </RoundedButton>

    <RoundedButton
      class="button-type mega"
      @click="setTypeOrSpecial('mega')"
      :style="{ '--bgColor': megaType.bgColor, '--fgColor': '#fff' }"
    >
      <img
        :src="`/assets/types/${megaType.icon}.svg`"
        :alt="t('mega')"
        class="symbol"
      />
      <div class="type-name">{{ t('mega') }}</div>
    </RoundedButton>

    <RoundedButton
      class="button-type back"
      @click="goBack"
      :style="{ '--bgColor': '#111', '--fgColor': '#fff' }"
    >
      <div class="type-name">{{ t('back') }}</div>
    </RoundedButton>
  </div>
</template>

<style scoped>
.type-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 2px;

  .mobile & {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, auto);
    grid-auto-flow: row;
  }
}

.button-type {
  background-color: var(--bgColor);
  color: var(--fgColor);
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

  .mobile & {
    border-radius: 6px;
  }

  &.special {
    grid-row: 1;
    grid-column: 1;
  }

  &.mega {
    grid-row: 1;
    grid-column: 2;
  }

  &.back {
    grid-row: 2;
    grid-column: 2;
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

  .mobile & {
    display: none;
  }

  .mobile .button-back & {
    display: inline-block;
  }
}
</style>
