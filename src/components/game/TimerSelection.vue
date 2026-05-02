<script setup lang="ts">
import RoundedBox from '@/components/common/RoundedBox.vue';
</script>

<template>
  <RoundedBox>
    Timer:
    <div
      class="smolbutton smolbuttonx transition-element smolbuttondark smolbuttonxdark smolbuttonxdarkice smolbuttonxice smolbuttonice"
      name="timer"
      value="timer0"
    >
      ∞
    </div>

    <input
      type="number"
      class="input-timer input-timerice"
      min="1"
      max="999"
      value="35"
      autocomplete="off"
      placeholder="1"
    />
    <div class="minute">min</div>

    <div class="smolbutton attached transition-element smolbuttondark smolbuttonice">set</div>

    <div
      class="smolbutton transition-element smolbuttondark smolbuttonice"
      name="pause"
      value="pause"
    >
      ⏸
    </div>
  </RoundedBox>
</template>

<style scoped></style>
