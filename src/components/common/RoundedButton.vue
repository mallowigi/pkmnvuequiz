<script setup lang="ts">
import { computed } from 'vue';

import { useCurrentType } from '@/stores/useCurrentType';

const props = defineProps({
  primary: Boolean,
  selected: Boolean,
  text: String,
});

const { getCurrentTypeOrSpecial } = useCurrentType();

const buttonStyles = computed(() => {
  const type = getCurrentTypeOrSpecial();
  const buttonColor = type?.buttonColor;
  const bgColor = type?.bgColor;
  return {
    '--bg-color': bgColor,
    '--btn-color': buttonColor,
  };
});
</script>

<template>
  <div
    class="cell rad-bl-tr transition-element"
    :class="{ primary: props.primary, selected: props.selected }"
    :style="buttonStyles"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<style scoped>
.cell {
  border: 2px solid var(--btn-color, var(--primary));
  background: var(--button);
  color: var(--text);
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

  &.primary {
    background: var(--bg-color, var(--primary));
    border: 2px solid var(--btn-color, var(--primary));
  }

  &.selected {
    background: var(--btn-color, var(--darkPrimary));
    border: 2px solid var(--btn-color, var(--darkPrimary));
  }

  &:hover {
    background: var(--button-hover);
    border: 2px solid var(--button-hover);
  }
}
</style>
