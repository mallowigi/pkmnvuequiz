<script setup lang="ts">
import { useSavedLocale } from '@/composables/useSavedLocale.ts';
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { savedLocale } = useSavedLocale();
const { locale } = useI18n();

watch(savedLocale, (val) => {
  locale.value = val;
});
</script>

<template>
  <div class="locale-changer">
    <select
      id="locale"
      v-model="savedLocale"
      class="select"
      aria-label="Select language"
    >
      <option
        v-for="locale in $i18n.availableLocales"
        :key="`locale-${locale}`"
        :value="locale"
      >
        {{ locale }}
      </option>
    </select>
  </div>
</template>

<style scoped>
@keyframes accordion {
  from {
    transform: scaleY(0);
    opacity: 0;
  }

  to {
    transform: scaleY(1);
    opacity: 1;
  }
}

.locale-changer {
  align-self: baseline;
}

.select,
::picker(select) {
  appearance: base-select;
}

.select {
  border: none;
  border-radius: 4px;
  font-size: 24px;
  font-family: 'Roboto Condensed', sans-serif;
  color: var(--text);
  padding: 6px 4px 4px 3px;
  text-align: center;
  text-decoration: none;
  font-variant: small-caps;
  line-height: 16px;
  outline: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--type-dark-color, var(--darkPrimary));
    color: var(--text);
  }

  &:focus-visible {
    outline: 2px solid var(--type-dark-color, var(--darkPrimary));
    outline-offset: 2px;
  }

  &::picker-icon {
    font-size: 12px;
  }

  option {
    line-height: 48px;
    min-width: 120px;
    border: none;
    box-shadow: none;
    outline: none;
    color: var(--text);
    padding: 0 12px;
    cursor: pointer;
    transition:
      background-color 0.2s,
      color 0.2s;

    &:first-child {
      border-radius: 3px 20px 3px 3px;
    }

    &:last-child {
      border-radius: 3px 3px 3px 20px;
    }

    &:hover,
    &:focus,
    &:active {
      background-color: var(--type-dark-color, var(--darkPrimary));
      color: var(--text);
    }

    &:checked {
      background: var(--type-btn-color, var(--primary));
      color: var(--text);
    }
  }

  option::checkmark {
    display: none;
  }
}

::picker(select) {
  background: var(--button);
  border: 1px solid var(--type-btn-color, var(--primary));
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: var(--text);
  overflow: visible;
  border-radius: 3px 20px;
  margin-top: 8px;
  transform-origin: center top;
  animation: accordion 0.2s ease-out;
}
</style>
