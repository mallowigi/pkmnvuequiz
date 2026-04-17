<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { computed } from 'vue';
import { useCurrentType } from '@/stores/useCurrentType.js';

const props = defineProps({
  text: String,
  primary: Boolean,
});

const { getCurrentType } = useCurrentType();

const buttonStyles = computed(() => {
  const type = getCurrentType(); //types.find(t => t.id === state.currentType);
  const color = type?.buttonColor;
  const bgColor = type?.bgColor;
  return {
    '--btn-color': color,
    '--bg-color': bgColor,
  };
});
</script>

<template>
  <div class="cell rad-bl-tr transition-element" :class="{ primary: primary }" :style="buttonStyles" v-bind="$attrs">
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

  &:hover {
    background: var(--button-hover);
    border: 2px solid var(--button-hover);
  }
}
</style>
