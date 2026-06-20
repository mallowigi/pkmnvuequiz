<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  color: string;
  id: string;
  text: string;
}>();

const { t } = useI18n();

const url = computed(() => `https://ko-fi.com/${props.id}`);
</script>

<template>
  <div class="btn-container">
    <a
      :title="text"
      class="kofi-button"
      :style="{ backgroundColor: color }"
      :href="url"
      target="_blank"
    >
      <span class="kofitext">
        <img
          src="https://storage.ko-fi.com/cdn/cup-border.png"
          :alt="t('donateTo', { name: id })"
          class="kofiimg"
        />{{ text }}
      </span>
    </a>
  </div>
</template>

<style scoped>
@keyframes kofi-wiggle {
  0% {
    transform: rotate(0) scale(1);
  }
  60% {
    transform: rotate(0) scale(1);
  }
  75% {
    transform: rotate(0) scale(1.12);
  }
  80% {
    transform: rotate(0) scale(1.1);
  }
  84% {
    transform: rotate(-10deg) scale(1.1);
  }
  88% {
    transform: rotate(10deg) scale(1.1);
  }
  92% {
    transform: rotate(-10deg) scale(1.1);
  }
  96% {
    transform: rotate(10deg) scale(1.1);
  }
  100% {
    transform: rotate(0) scale(1);
  }
}

.btn-container {
  display: inline-block;
  white-space: nowrap;
  margin: 0 4px;
}

.kofi-button {
  box-shadow: 1px 1px 0px rgba(0, 0, 0, 0.2);
  line-height: 24px;
  min-width: 150px;
  display: inline-block;
  padding: 2px 12px;
  background-color: #29abe0;
  text-align: center;
  border-radius: 7px;
  color: #fff;
  cursor: pointer;
  overflow-wrap: break-word;
  vertical-align: middle;
  border: 0 none #fff;
  font-family: 'Quicksand', Roboto, sans-serif;
  text-decoration: none;
  text-shadow: none;
  font-weight: bold;
  font-size: 14px;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.85;
    color: #f5f5f5;
  }
}

.kofiimg {
  display: initial;
  vertical-align: middle;
  height: 13px;
  width: 20px;
  padding-top: 0;
  padding-bottom: 0;
  border: none;
  margin: 0 5px 3px 0;
  animation: kofi-wiggle 3s infinite;

  &:after {
    content: url('https://storage.ko-fi.com/cdn/whitelogo.svg');
    vertical-align: middle;
    height: 25px;
    padding: 0;
    border: none;
    margin: 0 6px 4px 0;
  }
}

.kofitext {
  color: #fff;
  letter-spacing: -0.15px;
  text-wrap: auto;
  vertical-align: middle;
  line-height: 16px;
  padding: 0;
  text-align: center;
  text-decoration: none;
  text-shadow: 0 1px 1px rgba(34, 34, 34, 0.05);
}
</style>
