<script setup lang="ts">
import ChangeTimerDialog from '@/components/dialogs/ChangeTimerDialog.vue';
import GiveUpDialog from '@/components/dialogs/GiveUpDialog.vue';
import ModeDialog from '@/components/dialogs/ModeDialog.vue';
import ResetDialog from '@/components/dialogs/ResetDialog.vue';
import ShadowsDialog from '@/components/dialogs/ShadowsDialog.vue';
import SwitchQuizDialog from '@/components/dialogs/SwitchQuizDialog.vue';
import { useDialogs } from '@/stores/useDialogs';

const { dialogs, setDialog } = useDialogs();

const closeDialog = () => setDialog(null);
</script>

<template>
  <ModeDialog
    :toggle-function="closeDialog"
    mode="chaos"
    caption="Enable guessing without predetermined placements"
    v-if="dialogs.dialog === 'chaos'"
  />

  <ModeDialog
    :toggle-function="closeDialog"
    mode="order"
    caption="Enforce guessing in Pokédex order"
    v-if="dialogs.dialog === 'order'"
  />

  <ModeDialog
    :toggle-function="closeDialog"
    mode="normal"
    caption="Switch to regular quiz with Region Layout"
    v-if="dialogs.dialog === 'normal'"
  />

  <ShadowsDialog
    :toggle-function="closeDialog"
    v-if="dialogs.dialog === 'shadows'"
  />

  <SwitchQuizDialog
    :toggle-function="closeDialog"
    v-if="dialogs.dialog === 'switchQuiz'"
  />

  <ChangeTimerDialog
    :toggle-function="closeDialog"
    v-if="dialogs.dialog === 'timer'"
  />

  <GiveUpDialog
    :toggle-function="closeDialog"
    v-if="dialogs.dialog === 'giveup'"
  />

  <ResetDialog
    :toggle-function="closeDialog"
    v-if="dialogs.dialog === 'reset'"
  />
</template>

<style scoped></style>
