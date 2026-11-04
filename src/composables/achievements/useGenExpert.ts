import { useI18n } from 'vue-i18n';

import { useProfile } from '@/stores/useProfile.ts';
import type { Gen } from '@/types.ts';
import { createAchievement } from '@/utils/utils.ts';
import { useTranslations } from '@/composables/useTranslations.ts';

export function useGenExpert(gen: Gen) {
  const { getGenWins } = useProfile();
  const { getGenTranslation } = useTranslations();
  const name = getGenTranslation(gen);

  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: `{name}学者`,
        description: `完成 {n} 场{name}模式游戏。`,
        goldTitle: `{name}专家`,
        lastDescription: `完成了超过 500 场{name}模式游戏。`,
        lastTitle: `{name}教授`,
        platinumTitle: `{name}大师`,
        silverTitle: `{name}爱好者`,
      },
      de: {
        bronzeTitle: `{name}-Forscher`,
        description: `Schließe {n} {name}-Spiele ab.`,
        goldTitle: `{name}-Experte`,
        lastDescription: `Mehr als 500 {name}-Spiele abgeschlossen.`,
        lastTitle: `{name}-Professor`,
        platinumTitle: `{name}-Meister`,
        silverTitle: `{name}-Fan`,
      },
      en: {
        bronzeTitle: `{name} Scholar`,
        description: `Finish {n} {name} mode games.`,
        goldTitle: `{name} Expert`,
        lastDescription: `Finished more than 500 {name} mode games.`,
        lastTitle: `{name} Professor`,
        platinumTitle: `{name} Master`,
        silverTitle: `{name} Aficionado`,
      },
      es: {
        bronzeTitle: `Erudito de {name}`,
        description: `Completa {n} partidas de modo {name}.`,
        goldTitle: `Experto de {name}`,
        lastDescription: `Más de 500 partidas de modo {name} completadas.`,
        lastTitle: `Profesor de {name}`,
        platinumTitle: `Maestro de {name}`,
        silverTitle: `Aficionado de {name}`,
      },
      fr: {
        bronzeTitle: `Érudit de {name}`,
        description: `Terminez {n} parties en mode {name}.`,
        goldTitle: `Expert de {name}`,
        lastDescription: `Plus de 500 parties en mode {name} terminées.`,
        lastTitle: `Professeur de {name}`,
        platinumTitle: `Maître de {name}`,
        silverTitle: `Connaisseur de {name}`,
      },
      it: {
        bronzeTitle: `Studioso di {name}`,
        description: `Completa {n} partite in modalità {name}.`,
        goldTitle: `Esperto di {name}`,
        lastDescription: `Più di 500 partite in modalità {name} completate.`,
        lastTitle: `Professore di {name}`,
        platinumTitle: `Maestro di {name}`,
        silverTitle: `Appassionato di {name}`,
      },
      jp: {
        bronzeTitle: `{name}学者`,
        description: `{name}モードを{n}回クリア。`,
        goldTitle: `{name}エキスパート`,
        lastDescription: `{name}モードを500回以上クリア。`,
        lastTitle: `{name}博士`,
        platinumTitle: `{name}マスター`,
        silverTitle: `{name}愛好家`,
      },
      ko: {
        bronzeTitle: `{name} 학자`,
        description: `{name} 모드 게임을 {n}회 완료하세요.`,
        goldTitle: `{name} 전문가`,
        lastDescription: `{name} 모드 게임을 500회 이상 완료.`,
        lastTitle: `{name} 박사`,
        platinumTitle: `{name} 마스터`,
        silverTitle: `{name} 애호가`,
      },
      pt: {
        bronzeTitle: `Erudito de {name}`,
        description: `Complete {n} partidas no modo {name}.`,
        goldTitle: `Especialista de {name}`,
        lastDescription: `Mais de 500 partidas no modo {name} completadas.`,
        lastTitle: `Professor de {name}`,
        platinumTitle: `Mestre de {name}`,
        silverTitle: `Aficionado de {name}`,
      },
      ru: {
        bronzeTitle: `Ученый {name}`,
        description: `Завершите {n} игр в режиме {name}.`,
        goldTitle: `Эксперт {name}`,
        lastDescription: `Завершено более 500 игр в режиме {name}.`,
        lastTitle: `Профессор {name}`,
        platinumTitle: `Мастер {name}`,
        silverTitle: `Знаток {name}`,
      },
      zh: {
        bronzeTitle: `{name}學者`,
        description: `完成 {n} 場{name}模式遊戲。`,
        goldTitle: `{name}專家`,
        lastDescription: `完成了超過 500 場{name}模式遊戲。`,
        lastTitle: `{name}教授`,
        platinumTitle: `{name}大師`,
        silverTitle: `{name}愛好者`,
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'game',
    getValue: () => getGenWins(gen),
    id: `genExpert_${gen}`,
    get lastDescription() {
      return t('lastDescription', { name });
    },
    get lastTitle() {
      return t('lastTitle', { name });
    },
    thresholds: [
      {
        get description() {
          return t('description', { n: 10, name });
        },
        get nextTitle() {
          return t('bronzeTitle', { name });
        },
        rank: 'bronze',
        val: 10,
      },
      {
        get description() {
          return t('description', { n: 50, name });
        },
        get nextTitle() {
          return t('silverTitle', { name });
        },
        rank: 'silver',
        val: 50,
      },
      {
        get description() {
          return t('description', { n: 100, name });
        },
        get nextTitle() {
          return t('goldTitle', { name });
        },
        rank: 'gold',
        val: 100,
      },
      {
        get description() {
          return t('description', { n: 500, name });
        },
        get nextTitle() {
          return t('platinumTitle', { name });
        },
        rank: 'platinum',
        val: 500,
      },
    ],
  });
}
