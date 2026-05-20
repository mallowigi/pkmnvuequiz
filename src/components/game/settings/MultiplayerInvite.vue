<script setup lang="ts">
import RoundedBox from '@/components/common/RoundedBox.vue';
import { useGameFlow } from '@/stores/useGameFlow.ts';

const { flowState } = useGameFlow();
</script>

<template>
  <RoundedBox :class="{ disabled: flowState.isGivenUp || flowState.isEnded }">
    Multiplayer Invite
    <img
      src="@/assets/HostQuiz.png"
      alt="Invite link"
    />
  </RoundedBox>
</template>
