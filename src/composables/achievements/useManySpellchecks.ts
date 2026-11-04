import { useI18n } from 'vue-i18n';

import { useTouches } from '@/stores/useTouches.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useManySpellchecks = () => {
  const { touchesState } = useTouches();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '拼写检查者',
        description: '在一场比赛中启用 {n} 次拼写检查。',
        goldTitle: '拼写专家',
        lastDescription: '在一场比赛中启用了 100 次拼写检查。',
        lastTitle: '色盲',
        platinumTitle: '拼写大师',
        silverTitle: '拼写爱好者',
      },
      de: {
        bronzeTitle: 'Rechtschreiber',
        description: 'Aktivieren Sie {n} Mal die Rechtschreibprüfung in einem Spiel.',
        goldTitle: 'Rechtschreibexperte',
        lastDescription: '100 Mal die Rechtschreibprüfung in einem Spiel aktiviert.',
        lastTitle: 'Dyslektiker',
        platinumTitle: 'Rechtschreibmeister',
        silverTitle: 'Rechtschreibfan',
      },
      en: {
        bronzeTitle: 'Spell Checker',
        description: 'Use spell check {n} times in a single game.',
        goldTitle: 'Spell Expert',
        lastDescription: 'Used spell check 100 times in a single game.',
        lastTitle: 'Dyslexic',
        platinumTitle: 'Spell Master',
        silverTitle: 'Spell Enthusiast',
      },
      es: {
        bronzeTitle: 'Corrector ortográfico',
        description: 'Usa el corrector ortográfico {n} veces en una sola partida.',
        goldTitle: 'Experto ortográfico',
        lastDescription: 'Usó el corrector ortográfico 100 veces en una sola partida.',
        lastTitle: 'Disléxico',
        platinumTitle: 'Maestro ortográfico',
        silverTitle: 'Entusiasta ortográfico',
      },
      fr: {
        bronzeTitle: 'Correcteur orthographique',
        description: 'Utilisez la correction orthographique {n} fois en une seule partie.',
        goldTitle: 'Expert orthographique',
        lastDescription: 'Utilisé la correction orthographique 100 fois en une seule partie.',
        lastTitle: 'Dyslexique',
        platinumTitle: 'Maître orthographique',
        silverTitle: 'Passionné orthographique',
      },
      it: {
        bronzeTitle: 'Controllo ortografico',
        description: 'Usa il controllo ortografico {n} volte in una singola partita.',
        goldTitle: 'Esperto ortografico',
        lastDescription: 'Usato il controllo ortografico 100 volte in una singola partita.',
        lastTitle: 'Dislessico',
        platinumTitle: 'Maestro ortografico',
        silverTitle: 'Appassionato ortografico',
      },
      jp: {
        bronzeTitle: 'スペルチェッカー',
        description: '1つのゲームで{n}回スペルチェックを使用する。',
        goldTitle: 'スペルエキスパート',
        lastDescription: '1つのゲームで100回スペルチェックを使用した。',
        lastTitle: '失読症',
        platinumTitle: 'スペルマスター',
        silverTitle: 'スペル愛好家',
      },
      ko: {
        bronzeTitle: '맞춤법 검사기',
        description: '한 게임에서 {n}번 맞춤법 검사를 사용하세요.',
        goldTitle: '맞춤법 전문가',
        lastDescription: '한 게임에서 100번 맞춤법 검사를 사용했습니다.',
        lastTitle: '독서장애',
        platinumTitle: '맞춤법 마스터',
        silverTitle: '맞춤법 애호가',
      },
      pt: {
        bronzeTitle: 'Corretor ortográfico',
        description: 'Use a verificação ortográfica {n} vezes em uma única partida.',
        goldTitle: 'Especialista ortográfico',
        lastDescription: 'Usou a verificação ortográfica 100 vezes em uma única partida.',
        lastTitle: 'Disléxico',
        platinumTitle: 'Mestre ortográfico',
        silverTitle: 'Entusiasta ortográfico',
      },
      ru: {
        bronzeTitle: 'Проверка орфографии',
        description: 'Используйте проверку орфографии {n} раз в одной игре.',
        goldTitle: 'Эксперт по орфографии',
        lastDescription: 'Использована проверка орфографии 100 раз в одной игре.',
        lastTitle: 'Дислексик',
        platinumTitle: 'Мастер орфографии',
        silverTitle: 'Энтузиаст орфографии',
      },
      zh: {
        bronzeTitle: '拼寫檢查者',
        description: '在一場比賽中啟用 {n} 次拼寫檢查。',
        goldTitle: '拼寫專家',
        lastDescription: '在一場比賽中啟用了 100 次拼寫檢查。',
        lastTitle: '色盲',
        platinumTitle: '拼寫大師',
        silverTitle: '拼寫愛好者',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'game',
    getValue: () => touchesState.spellingClicks,
    id: 'spellingClicks',
    get lastDescription() {
      return t('lastDescription');
    },
    get lastTitle() {
      return t('lastTitle');
    },
    thresholds: [
      {
        get description() {
          return t('description', { n: 10 });
        },
        get nextTitle() {
          return t('bronzeTitle');
        },
        rank: 'bronze',
        val: 10,
      },
      {
        get description() {
          return t('description', { n: 20 });
        },
        get nextTitle() {
          return t('silverTitle');
        },
        rank: 'silver',
        val: 20,
      },
      {
        get description() {
          return t('description', { n: 50 });
        },
        get nextTitle() {
          return t('goldTitle');
        },
        rank: 'gold',
        val: 50,
      },
      {
        get description() {
          return t('description', { n: 100 });
        },
        get nextTitle() {
          return t('platinumTitle');
        },
        rank: 'platinum',
        val: 100,
      },
    ],
  });
};
