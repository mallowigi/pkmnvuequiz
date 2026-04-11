<script setup>
import { usePkmnData } from '@/stores/pkmnStore.js';
import { onMounted } from 'vue';

const {
        data,
        setLoaded,
        loadPokemons,
        loadSprites,
        loadNamings,
        loadSpriteCycles,
        loadTranslations,
      } = usePkmnData();

onMounted(() => {
  Promise.all([
    loadPokemons(),
    loadSprites(),
    loadSpriteCycles(),
    loadTranslations(),
    loadNamings(),
  ])
      .then(() => {
        setLoaded(true);
      })
      .catch((error) => {
        console.error('Error loading data:', error);
        setError('Error loading data:', error);
      });
});
</script>

<template>
  <div v-if='!data.isLoaded'>
    <div class='loader' id='loader'>
      <h2>Loading Quiz</h2>
    </div>
    <div class='lds-ellipsis' id='spinner'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style scoped>

@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}

@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}

.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: var(--primary);
    animation-timing-function: cubic-bezier(0, 1, 1, 0);

    &:nth-child(1) {
      left: 8px;
      animation: lds-ellipsis1 0.6s infinite;
    }

    &:nth-child(2) {
      left: 8px;
      animation: lds-ellipsis2 0.6s infinite;
    }

    &:nth-child(3) {
      left: 32px;
      animation: lds-ellipsis2 0.6s infinite;
    }

    &:nth-child(4) {
      left: 56px;
      animation: lds-ellipsis3 0.6s infinite;
    }
  }
}
</style>