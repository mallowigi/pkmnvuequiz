<script setup lang="ts">
import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import IconButton from '@/components/common/IconButton.vue';
import { useCurrentType } from '@/stores/useCurrentType';
import { useState } from '@/stores/useState';
import { useMessages } from '@/stores/useMessages';

const { state, setPaused, setState } = useState();
const { currentTypeState, setCurrentType } = useCurrentType();
const { showUserMessage } = useMessages();

const resume = () => setPaused(false);

const saveState = () => {
  const savedState = {
    ...state,
    currentType: currentTypeState.currentType,
    timer: {
      ...state.timer,
      savedAt: Date.now(),
    },
    version: 1,
  };

  // Simulate a download by creating a blob and a temporary link
  const blob = new Blob([JSON.stringify(savedState)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;

  const [date, time] = new Date().toISOString().split('T');
  const formatDate = date.replace(/-/g, '_');
  const formatTime = time.replace(/:/g, '_').split('.')[0];
  link.download = `pkmn_quiz_state_${formatDate}_${formatTime}.json`;
  document.body.appendChild(link);

  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const loadState = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const files = Array.from(target.files || []);
  if (files.length === 0) {
    return;
  }

  const file = files[0];
  const reader = new FileReader();
  reader.onload = (e: ProgressEvent<FileReader>) => {
    try {
      const result = e.target?.result as string;
      const loadedState = JSON.parse(result);
      if (loadedState.version !== 1) {
        console.error('Unsupported save version.');
        showUserMessage('Unsupported save version.');
        return;
      }

      const { currentType: loadedCurrentType, version: _version, ...statePayload } = loadedState;
      showUserMessage('Successfully loaded quiz!');

      setCurrentType(loadedCurrentType ?? null);
      setState(statePayload);
      setPaused(false);
    } catch (error) {
      console.error('Failed to load state: Invalid file format.', error);
      showUserMessage('Failed to load quiz: Invalid file format.');
    }
  };
  reader.readAsText(file);
};
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
