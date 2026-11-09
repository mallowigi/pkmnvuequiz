import { useI18n } from 'vue-i18n';

import { useTouches } from '@/stores/useTouches.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useCheater = () => {
  const { t } = useI18n({
    messages: {
      cn: {
        description: '激活作弊码。',
        title: '作弊者',
      },
      de: {
        description: 'Cheats aktiviert.',
        title: 'Betrüger',
      },
      en: {
        description: 'Activated cheat codes.',
        title: 'Cheater',
      },
      es: {
        description: 'Códigos de trampa activados.',
        title: 'Tramposo',
      },
      fr: {
        description: 'Codes triche activés.',
        title: 'Tricheur',
      },
      it: {
        description: 'Codici baratto attivati.',
        title: 'Baro',
      },
      jp: {
        description: 'チートコードを有効にした。',
        title: 'チーター',
      },
      ko: {
        description: '치트 코드를 활성화했습니다.',
        title: '치터',
      },
      pt: {
        description: 'Códigos de trapaça ativados.',
        title: 'Trapaceiro',
      },
      ru: {
        description: 'Активированы чит-коды.',
        title: 'Обманщик',
      },
      zh: {
        description: '激活作弊碼。',
        title: '作弊者',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'misc',
    getValue: () => {
      const { touchesState } = useTouches();
      return touchesState.toggledCheat ? 1 : 0;
    },
    id: 'cheater',
    get lastDescription() {
      return t('description');
    },
    get lastTitle() {
      return t('title');
    },
    priority: 10,
    thresholds: [
      {
        get description() {
          return t('description');
        },
        get nextTitle() {
          return t('title');
        },
        rank: 'platinum',
        val: 1,
      },
    ],
  });
};
