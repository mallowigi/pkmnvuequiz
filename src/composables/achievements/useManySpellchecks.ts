import { useI18n } from 'vue-i18n';

import { useTouches } from '@/stores/useTouches.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useManySpellchecks = () => {
  const { touchesState } = useTouches();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '偶尔拼错',
        description: '在一场比赛中启用 {n} 次拼写检查。',
        goldTitle: '拼错惯犯',
        lastDescription: '在一场比赛中启用了 100 次拼写检查。',
        lastTitle: '阅读障碍',
        platinumTitle: '拼写灾难',
        silverTitle: '经常拼错',
      },
      de: {
        bronzeTitle: 'Gelegenheitsverschreiber',
        description: 'Nutze die Rechtschreibprüfung {n} Mal in einem Spiel.',
        goldTitle: 'Serienverschreiber',
        lastDescription: 'Die Rechtschreibprüfung 100 Mal in einem Spiel genutzt.',
        lastTitle: 'Dyslektiker',
        platinumTitle: 'Rechtschreibkatastrophe',
        silverTitle: 'Häufiger Verschreiber',
      },
      en: {
        bronzeTitle: 'Occasional Misspeller',
        description: 'Use spell check {n} times in a single game.',
        goldTitle: 'Serial Misspeller',
        lastDescription: 'Used spell check 100 times in a single game.',
        lastTitle: 'Dyslexic',
        platinumTitle: 'Spelling Disaster',
        silverTitle: 'Frequent Misspeller',
      },
      es: {
        bronzeTitle: 'Faltas ocasionales',
        description: 'Usa el corrector ortográfico {n} veces en una sola partida.',
        goldTitle: 'Reincidente ortográfico',
        lastDescription: 'Usó el corrector ortográfico 100 veces en una sola partida.',
        lastTitle: 'Disléxico',
        platinumTitle: 'Desastre ortográfico',
        silverTitle: 'Faltas frecuentes',
      },
      fr: {
        bronzeTitle: 'Fautes occasionnelles',
        description: 'Utilisez la correction orthographique {n} fois en une seule partie.',
        goldTitle: 'Fautes en série',
        lastDescription: 'Utilisé la correction orthographique 100 fois en une seule partie.',
        lastTitle: 'Dyslexique',
        platinumTitle: 'Désastre orthographique',
        silverTitle: 'Fautes fréquentes',
      },
      it: {
        bronzeTitle: 'Errori occasionali',
        description: 'Usa il controllo ortografico {n} volte in una singola partita.',
        goldTitle: 'Errori a raffica',
        lastDescription: 'Usato il controllo ortografico 100 volte in una singola partita.',
        lastTitle: 'Dislessico',
        platinumTitle: 'Disastro ortografico',
        silverTitle: 'Errori frequenti',
      },
      jp: {
        bronzeTitle: 'たまに誤字',
        description: '1つのゲームで{n}回スペルチェックを使用する。',
        goldTitle: '誤字の常習犯',
        lastDescription: '1つのゲームで100回スペルチェックを使用した。',
        lastTitle: '失読症',
        platinumTitle: '誤字の大惨事',
        silverTitle: '誤字が多め',
      },
      ko: {
        bronzeTitle: '가끔 맞춤법 실수',
        description: '한 게임에서 {n}번 맞춤법 검사를 사용하세요.',
        goldTitle: '맞춤법 실수 단골',
        lastDescription: '한 게임에서 100번 맞춤법 검사를 사용했습니다.',
        lastTitle: '난독증',
        platinumTitle: '맞춤법 대참사',
        silverTitle: '잦은 맞춤법 실수',
      },
      pt: {
        bronzeTitle: 'Erros ocasionais',
        description: 'Use a verificação ortográfica {n} vezes em uma única partida.',
        goldTitle: 'Erros em série',
        lastDescription: 'Usou a verificação ortográfica 100 vezes em uma única partida.',
        lastTitle: 'Disléxico',
        platinumTitle: 'Desastre ortográfico',
        silverTitle: 'Erros frequentes',
      },
      ru: {
        bronzeTitle: 'Редкие опечатки',
        description: 'Используйте проверку орфографии {n} раз в одной игре.',
        goldTitle: 'Опечатки без конца',
        lastDescription: 'Использована проверка орфографии 100 раз в одной игре.',
        lastTitle: 'Дислексик',
        platinumTitle: 'Орфографическая катастрофа',
        silverTitle: 'Частые опечатки',
      },
      zh: {
        bronzeTitle: '偶爾拼錯',
        description: '在一場比賽中啟用 {n} 次拼寫檢查。',
        goldTitle: '拼錯慣犯',
        lastDescription: '在一場比賽中啟用了 100 次拼寫檢查。',
        lastTitle: '閱讀障礙',
        platinumTitle: '拼寫災難',
        silverTitle: '經常拼錯',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'game',
    getValue: () => touchesState.spellingClicks,
    id: 'manySpellchecks',
    get lastDescription() {
      return t('lastDescription');
    },
    get lastTitle() {
      return t('lastTitle');
    },
    priority: 10,
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
