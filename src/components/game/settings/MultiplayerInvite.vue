<script setup lang="ts">
import RoundedBox from '@/components/common/RoundedBox.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <RoundedBox
    v-game-ended
    class="multi-toggle"
  >
    {{ t('multiplayerInvite') }}
    <img
      src="@/assets/HostQuiz.png"
      :alt="t('inviteLink')"
    />
  </RoundedBox>
</template>

<style scoped>
.multi-toggle {
  .mobile & {
    display: none;
  }
}
</style>
