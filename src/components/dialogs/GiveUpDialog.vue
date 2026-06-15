<script setup lang="ts">
import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useGameFlow } from '@/stores/useGameFlow';
import { useDialogs } from '@/stores/useDialogs.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import { useI18n } from 'vue-i18n';

const { giveUp } = useGameFlow();
const { dialogs, closeDialog } = useDialogs();
const { showRemaining } = usePokemons();
const { t } = useI18n();

const promptGiveUp = () => {
  closeDialog();
  giveUp();
  showRemaining();

  if (dialogs.callback) {
    dialogs.callback();
  }
};

const cancel = () => {
  closeDialog();
};
</script>

<template>
  <Overlay
    class="overlay"
    @close="cancel"
  >
    <div class="prompt">
      <h2>{{ t('giveUpDialog.title') }}</h2>
      <p class="desc">{{ t('giveUpDialog.description') }}</p>

      <RoundedButton
        class="danger-btn"
        @click.stop="promptGiveUp"
      >
        {{ t('giveUp') }}
      </RoundedButton>

      <RoundedButton @click.stop="cancel">
        {{ t('cancel') }}
      </RoundedButton>
    </div>
  </Overlay>
</template>
