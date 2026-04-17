<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

const props = defineProps({
  sprites: {
    type: Array,
    required: true,
  },
  start: Number,
});

// Keep state of the cycle
const currentIndex = ref(props.start ?? 0);
const sprite = computed(() => props.sprites[currentIndex.value]);

// Run interval
let interval;

const startCycle = () => {
  if (interval || props.sprites.length === 0) {
    return;
  }

  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % props.sprites.length;
  }, 3000);
};

// Watch until the data is available and restart the interval
watch(
  () => props.sprites,
  () => {
    startCycle();
  },
  { immediate: true },
);

onMounted(() => {
  startCycle();
});

onUnmounted(() => {
  clearInterval(interval);
  interval = null;
});
</script>

<template>
  <img alt="Sprite" :hidden="sprites.length === 0" :src="sprite" class="sprite cropped" />
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
