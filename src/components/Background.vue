<script setup>

</script>

<template>
  <img alt='pattern1' src='../assets/types/ICE.svg' id='bgpattern' class='bgpattern'>
  <img alt='pattern2' src='../assets/types/ICE.svg' id='bgpattern2' class='bgpattern2'>
</template>

<style scoped>
.bgpattern {
  display: none;
  position: fixed;
  bottom: 24%;
  left: 10%;
  width: 18%;
  opacity: 0.9;
  z-index: -2;
}

.bgpattern2 {
  display: none;
  position: fixed;
  bottom: calc(100px + 40%);
  right: 14%;
  width: 33%;
  opacity: 0.2;
  z-index: -2;
}

</style>