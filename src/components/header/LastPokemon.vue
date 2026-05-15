<script setup lang="ts">
import { useUnknownSprite } from '@/composables/useUnknownSprite.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import { computed } from 'vue';
import { usePkmnData } from '@/stores/usePkmnStore.ts';
import { useState } from '@/stores/useState.ts';
import { capitalize } from '@/utils/utils.ts';

const { state } = useState();
const { unknownSprite } = useUnknownSprite();
const { getLastPokemon } = usePokemons();
const { data } = usePkmnData();

type SpriteData = {
  shiny: string;
  sprite: string;
};

const spriteData = computed<SpriteData>(() => {
  const { sprites, shinies } = data;
  const lastPokemon = getLastPokemon();
  if (!lastPokemon) {
    return {
      shiny: '',
      sprite: '',
    };
  }

  return {
    shiny: shinies?.[lastPokemon.id] ?? '',
    sprite: sprites?.[lastPokemon.id] ?? '',
  };
});

const lastPokemon = computed(() => getLastPokemon());
</script>

<template>
  <div v-if="lastPokemon">
    <div
      v-if="spriteData.shiny && state.withShinies"
      class="sprite"
      :title="capitalize(lastPokemon.baseName)"
      :style="{ '--bg-img': `url(${spriteData.shiny})` }"
    />

    <div
      v-else-if="spriteData.sprite"
      class="sprite"
      :title="capitalize(lastPokemon.baseName)"
      :style="{ '--bg-img': `url(${spriteData.sprite})` }"
    />

    <div
      v-else
      class="sprite unknown"
      :title="capitalize(lastPokemon.baseName)"
      :style="{ '--bg-img': `url(${unknownSprite})` }"
    />
  </div>

  <div
    v-else
    class="sprite unknown"
    :style="{ '--bg-img': `url(${unknownSprite})` }"
  />
</template>

<style scoped>
.sprite {
  width: 28px;
  height: 32px;
  overflow: visible;
  position: relative;

  &.unknown {
    z-index: 0;
  }

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
    pointer-events: none;
    z-index: 10;
  }
}
</style>
