<script setup>
import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useState } from '@/stores/state.js';

const { setRoomMessage } = useState();

defineProps(['message']);

</script>

<template>
  <Overlay class='full-overlay'>
    <div class='prompt'>
      <h2>{{ message }}</h2>
      <RoundedButton @click='setRoomMessage(null)'>
        Exit
      </RoundedButton>
    </div>
  </Overlay>
</template>

<style scoped>
.full-overlay {
  z-index: 9;
  --overlay-bg: var(--full-overlay);
}
</style>