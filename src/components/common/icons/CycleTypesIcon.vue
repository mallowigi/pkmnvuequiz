<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import Icon from '@/components/common/icons/Icon.vue';
import StackedLabelsIcon from '@/components/common/icons/StackedLabelsIcon.vue';

const { t } = useI18n();
</script>

<template>
  <Icon>
    <StackedLabelsIcon
      :top="t('fire')"
      :bottom="t('water')"
    />
  </Icon>
</template>

<style scoped></style>
