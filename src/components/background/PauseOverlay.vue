<script setup>

import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import IconButton from '@/components/common/IconButton.vue';
import { setState, useState } from '@/stores/state.js';

const { state, setPaused } = useState();

const saveState = () => {
  const savedState = {
    ...state,
    timer: {
      savedAt: Date.now(),
    },
    version: 1,
  };

  // Simulate a download by creating a blob and a temporary link
  let blob = new Blob([JSON.stringify(savedState)], { type: 'application/json' });
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

const loadState = (e) => {
  const files = Array.from(e.target.files || []);
  if (files.length === 0) {
    return;
  }

  const file = files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const loadedState = JSON.parse(e.target.result);
      if (loadedState.version !== 1) {
        console.error('Unsupported save version.');
        // showUserMessage('Unsupported save version.');
        return;
      }

      // showUserMessage('Successfully loaded quiz!');

      setState(loadedState);
      setPaused(false);
    } catch (error) {
      console.error('Failed to load state: Invalid file format.', error);
      // showUserMessage('Failed to load quiz: Invalid file format.');
    }
  };
  reader.readAsText(file);
};

</script>

<template>
  <Overlay class='full-overlay'>
    <input type='file'
           id='file-input'
           @change='loadState'
           hidden
           accept='application/json'>


    <div class='prompt'>
      <h2 class='left-margin'>Paused</h2>

      <RoundedButton :text='"Resume"'
                     :primary='true'
                     @click='setPaused(false)'>

      </RoundedButton>

      <div class='top-margin'>
        <p class='left-margin'>Save/Load Quiz State:</p>

        <IconButton @click='saveState'>
          <img src='@/assets/download.png' alt='Download'>
        </IconButton>

        <label for='file-input'>
          <IconButton>
            <img src='@/assets/upload.png' alt='Upload'>
          </IconButton>
        </label>
      </div>
    </div>
  </Overlay>
</template>

<style scoped>
.full-overlay {
  z-index: 10;
  --overlay-bg: var(--full-black);
}

.left-margin {
  margin-left: 10px;
}

.top-margin {
  margin-top: 20px;
}

</style>