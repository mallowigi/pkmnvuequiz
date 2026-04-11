<script setup>

import ChaosDialog from '@/components/dialogs/ChaosDialog.vue';
import { useDialogs } from '@/stores/dialogs.js';
import { onMounted } from 'vue';

const { dialogs, toggleShowChaos } = useDialogs();

onMounted(() => {
  toggleShowChaos();
});

</script>

<template>
  <ChaosDialog v-if='dialogs.showChaos' />

</template>

<style scoped>

</style>