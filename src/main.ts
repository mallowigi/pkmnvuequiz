import './assets/main.css';
import { MotionPlugin } from '@vueuse/motion';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import { storagePlugin } from '@/stores/storagePlugin.ts';

import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();

pinia.use(storagePlugin);

app.use(pinia);
app.use(MotionPlugin);
app.mount('#app');
