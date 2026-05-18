<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

import RoundedBox from '@/components/common/RoundedBox.vue';
import Spacer from '@/components/common/Spacer.vue';
import { languages } from '@/data/languages.ts';
import { useLanguages } from '@/stores/useLanguages.ts';
import { usePkmnData } from '@/stores/usePkmnStore.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import type { Language, PokemonInfo, RegionBox, SpecialType } from '@/types.ts';
import { boxes } from '@/data/boxes.ts';
import { specialTypes } from '@/data/specialTypes.ts';
import { useState } from '@/stores/useState.ts';
import { useBoxes } from '@/composables/useBoxes.ts';

const { state } = useState();
const { getCurrentGameModeBoxes, getSpecialBoxes } = useBoxes();
const { getCurrentGameModeBoxPokemon, getSpecialTypePokemon, getStatus } = usePokemons();

const { languagesState, getTranslation } = useLanguages();
const pokemonStore = usePokemons();
const { missed } = storeToRefs(pokemonStore);
const { data } = usePkmnData();

const currentLanguage = ref<Language | null>(
  languagesState.languages.size > 0 ? Array.from(languagesState.languages)[0] : null,
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
  if (state.gameMode !== 'special') {
    const currentGameModeBoxes = getCurrentGameModeBoxes();
    return currentGameModeBoxes?.map((box) => boxes[box]);
  } else {
    const specialGameModeBoxes = getSpecialBoxes();
    return specialGameModeBoxes?.map((box) => specialTypes[box]);
  }
});

const getBoxPokemons = (boxId: SpecialType | RegionBox): PokemonInfo[] => {
  const pokemonByBox = Array.from(missed.value).filter((pokemon) => pokemon.box === boxId);
  return pokemonByBox;
};
</script>

<template>
  <RoundedBox class="root">
    <div class="selection-content">
      <div
        class="accordion"
        @click="toggleAccordion"
      >
        <p>Missed names:</p>
        <i
          class="arrow"
          :class="{ up: isAccordionOpen }"
        ></i>
      </div>

      <Spacer />

      <div
        v-for="language in sortedLanguages"
        :key="language.id"
        :title="language.name"
        class="smolbutton transition-element"
        @click="selectLanguage(language.id)"
        :class="{ active: currentLanguage === language.id }"
      >
        {{ language.symbol }}
      </div>
    </div>

    <div
      class="missed-panel"
      v-show="isAccordionOpen"
    >
      <div
        v-for="box in currentBoxes"
        :key="box.id"
        class="missed-section"
      >
        <div
          v-for="(pokemon, index) in getBoxPokemons(box.id)"
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
  </RoundedBox>
</template>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: initial;
  max-height: initial;
}

.selection-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
}

.smolbutton {
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

.missed-section {
  border-top: 2px dotted var(--type-btn-color, var(--primary));
  padding: 10px;

  display: grid;
  grid-template-columns: repeat(4, 180px);
  gap: 10px;

  & .pokemon {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 18px;
  }

  &:empty {
    display: none;
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
