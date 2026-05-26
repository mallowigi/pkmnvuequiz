import './assets/main.css';
import { MotionPlugin } from '@vueuse/motion';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import { piniaStorePlugin } from '@/stores/piniaStorePlugin.ts';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(MotionPlugin);

pinia.use(piniaStorePlugin);

app.mount('#app');
