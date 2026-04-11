<script setup>

defineProps({
  onClick: Function,
});

</script>

<template>
  <div class='button rad-br-tl transition-element'
       @click='onClick'>
    <slot />
  </div>
</template>

<style scoped>

.button {
  background: var(--secondary);
  border: 2px solid var(--secondary);
  color: var(--dark);
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 10px 0 0 10px;
  cursor: pointer;
  min-height: 30px;
  line-height: 30px;
  font-size: 16px;
  min-width: 1px;
  padding: 9px 14px 2px;

  &:hover {
    background: var(--primary);
    border: 2px solid var(--primary);
  }
}
</style>