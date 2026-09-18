<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import RoundedBox from '@/components/common/RoundedBox.vue';
import { useAttackDetails } from '@/stores/useAttackDetails.ts';

const { t } = useI18n();
const { attackDetailsState } = useAttackDetails();
</script>

<template>
  <RoundedBox
    class="box"
    v-if="attackDetailsState.currentAttack"
  >
    <section class="details-grid">
      <div class="detail-item">
        <span class="label">{{ t('power') }}</span>
        <span class="value">{{ attackDetailsState.currentAttack.power ?? '—' }}</span>
      </div>

      <div class="detail-item">
        <span class="label">{{ t('accuracy') }}</span>
        <span class="value">
          {{
            attackDetailsState.currentAttack.accuracy !== null ? `${attackDetailsState.currentAttack.accuracy}%` : '—'
          }}
        </span>
      </div>

      <div class="detail-item">
        <span class="label">{{ t('pp') }}</span>
        <span class="value">{{ attackDetailsState.currentAttack.pp ?? '—' }}</span>
      </div>
    </section>

    <!-- Effect -->
    <section
      class="effect"
      v-if="attackDetailsState.currentAttack.effect"
    >
      <span class="label">{{ t('effect') }}</span>
      <p class="value">{{ attackDetailsState.currentAttack.effect }}</p>
    </section>
  </RoundedBox>
</template>

<style scoped>
.details-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.effect {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-top: 1rem;
  text-align: left;
}

.label {
  font-size: 0.8rem;
  opacity: 0.6;
  text-transform: uppercase;
}

.value {
  font-weight: bold;
}

.effect .value {
  font-weight: normal;
  line-height: 1.4;
  margin: 0;
}
</style>
