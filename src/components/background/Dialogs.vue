<script setup>

import ChaosDialog from '@/components/dialogs/ChaosDialog.vue';
import { useDialogs } from '@/stores/dialogs.js';

const { dialogs } = useDialogs();

</script>

<template>
  <ChaosDialog v-if='dialogs.showChaos' />

</template>

<style scoped>

</style>