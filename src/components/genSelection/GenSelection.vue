<script setup>

import Overlay from '@/components/common/Overlay.vue';
import Loading from '@/components/Loading.vue';
import GenChooser from '@/components/genSelection/GenChooser.vue';
</script>

<template>
  <Overlay>
    <div class='prompt'>
      <div id='loadbox'>
        <img src='../../assets/logo.gif' class='titlecard' alt='titlecard'>

        <Loading />
      </div>

      <GenChooser />
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