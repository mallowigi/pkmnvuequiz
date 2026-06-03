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
  locale: 'fr',
  messages: {
    en: {
      nameAllRegionPokemon: 'Name all {regionOrType} Pokémon:',
    },
    fr: {
      nameAllRegionPokemon: 'Nommez tous les Pokémon de {regionOrType}:',
    },
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
