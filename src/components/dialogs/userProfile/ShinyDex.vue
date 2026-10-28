<script setup lang="ts">
import { useAsyncState } from '@vueuse/core';
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import RoundedBox from '@/components/common/RoundedBox.vue';
import { usePkmnDetails } from '@/stores/usePkmnDetails.ts';
import { usePkmnData } from '@/stores/usePkmnStore.ts';
import { useProfile } from '@/stores/useProfile.ts';

const { profileState } = useProfile();
const { fetchPokemon } = usePkmnDetails();
const { findPokemon } = usePkmnData();

const fetchShinies = async () => {
  const shinyDex = profileState.shinyDex;
  if (!shinyDex) {
    return [];
  }

  return Promise.all(
    Object.keys(shinyDex).map(async (key) => {
      const pokemonInfo = findPokemon(key);
      if (!pokemonInfo) {
        return {
          artwork: '',
          id: key,
          name: key,
        };
      }

      const pkmnDetails = await fetchPokemon(pokemonInfo, { shiny: true });
      return {
        artwork: pkmnDetails?.artwork || '',
        id: key,
        name: pkmnDetails?.baseName || key,
      };
    }),
  );
};

const { state } = useAsyncState(fetchShinies, null, { immediate: true });
</script>

<template>
  <div class="profile-stats">
    <div
      v-for="shiny in state"
      :key="shiny.id"
    >
      <RoundedBox class="stat">
        <div class="stat-label">{{ shiny.name }}</div>
        <img
          class="stat-value"
          :src="shiny.artwork"
          alt="shiny.name"
        />
      </RoundedBox>
    </div>
  </div>
</template>

<style scoped>
.profile-stats {
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  gap: 0;
  margin-bottom: 12px;
}

.attack-dex-wins {
  grid-column: span 2;
  border-radius: 3px 3px 20px 20px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  max-height: initial;
  opacity: 0.8;

  .mobile & {
    padding: 8px;
  }
}

.stat-label {
  font-size: 14px;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 2px;

  .mobile & {
    font-size: 11px;
    letter-spacing: 1px;
    line-height: 1.4;
  }
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: var(--type-btn-color, var(--primary));

  .mobile & {
    font-size: 20px;
  }
}
</style>
