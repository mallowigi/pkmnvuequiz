<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import RoundedBox from '@/components/common/RoundedBox.vue';
import { useAttackTypeStyles } from '@/composables/useAttackTypeStyles.ts';
import { useTranslations } from '@/composables/useTranslations.ts';
import { damageCategories } from '@/data/damageCategories.ts';
import { useAttackDetails } from '@/stores/useAttackDetails.ts';
import { useLanguages } from '@/stores/useLanguages.ts';
import { moveUrl } from '@/utils/utils.ts';

const { t } = useI18n();
const { getBoxTranslation } = useTranslations();
const { getAttackTranslation } = useLanguages();
const { attackDetailsState } = useAttackDetails();

const styles = useAttackTypeStyles(attackDetailsState.currentAttack);

const categoryInfo = computed(() => {
  const category = attackDetailsState.currentAttack?.category;
  return category ? damageCategories[category] : null;
});
</script>

<template>
  <RoundedBox
    class="box"
    v-if="attackDetailsState.currentAttack"
    :style="styles"
  >
    <!-- Name -->
    <h2 class="name">
      <a
        :href="moveUrl(attackDetailsState.currentAttack.id)"
        target="_blank"
        rel="noopener noreferrer"
        >{{ getAttackTranslation(attackDetailsState.currentAttack) }}</a
      >
    </h2>

    <!-- Type, Category and Region -->
    <div class="badges">
      <span class="badge type">{{ t(attackDetailsState.currentAttack.type) }}</span>
      <span
        class="badge category"
        v-if="categoryInfo"
        :style="{ background: categoryInfo.color, color: categoryInfo.fgColor }"
        >{{ t(categoryInfo.id) }}</span
      >
      <span
        class="badge region"
        v-if="attackDetailsState.currentAttack.box"
        >{{ getBoxTranslation(attackDetailsState.currentAttack.box) }}</span
      >
    </div>

    <!-- Description -->
    <p
      class="description"
      v-if="attackDetailsState.currentAttack.description"
    >
      {{ attackDetailsState.currentAttack.description }}
    </p>
    <p
      class="description empty"
      v-else
    >
      {{ t('notFound') }}
    </p>
  </RoundedBox>
</template>

<style scoped>
.name {
  font-family: 'DynaPuff', system-ui;
  margin: 0;
  text-transform: capitalize;
  font-weight: 500;
  font-size: 1.8rem;
}

.badges {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.badge {
  padding: 0.2rem 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
  text-transform: uppercase;
  font-weight: bold;

  &.type {
    background-color: var(--primary-type);
    color: var(--primary-type-text);

    .dark & {
      background-color: var(--primary-type-dark);
      color: var(--primary-type-text-dark);
    }
  }

  &.region {
    background-color: var(--gauge);
    color: var(--text);
  }
}

.description {
  max-width: 400px;
  opacity: 0.9;
  line-height: 1.5;
  min-height: 4.5em;

  &.empty {
    opacity: 0.6;
    font-style: italic;
  }
}
</style>
