<script setup lang="ts">
import { computed } from 'vue';

import { useCurrentType } from '@/stores/useCurrentType.ts';

type Props = {
  text?: string;
};

const props = defineProps<Props>();

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
    class="cell rad-br-tl transition-element"
    :style="buttonStyles"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<style scoped>
.cell {
  background: var(--button);
  color: var(--text);
  padding: 11px 14px;
  text-align: center;
  text-decoration: none;
  display: inline-flex;
  flex-direction: row;
  align-self: flex-start;
  gap: 8px;
  margin: 10px 0 0 10px;
  min-height: 30px;
  line-height: 30px;
  font-size: 16px;
}
</style>
