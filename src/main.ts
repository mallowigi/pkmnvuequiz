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
  locale: 'en',
  messages: {
    cn: {
      alola: '阿罗拉',
      galar: '伽勒尔',
      hoenn: '丰缘',
      johto: '城都',
      kalos: '卡洛斯',
      kanto: '关都',
      paldea: '帕尔迪亚',
      sinnoh: '神奥',
      unova: '合众',
    },
    de: {},
    en: {
      alola: 'Alola',
      galar: 'Galar',
      hoenn: 'Hoenn',
      johto: 'Johto',
      kalos: 'Kalos',
      kanto: 'Kanto',
      paldea: 'Paldea',
      sinnoh: 'Sinnoh',
      unova: 'Unova',
    },
    es: {},
    fr: {
      unova: 'Unys',
    },
    it: {},
    jp: {
      alola: 'アローラ',
      galar: 'ガラル',
      hoenn: 'ホウエン',
      johto: 'ジョウト',
      kalos: 'カロス',
      kanto: 'カントー',
      paldea: 'パルデア',
      sinnoh: 'シンオウ',
      unova: 'イッシュ',
    },
    ko: {
      alola: '알로라',
      galar: '가라르',
      hoenn: '호연',
      johto: '조토',
      kalos: '칼로스',
      kanto: '관동',
      paldea: '팔데아',
      sinnoh: '신오',
      unova: '이상',
    },
    pt: {},
    ru: {
      alola: 'Ало́ла',
      galar: 'Галар',
      hoenn: 'Хоэн',
      johto: 'Джото',
      kalos: 'Калос',
      kanto: 'Канто',
      paldea: 'Палдея',
      sinnoh: 'Синно',
      unova: 'Юнова',
    },
    zh: {
      alola: '阿罗拉',
      galar: '伽勒尔',
      hoenn: '丰缘',
      johto: '城都',
      kalos: '卡洛斯',
      kanto: '关都',
      paldea: '帕尔迪亚',
      sinnoh: '神奥',
      unova: '合众',
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
