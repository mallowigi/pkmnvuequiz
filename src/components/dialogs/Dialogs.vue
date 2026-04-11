<script setup>

import { useDialogs } from '@/stores/dialogs.js';
import { onMounted } from 'vue';
import ModeDialog from '@/components/dialogs/ModeDialog.vue';

const { dialogs, setDialog } = useDialogs();

onMounted(() => {
  setDialog('normal');
});

const resetDialog = () => setDialog(null);

</script>

<template>

  <ModeDialog :toggle-function='resetDialog'
              mode='chaos'
              caption='Enable guessing without predetermined placements'
              v-if='dialogs.dialog === "chaos"'
  />

  <ModeDialog :toggle-function='resetDialog'
              mode='order'
              caption='Enforce guessing in Pokédex order'
              v-if='dialogs.dialog === "order"'
  />

  <ModeDialog :toggle-function='resetDialog'
              mode='normal'
              caption='Switch to regular quiz with Region Layout'
              v-if='dialogs.dialog === "normal"'
  />

</template>

<style scoped>

</style>