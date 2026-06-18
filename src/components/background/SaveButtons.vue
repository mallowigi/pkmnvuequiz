<script setup lang='ts'>
import IconButton from '@/components/common/IconButton.vue';
import { useSavedData } from '@/composables/useSavedData.ts';
import { useI18n } from 'vue-i18n';
import SaveIcon from '@/components/common/icons/SaveIcon.vue';
import LoadIcon from '@/components/common/icons/LoadIcon.vue';

const { t } = useI18n();

const { saveState, loadState } = useSavedData();
</script>

<template>
  <div class='top-margin'>
    <input
        type='file'
        id='file-input'
        @change='loadState'
        hidden
        accept='application/json'
    />

    <p class='left-margin'>{{ t('saveLoadState') }}</p>

    <IconButton @click='saveState'>
      <SaveIcon class='accent-icon' />
    </IconButton>

    <IconButton>
      <label for='file-input'>
        <LoadIcon class='accent-icon' />
      </label>
    </IconButton>
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
