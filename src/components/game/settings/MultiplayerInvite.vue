<script setup lang="ts">
import RoundedBox from '@/components/common/RoundedBox.vue';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useI18n } from 'vue-i18n';

const { flowState } = useGameFlow();
const { t } = useI18n();
</script>

<template>
  <RoundedBox v-game-ended>
    {{ t('multiplayerInvite') }}
    <img
      src="@/assets/HostQuiz.png"
      :alt="t('inviteLink')"
    />
  </RoundedBox>
</template>
