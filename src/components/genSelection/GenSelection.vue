<script setup>

import Overlay from '@/components/common/Overlay.vue';
import Loading from '@/components/genSelection/Loading.vue';
import GenChooser from '@/components/genSelection/GenChooser.vue';
import { usePkmnData } from '@/stores/pkmnStore.js';
import FadeTransition from '@/components/common/FadeTransition.vue';

const { state } = usePkmnData();

</script>

<template>
  <Overlay>
    <div class='prompt'>
      <div id='loadbox'>
        <img src='@/assets/logo.gif' class='titlecard' alt='Logo'>

        <Loading />
      </div>

      <FadeTransition>
        <GenChooser v-if='state.isLoaded' />
      </FadeTransition>
    </div>
  </Overlay>
</template>

<style scoped>
.prompt {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  color: white;
  transform: translate(-50%, -70%);
}

.titlecard {
  display: block;
  width: 100%;
  height: 100%;
  padding-top: 30%;
  max-width: 600px;
}

</style>