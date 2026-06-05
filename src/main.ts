import './assets/main.css';
import { MotionPlugin } from '@vueuse/motion';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';

import ellipsis from '@/directives/ellipsis.ts';
import gameEnded from '@/directives/gameEnded.ts';
import tooltip from '@/directives/tooltip.ts';
import messages from '@/locales/messages';
import { piniaStorePlugin } from '@/stores/piniaStorePlugin.ts';
import { capitalize } from '@/utils/utils.ts';

import App from './App.vue';

const i18n = createI18n({
  fallbackLocale: 'en',
  locale: 'en',
  messages,
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
app.directive('ellipsis', ellipsis);

pinia.use(piniaStorePlugin);

app.mount('#app');
