<script setup lang="ts">
import { computed } from 'vue';
import { usePokemons } from '@/stores/usePokemons.ts';
import { useState } from '@/stores/useState.ts';
import type { RegionBoxInfo, SpecialTypeInfo } from '@/types.ts';

const { state } = useState();
const { getGenPokemon, getSpecialTypePokemon } = usePokemons();

type Props = {
  box: RegionBoxInfo;
  type: 'gen';
} | {
  box: SpecialTypeInfo;
  type: 'special';
};

const props = defineProps<Props>();

const unknownSprite = computed(() => {
  switch (state.isDark) {
    case true:
      return '/src/assets/sprites/unknown-2.png';
    case false:
      return '/src/assets/sprites/unknown.png';
  }
});
</script>

<template>
  <section
    class="container"
    :class="{ full: state.gameMode === 'full' }"
  >
    <div
      v-if="props.type === 'gen'"
      v-for="pokemon in getGenPokemon(props.box.id)"
      :key="pokemon.id"
    >
      <img
        class="sprite"
        :src="unknownSprite"
        alt="Unknown Pokemon"
      />
    </div>

    <div
      v-else-if="props.type === 'special'"
      v-for="pokemon in getSpecialTypePokemon(props.box.id)"
      :key="pokemon.id"
    >
      <img
        class="sprite"
        :src="unknownSprite"
        alt="Unknown Pokemon"
      />
    </div>
  </section>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  width: 100%;
  height: 100%;

  &.full {
    gap: 0;
  }
}

.sprite {
  margin: -25px -20px -10px -10px;
  width: 64px;
  height: 56px;
  object-fit: none;
  object-position: 100% 0;
}
</style>
