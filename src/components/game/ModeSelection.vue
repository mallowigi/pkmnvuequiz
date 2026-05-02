<script setup lang="ts">
import RoundedBox from '@/components/common/RoundedBox.vue';
</script>

<template>
  <RoundedBox>
    Mode:
    <div
      class="smolbutton atchleft transition-element smolbuttondark smolbuttonice"
      id="chaos-on"
    >
      Chaos
    </div>
    <div
      class="smolbutton atchcent smolbuttonx transition-element smolbuttondark smolbuttonxdark smolbuttonxdarkice smolbuttonxice smolbuttonice"
      id="order-off"
    >
      Regular
    </div>
    <div
      class="smolbutton atchright transition-element smolbuttondark smolbuttonice"
      id="order-on"
    >
      Dex Order
    </div>
  </RoundedBox>
</template>

<style scoped></style>
