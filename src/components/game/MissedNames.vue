<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import RoundedBox from '@/components/common/RoundedBox.vue';
import Spacer from '@/components/common/Spacer.vue';
import MissedNamesTransition from '@/components/common/transitions/MissedNamesTransition.vue';
import { useBoxes } from '@/composables/useBoxes.ts';
import { useTranslations } from '@/composables/useTranslations.ts';
import { boxes } from '@/data/boxes.ts';
import { languages } from '@/data/languages.ts';
import { specialTypes } from '@/data/specialTypes.ts';
import { useLanguages } from '@/stores/useLanguages.ts';
import { usePkmnData } from '@/stores/usePkmnStore.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import { useSettings } from '@/stores/useSettings.ts';
import { useState } from '@/stores/useState.ts';
import type { Language, PokemonInfo, RegionBox, SpecialType } from '@/types.ts';

const { state } = useState();
const { getCurrentGameModeBoxes, getSpecialBoxes, getMegaBoxes } = useBoxes();
const { t } = useI18n();
const { getLanguageTranslation } = useTranslations();
const { getTranslation } = useLanguages();
const { settingsState } = useSettings();
const pokemonStore = usePokemons();
const { missed } = storeToRefs(pokemonStore);
const { data } = usePkmnData();

const currentLanguage = ref<Language | null>(
  settingsState.languages.size > 0 ? Array.from(settingsState.languages)[0] : null,
);
const isAccordionOpen = ref(false);

const sortedLanguages = computed(() => {
  return Object.values(languages).sort((a, b) => a.index - b.index);
});

const selectLanguage = (id: Language) => {
  currentLanguage.value = id;
};

const toggleAccordion = () => {
  isAccordionOpen.value = !isAccordionOpen.value;
};

const pokemonSprite = (pokemonId: string) => {
  return data.sprites?.[pokemonId] ?? '';
};

const currentBoxes = computed(() => {
  switch (state.gameMode) {
    case 'special':
      return getSpecialBoxes()?.map((box) => specialTypes[box]);
    case 'mega':
      return getMegaBoxes()?.map((box) => boxes[box]);
    default:
      return getCurrentGameModeBoxes()?.map((box) => boxes[box]);
  }
});

const getBoxPokemons = (boxId: SpecialType | RegionBox): PokemonInfo[] => {
  return Array.from(missed.value).filter((pokemon) => pokemon.box === boxId);
};
</script>

<template>
  <h1 class="gameover">{{ t('gameOver') }}</h1>

  <h2 class="gameover">{{ t('thanksForPlaying') }}</h2>

  <RoundedBox
    class="root"
    :class="state.gameMode"
  >
    <div class="selection-content">
      <div
        class="accordion"
        @click="toggleAccordion"
      >
        <span class="hide-mobile">{{ t('missedNames') }}</span>
        <i
          class="arrow"
          :class="{ up: isAccordionOpen }"
        ></i>
      </div>

      <Spacer />

      <div
        v-for="language in sortedLanguages"
        :key="language.id"
        v-tooltip:bottom="getLanguageTranslation(language.id)"
        class="toggle transition-element"
        @click="selectLanguage(language.id)"
        :class="{ active: currentLanguage === language.id }"
      >
        {{ language.symbol }}
      </div>
    </div>

    <MissedNamesTransition>
      <div
        class="missed-panel"
        :class="{ single: currentBoxes.length === 1 }"
        v-show="isAccordionOpen"
      >
        <div
          v-for="box in currentBoxes"
          :key="box.id"
          class="missed-section"
        >
          <div
            v-for="pokemon in getBoxPokemons(box.id)"
            :key="pokemon.id"
            class="pokemon"
          >
            <div
              :style="{ '--bg-img': `url(${pokemonSprite(pokemon.id)})` }"
              class="sprite"
            />
            {{ getTranslation(pokemon, currentLanguage) }}
          </div>
        </div>
      </div>
    </MissedNamesTransition>
  </RoundedBox>
</template>

<style scoped>
.gameover {
  font-weight: bold;
  margin: 0;
  line-height: 2;
  align-self: center;
  color: var(--text);
}

.root {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: initial;
  max-height: initial;
  align-self: stretch;
  margin: 10px;
  max-width: var(--max-width);
  columns: var(--col-width, auto) var(--num-cols, auto);

  &.types,
  &.full {
    --max-width: none;
    --num-cols: auto;
    --col-width: 25vh;
    --sprite-width: 57px;
    --text-padding: 0;
  }

  &.special {
    --max-width: 66%;
    --num-cols: 2;
    --sprite-width: 62px;
    --text-padding: 10px;
  }

  &.gen {
    --max-width: 66%;
    --num-cols: 1;
    --sprite-width: 64px;
    --text-padding: 10px;
  }

  .laptop & {
    max-width: 100%;
    columns: 1;
  }
}

.selection-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
}

.toggle {
  border: solid 2px var(--type-btn-color);
  color: var(--type-btn-color);
  border-radius: 6px 3px 6px 3px;
  text-align: center;
  text-decoration: none;
  padding: 6px 4px 4px 3px;
  vertical-align: middle;
  line-height: 16px;
  cursor: pointer;
  font-size: 12px;
  font-family: 'Roboto Condensed', sans-serif;

  &.active {
    background: var(--type-btn-color);
    color: var(--type-fg-color);
  }

  &:hover {
    background: var(--type-dark-color);
    border-color: var(--type-dark-color);
    color: var(--type-fg-color);
  }
}

.accordion {
  padding-left: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: baseline;
  gap: 14px;
}

.arrow {
  border: solid var(--type-btn-color, var(--primary));
  border-width: 0 5px 5px 0;
  display: inline-block;
  padding: 4px;
  border-radius: 2px;
  transform: rotate(45deg);
  transition: transform 0.2s ease;

  &.up {
    transform: rotate(-135deg);
    position: relative;
    top: 3px;
  }
}

.missed-panel {
  overflow: hidden;
  column-count: 2;
  column-gap: 1em;
  width: 100%;

  &.single > .missed-section {
    column-span: all;
    width: 100%;
    min-width: 800px;

    .mobile & {
      min-width: 0;
    }
  }
}

.missed-panel.single {
  column-span: all;
}

.missed-section {
  break-inside: avoid;
  border: 2px dotted var(--type-btn-color, var(--primary));
  border-radius: 13px;
  padding: 10px;
  margin-bottom: 1em;
  overflow: auto;
  max-height: 500px;
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-template-rows: 36px;
  gap: 10px;
  align-items: flex-start;
  overscroll-behavior: contain;

  & .pokemon {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 18px;
  }

  &:empty {
    display: none;
  }

  .mobile & {
    grid-template-columns: repeat(2, auto);
  }
}

.sprite {
  --bg-img: none;
  width: 28px;
  height: 32px;
  overflow: visible;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 44px;
    height: 44px;
    background-image: var(--bg-img);
    background-size: auto;
    background-position: bottom center;
  }
}
</style>
