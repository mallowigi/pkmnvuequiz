<script setup lang="ts">
import IconButton from '@/components/common/IconButton.vue';
import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useSavedData } from '@/composables/useSavedData.ts';
import { useState } from '@/stores/useState';

const { setPaused } = useState();
const { saveState, loadState } = useSavedData();

const resume = () => setPaused(false);
</script>

<template>
  <Overlay
    class="full-overlay"
    @close="resume"
  >
    <input
      type="file"
      id="file-input"
      @change="loadState"
      hidden
      accept="application/json"
    />

    <div class="prompt">
      <h2 class="left-margin">Paused</h2>

      <RoundedButton
        :primary="true"
        @click.stop="resume"
      >
        Resume
      </RoundedButton>

      <div class="top-margin">
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
    </div>
  </Overlay>
</template>

<style scoped>
.full-overlay {
  z-index: 10;
  --overlay-bg: var(--full-overlay);
}

.left-margin {
  margin-left: 10px;
}

.top-margin {
  margin-top: 20px;
}
</style>
