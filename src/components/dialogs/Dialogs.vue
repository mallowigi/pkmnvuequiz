<script setup lang="ts">
import ChangeTimerDialog from '@/components/dialogs/ChangeTimerDialog.vue';
import GiveUpDialog from '@/components/dialogs/GiveUpDialog.vue';
import ModeDialog from '@/components/dialogs/ModeDialog.vue';
import ResetDialog from '@/components/dialogs/ResetDialog.vue';
import ShadowsDialog from '@/components/dialogs/ShadowsDialog.vue';
import SwitchQuizDialog from '@/components/dialogs/SwitchQuizDialog.vue';
import { useDialogs } from '@/stores/useDialogs';
import LeaderBoardsDialog from '@/components/dialogs/LeaderBoardsDialog.vue';
import FadeTransition from '@/components/common/transitions/FadeTransition.vue';
import ChangeNameDialog from '@/components/dialogs/ChangeNameDialog.vue';

const { dialogs } = useDialogs();
</script>

<template>
  <FadeTransition>
    <ModeDialog
      mode="chaos"
      caption="Enable guessing without predetermined placements"
      v-if="dialogs.dialog === 'chaos'"
    />

    <ModeDialog
      mode="order"
      caption="Enforce guessing in Pokédex order"
      v-if="dialogs.dialog === 'order'"
    />

    <ModeDialog
      mode="normal"
      caption="Switch to regular quiz with Region Layout"
      v-if="dialogs.dialog === 'normal'"
    />

    <ShadowsDialog v-if="dialogs.dialog === 'shadows'" />

    <SwitchQuizDialog v-if="dialogs.dialog === 'switchQuiz'" />

    <ChangeTimerDialog v-if="dialogs.dialog === 'timer'" />

    <GiveUpDialog v-if="dialogs.dialog === 'giveup'" />

    <ResetDialog v-if="dialogs.dialog === 'reset'" />

    <LeaderBoardsDialog v-if="dialogs.dialog === 'leaderboards'" />

    <ChangeNameDialog v-if="dialogs.dialog === 'changeName'" />
  </FadeTransition>
</template>

<style scoped></style>
