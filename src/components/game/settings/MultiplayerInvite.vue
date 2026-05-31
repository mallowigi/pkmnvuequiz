<script setup lang="ts">
import RoundedBox from '@/components/common/RoundedBox.vue';
import { useGameFlow } from '@/stores/useGameFlow.ts';

const { flowState } = useGameFlow();
</script>

<template>
  <RoundedBox v-game-ended>
    Multiplayer Invite
    <img
      src="@/assets/HostQuiz.png"
      alt="Invite link"
    />
  </RoundedBox>
</template>
