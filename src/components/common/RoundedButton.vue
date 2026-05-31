<script setup lang="ts">
type Props = {
  primary?: boolean;
  selected?: boolean;
  disabled?: boolean;
  text?: string;
  disabledTooltip?: string;
};

const props = defineProps<Props>();
</script>

<template>
  <div
    class="cell rad-bl-tr transition-element"
    :class="{ primary: props.primary, selected: props.selected, disabled: props.disabled }"
    v-tooltip.disabled="props.disabledTooltip ?? ''"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<style scoped>
.cell {
  border: 2px solid var(--type-btn-color);
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
    background: var(--type-bg-color, var(--primary));
    border: 2px solid var(--type-btn-color);
    color: var(--type-fg-color, var(--text));
  }

  &.selected {
    background: var(--type-btn-color, var(--darkPrimary));
    border: 2px solid var(--type-btn-color, var(--darkPrimary));
    color: var(--type-fg-color, var(--text));
  }

  &.disabled {
    background: var(--type-bg-color, var(--darkPrimary));
    border: 2px solid var(--type-btn-color, var(--darkPrimary));
    color: var(--type-fg-color, var(--text));
    cursor: not-allowed;
  }

  &:hover {
    background: var(--button-hover);
    border: 2px solid var(--button-hover);
  }
}
</style>
