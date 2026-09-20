<script setup lang="ts">
type Props = {
  top: string;
  bottom: string;
};

defineProps<Props>();
</script>

<template>
  <div class="stacked-labels-icon">
    <span class="label">{{ top }}</span>
    <span class="divider" />
    <span class="label">{{ bottom }}</span>
  </div>
</template>

<style scoped>
.stacked-labels-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  min-width: 36px;
  padding: 0 2px;
}

.label {
  color: currentColor;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
  text-transform: uppercase;
  letter-spacing: 0.2px;
}

.divider {
  width: 100%;
  border-top: 1px dashed currentColor;
  opacity: 0.5;
}
</style>
