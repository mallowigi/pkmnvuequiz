<script setup lang="ts">
import RoundedBox from '@/components/common/RoundedBox.vue';
</script>

<template>
  <RoundedBox>
    Timer:
    <div
      class="smolbutton smolbuttonx transition-element"
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

<style scoped>
.smolbutton {
  border: solid 2px var(--primary);
  border-radius: 6px 3px 6px 3px;
  text-align: center;
  text-decoration: none;
  margin: 0 0 0 5px;
  padding: 3px 5px 3px 5px;
  vertical-align: middle;
  line-height: 16px;
  cursor: pointer;
}
</style>
