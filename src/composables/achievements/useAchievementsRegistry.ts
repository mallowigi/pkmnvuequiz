import { useBestTimeFull } from '@/composables/achievements/useBestTimeFull.ts';
import { useBoxShuffleWins } from '@/composables/achievements/useBoxShuffleWins.ts';
import { useChallengeWins } from '@/composables/achievements/useChallengeWins.ts';
import { useChaosWins } from '@/composables/achievements/useChaosWins.ts';
import { useCheater } from '@/composables/achievements/useCheater.ts';
import { useDexOrderWins } from '@/composables/achievements/useDexOrderWins.ts';
import { useFirstShiny } from '@/composables/achievements/useFirstShiny.ts';
import { useFirstWin } from '@/composables/achievements/useFirstWin.ts';
import { useFullWins } from '@/composables/achievements/useFullWins.ts';
import { useGenExpert } from '@/composables/achievements/useGenExpert.ts';
import { useHighScorer } from '@/composables/achievements/useHighScorer.ts';
import { useManyCries } from '@/composables/achievements/useManyCries.ts';
import { useManyShadows } from '@/composables/achievements/useManyShadows.ts';
import { useManySpellchecks } from '@/composables/achievements/useManySpellchecks.ts';
import { useMegaWins } from '@/composables/achievements/useMegaWins.ts';
import { useMissingno } from '@/composables/achievements/useMissingno.ts';
import { useNoCriesWins } from '@/composables/achievements/useNoCriesWins.ts';
import { useNoShadowsWins } from '@/composables/achievements/useNoShadowsWins.ts';
import { useNumWins } from '@/composables/achievements/useNumWins.ts';
import { useShinyCollector } from '@/composables/achievements/useShinyCollector.ts';
import { useSpecialWins } from '@/composables/achievements/useSpecialWins.ts';
import { useTimerElapsed } from '@/composables/achievements/useTimerElapsed.ts';
import { useTotalPlayTime } from '@/composables/achievements/useTotalPlayTime.ts';
import { useTotalScore } from '@/composables/achievements/useTotalScore.ts';
import { useTypeExpert } from '@/composables/achievements/useTypeExpert.ts';
import { useTypeShuffleWins } from '@/composables/achievements/useTypeShuffleWins.ts';
import { gens } from '@/data/gens.ts';
import { pokemonTypes } from '@/data/pokemonTypes.ts';
import type { Achievement, Gen, Type } from '@/types.ts';

export const useAchievementsRegistry = (): Record<string, Achievement> => {
  const achievements: Record<string, Achievement> = {
    blankMemory: useManyShadows(),
    boxShuffler: useBoxShuffleWins(),
    cheater: useCheater(),
    cryExpert: useManyCries(),
    dyslexic: useManySpellchecks(),
    encyclopedia: useChaosWins(),
    firstShiny: useFirstShiny(),
    firstWin: useFirstWin(),
    godOfPokemon: useFullWins(),
    highScorer: useHighScorer(),
    legendaryCollector: useSpecialWins(),
    lightSpeed: useBestTimeFull(),
    masterGuesser: useNoShadowsWins(),
    megaResearcher: useMegaWins(),
    missingno: useMissingno(),
    numWins: useNumWins(),
    nuzlocker: useChallengeWins(),
    perfectGuesser: useNoCriesWins(),
    professor: useDexOrderWins(),
    shinyCollector: useShinyCollector(),
    totalPlayTime: useTotalPlayTime(),
    totalScore: useTotalScore(),
    typeShuffler: useTypeShuffleWins(),
    youreSoSlow: useTimerElapsed(),
  };

  // Gen expert achievements
  for (const gen of Object.keys(gens)) {
    achievements[`genExpert_${gen}`] = useGenExpert(gen as Gen);
  }

  // Type expert achievements
  for (const type of Object.keys(pokemonTypes)) {
    achievements[`typeExpert_${type}`] = useTypeExpert(type as Type);
  }

  return achievements;
};
