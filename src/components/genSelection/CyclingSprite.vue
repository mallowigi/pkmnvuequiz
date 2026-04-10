<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { usePkmnData } from '@/stores/pkmnStore.js';

const props = defineProps({
  gen: {
    type: Object,
    required: true,
  },
  start: Number,
});

// Load data
const { pkmnData } = usePkmnData();

const sprites = computed(() => {
  const encodings = pkmnData.sprites;
  if (!encodings?.sprite) {
    return [];
  }
  return props.gen.sprites.map(sprite => encodings.sprite[sprite]);
});

// Keep state of the cycle
const currentIndex = ref(props.start ?? 0);
const sprite = computed(() => sprites.value[currentIndex.value]);

// Run interval
let interval;

onMounted(() => {
  if (sprites.value.length === 0) {
    return;
  }

  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % sprites.value.length;
  }, 3000);
});

onUnmounted(() => {
  clearInterval(interval);
});

</script>

<template>
  <img :alt='gen.name'
       :hidden='sprites.length === 0'
       :src='sprite'
       class='sprite cropped'>
</template>

<style scoped>

.sprite {
  margin: -3px -10px 0 0;
  padding-right: 2px;
  float: right;
}

.cropped {
  width: 30px;
  height: 30px;
  object-fit: none;
  object-position: 50% 100%;
}

</style>