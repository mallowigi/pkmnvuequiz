<script setup lang="ts">
import RoundedBox from '@/components/common/RoundedBox.vue';
import SegmentButton from '@/components/common/SegmentButton.vue';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useMessages } from '@/stores/useMessages.ts';
import { useState } from '@/stores/useState.ts';

const { state, toggleShadowHelper } = useState();
const { showUserMessage } = useMessages();
const { flowState } = useGameFlow();

const toggle = () => {
  toggleShadowHelper();
  showUserMessage(`Next shadow hotkey ${state.withShadowHelper ? 'enabled' : 'disabled'}`);
};
</script>

<template>
  <RoundedBox
    v-tooltip="'When enabled, press the , key to display the shadow of a Pokemon at random.'"
    v-game-ended
  >
    <SegmentButton
      :active="{
        left: state.withShadowHelper,
      }"
      @click:left="toggle"
    >
      <template #prefix> Next Shadow: press</template>
      <template #left>&nbsp;,&nbsp;</template>
      <template #suffix> to see the next shadow</template>
    </SegmentButton>
  </RoundedBox>
</template>
