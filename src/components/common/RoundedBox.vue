<script setup lang="ts">
type Props = {
  text?: string;
};

defineProps<Props>();
</script>

<template>
  <div
    class="cell rad-br-tl transition-element"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<style scoped>
.cell {
  background: var(--button);
  border: 2px solid var(--type-bg-color, var(--primary));
  color: var(--text);
  padding: 11px 14px;
  text-align: center;
  text-decoration: none;
  display: inline-flex;
  flex-direction: row;
  align-self: flex-start;
  align-items: center;
  gap: 8px;
  margin: 10px 0 0 10px;
  min-height: 30px;
  max-height: 52px;
  line-height: 30px;
  font-size: 16px;
}
</style>
