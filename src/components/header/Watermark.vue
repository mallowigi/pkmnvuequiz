<script setup lang="ts">
import ChartIcon from '@/components/common/icons/ChartIcon.vue';
import UserIcon from '@/components/common/icons/UserIcon.vue';
import SettingsIcon from '@/components/common/icons/SettingsIcon.vue';
</script>

<template>
  <div class="root row">
    <div class="icons row">
      <ChartIcon />
      <UserIcon />
      <SettingsIcon />
    </div>

    <div class="url">pkmnvuequiz.netlify.app</div>
  </div>
</template>

<style scoped>
.root {
  border-top: 3px dotted var(--type-bg-color, var(--primary));
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.url {
  font-size: 20px;
  z-index: 10;
  padding: 4px 0 10px 40px;
  color: var(--text);
}
</style>
