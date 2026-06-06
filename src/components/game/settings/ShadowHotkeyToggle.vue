<script setup lang="ts">
import RoundedBox from '@/components/common/RoundedBox.vue';
import SegmentButton from '@/components/common/SegmentButton.vue';
import { useMessages } from '@/stores/useMessages.ts';
import { useState } from '@/stores/useState.ts';
import { useI18n } from 'vue-i18n';

const { state, toggleShadowHelper } = useState();
const { showUserMessage } = useMessages();
const { t } = useI18n();

const toggle = () => {
  toggleShadowHelper();
  showUserMessage(t('shadowHelperSet', { status: state.withShadowHelper ? t('enabled') : t('disabled') }));
};
</script>

<template>
  <RoundedBox
    v-tooltip="t('shadowHotkeyTooltip', { key: ',' })"
    v-game-ended
  >
    <SegmentButton
      :active="{
        left: state.withShadowHelper,
      }"
      @click:left="toggle"
    >
      <template #prefix>{{ t('shadowHelperToggle') }}</template>
      <template #left>&nbsp;,&nbsp;</template>
      <template #suffix> {{ t('shadowHelperToggleSuffix') }}</template>
    </SegmentButton>
  </RoundedBox>
</template>
