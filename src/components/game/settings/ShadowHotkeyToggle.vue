<script setup lang="ts">
import RoundedBox from '@/components/common/RoundedBox.vue';
import SegmentButton from '@/components/common/SegmentButton.vue';
import { useState } from '@/stores/useState.ts';
import { useMessages } from '@/stores/useMessages.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';

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
    title="When enabled, press the , key to display the shadow of a Pokemon at random."
    :class="{ disabled: flowState.isGivenUp || flowState.isEnded }"
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
