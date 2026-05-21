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

const lastPokemon = computed(() => getLastPokemon());

const spriteData = computed(() => {
  const { sprites, shinies } = data;
  const lp = lastPokemon.value;
  if (!lp) {
    return {
      shiny: '',
      sprite: '',
    };
  }

  return {
    shiny: shinies?.[lp.id] ?? '',
    sprite: sprites?.[lp.id] ?? '',
  };
});

const bgImg = computed(() => {
  if (lastPokemon.value) {
    if (spriteData.value.shiny && state.withShinies) return `url(${spriteData.value.shiny})`;
    if (spriteData.value.sprite) return `url(${spriteData.value.sprite})`;
  }
  return `url(${unknownSprite.value})`;
});

const isUnknown = computed(() => !lastPokemon.value || (!spriteData.value.shiny && !spriteData.value.sprite));

const title = computed(() => (lastPokemon.value ? capitalize(lastPokemon.value.baseName) : ''));
</script>

<template>
  <div class="last-pokemon-container">
    <Transition name="morph">
      <div
        :key="lastPokemon?.id ?? 'unknown'"
        class="sprite"
        :class="{ unknown: isUnknown }"
        :title="title"
        :style="{ '--bg-img': bgImg }"
      />
    </Transition>
  </div>
</template>

<style scoped>
.last-pokemon-container {
  width: 28px;
  height: 32px;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

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

.morph-enter-active,
.morph-leave-active {
  transition: all 1s ease-in-out;
}

.morph-leave-active {
  position: absolute;
}

.morph-enter-from,
.morph-leave-to {
  opacity: 0;
  filter: blur(8px);
}
</style>
