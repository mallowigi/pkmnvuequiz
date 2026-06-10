<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import TextBox from '@/components/common/TextBox.vue';
import { useDialogs } from '@/stores/useDialogs.ts';
import { useSettings } from '@/stores/useSettings.ts';

const { dialogs, closeDialog } = useDialogs();
const { settingsState, setName } = useSettings();

const { t } = useI18n();

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
      <h2>{{ t('changeNameDialog.title') }}</h2>
      <p class="desc">{{ t('changeNameDialog.description') }}</p>

      <TextBox
        type="text"
        class="large-text"
        :placeholder="t('changeNameDialog.placeholder')"
        @input="editName"
      />

      <div class="row">
        <RoundedButton
          @click.stop="submit"
          primary
          :disabled="!name"
        >
          {{ t('submit') }}
        </RoundedButton>

        <RoundedButton
          @click.stop="cancel"
          primary
        >
          {{ t('cancel') }}
        </RoundedButton>
      </div>
    </div>
  </Overlay>
</template>

<style scoped>
.large-text {
  padding: 6px;
  margin: 1em;
}

.row {
  justify-content: center;
  gap: 8px;
}
</style>
