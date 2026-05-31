<script setup lang="ts">
import RoundedBox from '@/components/common/RoundedBox.vue';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { computed } from 'vue';

const { flowState } = useGameFlow();

const isDisabled = computed(() => flowState.isGivenUp || flowState.isEnded);
</script>

<template>
  <RoundedBox :class="{ disabled: isDisabled }">
    Multiplayer Invite
    <img
      src="@/assets/HostQuiz.png"
      alt="Invite link"
    />
  </RoundedBox>
</template>
