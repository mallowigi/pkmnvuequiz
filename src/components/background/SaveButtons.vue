<script setup lang="ts">
import IconButton from '@/components/common/IconButton.vue';
import { useSavedData } from '@/composables/useSavedData.ts';

const { saveState, loadState } = useSavedData();
</script>

<template>
  <div class="top-margin">
    <input
      type="file"
      id="file-input"
      @change="loadState"
      hidden
      accept="application/json"
    />

    <p class="left-margin">Save/Load Quiz State:</p>

    <IconButton @click="saveState">
      <img
        src="@/assets/download.png"
        alt="Download"
      />
    </IconButton>

    <label for="file-input">
      <IconButton>
        <img
          src="@/assets/upload.png"
          alt="Upload"
        />
      </IconButton>
    </label>
  </div>
</template>

<style scoped>
.left-margin {
  margin-left: 10px;
}

.top-margin {
  margin-top: 20px;
}
</style>
