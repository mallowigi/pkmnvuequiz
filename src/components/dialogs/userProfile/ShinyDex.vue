<script setup lang="ts">
import { useAsyncState } from '@vueuse/core';
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import RoundedBox from '@/components/common/RoundedBox.vue';
import FadeTransition from '@/components/common/transitions/FadeTransition.vue';
import MorphTransition from '@/components/common/transitions/MorphTransition.vue';
import MorphTransitionGroup from '@/components/common/transitions/MorphTransitionGroup.vue';
import { usePkmnDetails } from '@/stores/usePkmnDetails.ts';
import { usePkmnData } from '@/stores/usePkmnStore.ts';
import { useProfile } from '@/stores/useProfile.ts';

const { profileState } = useProfile();
const { fetchPokemon, displayPokemonDetails } = usePkmnDetails();
const { findPokemon } = usePkmnData();
const { t } = useI18n();

const fetchShinies = async () => {
  const shinyDex = profileState.shinyDex;
  if (!shinyDex) {
    return [];
  }

  let promises = await Promise.all(
    Object.keys(shinyDex).map(async (key) => {
      const pokemonInfo = findPokemon(key);
      if (!pokemonInfo) {
        return undefined;
      }

      const pkmnDetails = await fetchPokemon(pokemonInfo, { shiny: true });
      if (!pkmnDetails) {
        return undefined;
      }

      return {
        artwork: pkmnDetails.artwork || '',
        id: Number(pkmnDetails.dexNum || key),
        name: pkmnDetails.baseName || key,
        pokemonInfo,
      };
    }),
  );
  return promises.filter(Boolean).sort((a, b) => {
    if (!a || !b) return 0;
    return a.id - b.id;
  });
};

const { state: shinies, isLoading } = useAsyncState(fetchShinies, null, { immediate: true });
</script>

<template>
  <div
    v-if="isLoading"
    class="loading"
  >
    {{ t('loadingDetails') }}
  </div>

  <div
    v-else-if="!shinies?.length"
    class="empty"
  >
    {{ t('noShiniesFound') }}
  </div>

  <MorphTransitionGroup
    class="shiny-grid"
    v-else
    appear
  >
    <div
      class="shiny-card"
      v-for="shiny in shinies"
      :key="shiny?.id"
      @click="shiny?.pokemonInfo && displayPokemonDetails(shiny?.pokemonInfo)"
    >
      <img
        v-tooltip="shiny?.name"
        v-if="shiny?.artwork"
        class="shiny-artwork"
        :src="shiny?.artwork"
        :alt="shiny?.name"
        loading="lazy"
      />
    </div>
  </MorphTransitionGroup>
</template>

<style scoped>
.shiny-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 8px;
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  padding: 4px;
}

.shiny-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.5);
  }
}

.shiny-artwork {
  width: 80px;
  height: 80px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25));
}

.shiny-name {
  font-size: 11px;
  margin-top: 4px;
  text-align: center;
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
</style>
