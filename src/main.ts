import './assets/main.css';
import { MotionPlugin } from '@vueuse/motion';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import gameEnded from '@/directives/gameEnded.ts';
import tooltip from '@/directives/tooltip.ts';
import { piniaStorePlugin } from '@/stores/piniaStorePlugin.ts';

import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(MotionPlugin);
app.directive('tooltip', tooltip);
app.directive('game-ended', gameEnded);

pinia.use(piniaStorePlugin);

app.mount('#app');
