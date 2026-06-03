import './assets/main.css';
import { MotionPlugin } from '@vueuse/motion';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';

import gameEnded from '@/directives/gameEnded.ts';
import tooltip from '@/directives/tooltip.ts';
import { piniaStorePlugin } from '@/stores/piniaStorePlugin.ts';
import { capitalize } from '@/utils/utils.ts';

import App from './App.vue';

const i18n = createI18n({
  fallbackLocale: 'en',
  legacy: false,
  locale: 'en',
  messages: {
    de: {},
    en: {},
    es: {},
    fr: {},
    it: {},
    jp: {},
    ko: {},
    pt: {},
    ru: {},
    zh: {},
  },
  modifiers: {
    capitalize: (value) => capitalize(value.toString()),
  },
});

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(MotionPlugin);
app.use(i18n);
app.directive('tooltip', tooltip);
app.directive('game-ended', gameEnded);

pinia.use(piniaStorePlugin);

app.mount('#app');
