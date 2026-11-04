import { useI18n } from 'vue-i18n';

import { useTouches } from '@/stores/useTouches.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useMissingno = () => {
  const { touchesState } = useTouches();
  const { t } = useI18n({
    messages: {
      cn: {
        description: '找到 Missingno. 作弊码。',
        title: 'Missingno.',
      },
      de: {
        description: 'Den Missingno.-Cheat gefunden.',
        title: 'Missingno.',
      },
      en: {
        description: 'Found the Missingno. cheat code.',
        title: 'Missingno.',
      },
      es: {
        description: 'Encontró el código de trampa Missingno.',
        title: 'Missingno.',
      },
      fr: {
        description: 'Trouvé le code triche Missingno.',
        title: 'Missingno.',
      },
      it: {
        description: 'Trovato il codice baratto Missingno.',
        title: 'Missingno.',
      },
      jp: {
        description: 'Missingno.チートコードを見つけた。',
        title: 'Missingno.',
      },
      ko: {
        description: 'Missingno. 치트 코드를 찾았습니다.',
        title: 'Missingno.',
      },
      pt: {
        description: 'Encontrou o código de trapaça Missingno.',
        title: 'Missingno.',
      },
      ru: {
        description: 'Найден чит-код Missingno.',
        title: 'Missingno.',
      },
      zh: {
        description: '找到 Missingno. 作弊碼。',
        title: 'Missingno.',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'misc',
    getValue: () => (touchesState.toggledMissingno ? 1 : 0),
    id: 'missingno',
    get lastDescription() {
      return t('description');
    },
    get lastTitle() {
      return t('title');
    },
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
