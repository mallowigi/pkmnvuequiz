<script setup lang="ts">
import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useRoomMessages } from '@/stores/useRoomMessages';
import { useI18n } from 'vue-i18n';

const { setRoomMessage } = useRoomMessages();
const { t } = useI18n();

defineProps(['message']);
</script>

<template>
  <Overlay
    class="full-overlay"
    @close="setRoomMessage(null)"
  >
    <div class="prompt">
      <h2>{{ message }}</h2>
      <RoundedButton @click="setRoomMessage(null)"> {{ t('exit') }} </RoundedButton>
    </div>
  </Overlay>
</template>

<style scoped>
.full-overlay {
  z-index: 9;
  --overlay-bg: var(--full-overlay);
}
</style>
