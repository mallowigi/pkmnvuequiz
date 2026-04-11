<script setup>
defineProps(['text', 'onClick']);
</script>

<template>
  <div class='button rad-bl-tr transition-element' @click='onClick'>
    {{ text }}
  </div>
</template>

<style scoped>

.button {
  border: 2px solid var(--primary);
  background: var(--dark);
  color: white;
  padding: 9px 8px 8px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 10px 0 0 10px;
  cursor: pointer;
  min-width: 100px;
  min-height: 30px;
  line-height: 30px;
  font-size: 16px;

  &:hover {
    background: var(--gray);
    border: 2px solid var(--gray);
  }
}
</style>