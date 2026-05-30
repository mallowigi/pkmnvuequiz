<script setup lang="ts">
import { ref } from 'vue';

import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import TextBox from '@/components/common/TextBox.vue';
import { useDialogs } from '@/stores/useDialogs.ts';
import { useState } from '@/stores/useState.ts';

const { dialogs, closeDialog } = useDialogs();
const { state, setName } = useState();

const name = ref('');

const submit = () => {
  setName(name.value);
  closeDialog();

  if (dialogs.callback) {
    dialogs.callback();
  }
};

const cancel = () => {
  closeDialog();
};

const editName = (value: string) => {
  name.value = value;
};
</script>

<template>
  <Overlay
    class="overlay"
    @close="cancel"
  >
    <div class="prompt">
      <h2>Change your name, {{ state.name }}?</h2>
      <p class="desc">Use the form below to change your name</p>

      <TextBox
        type="text"
        class="large-text"
        placeholder="Enter your name"
        @input="editName"
      />

      <div class="row">
        <RoundedButton
          @click.stop="submit"
          primary
          :disabled="!name"
        >
          Submit
        </RoundedButton>

        <RoundedButton
          @click.stop="cancel"
          primary
        >
          Cancel
        </RoundedButton>
      </div>
    </div>
  </Overlay>
</template>

<style scoped>
.overlay {
  z-index: 4;
}

.desc {
  margin-bottom: 10px;
}

.large-text {
  padding: 6px;
  margin: 1em;
}

.row {
  justify-content: center;
  gap: 8px;
}
</style>
