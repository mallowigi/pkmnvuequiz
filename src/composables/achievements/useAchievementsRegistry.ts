import { useBestTimeFull } from '@/composables/achievements/useBestTimeFull.ts';
import { useBoxShuffleWins } from '@/composables/achievements/useBoxShuffleWins.ts';
import { useChallengeWins } from '@/composables/achievements/useChallengeWins.ts';
import { useChaosWins } from '@/composables/achievements/useChaosWins.ts';
import { useCheater } from '@/composables/achievements/useCheater.ts';
import { useComboBreaker } from '@/composables/achievements/useComboBreaker.ts';
import { useDexOrderWins } from '@/composables/achievements/useDexOrderWins.ts';
import { useFirstShiny } from '@/composables/achievements/useFirstShiny.ts';
import { useFirstWin } from '@/composables/achievements/useFirstWin.ts';
import { useFullWins } from '@/composables/achievements/useFullWins.ts';
import { useGameOvers } from '@/composables/achievements/useGameOvers.ts';
import { useGenExpert } from '@/composables/achievements/useGenExpert.ts';
import { useGlobalCries } from '@/composables/achievements/useGlobalCries.ts';
import { useGlobalShadows } from '@/composables/achievements/useGlobalShadows.ts';
import { useGlobalSpelling } from '@/composables/achievements/useGlobalSpelling.ts';
import { useHighScorer } from '@/composables/achievements/useHighScorer.ts';
import { useManyCries } from '@/composables/achievements/useManyCries.ts';
import { useManyShadows } from '@/composables/achievements/useManyShadows.ts';
import { useManySpellchecks } from '@/composables/achievements/useManySpellchecks.ts';
import { useMegaCatcher } from '@/composables/achievements/useMegaCatcher.ts';
import { useMegaWins } from '@/composables/achievements/useMegaWins.ts';
import { useMisses } from '@/composables/achievements/useMisses.ts';
import { useMissingno } from '@/composables/achievements/useMissingno.ts';
import { useNoCriesWins } from '@/composables/achievements/useNoCriesWins.ts';
import { useNoShadowsWins } from '@/composables/achievements/useNoShadowsWins.ts';
import { useNumWins } from '@/composables/achievements/useNumWins.ts';
import { usePokemonCatcher } from '@/composables/achievements/usePokemonCatcher.ts';
import { useShinyCollector } from '@/composables/achievements/useShinyCollector.ts';
import { useSpecialCatcher } from '@/composables/achievements/useSpecialCatcher.ts';
import { useSpecialWins } from '@/composables/achievements/useSpecialWins.ts';
import { useTimerElapsed } from '@/composables/achievements/useTimerElapsed.ts';
import { useTotalPlayTime } from '@/composables/achievements/useTotalPlayTime.ts';
import { useTotalScore } from '@/composables/achievements/useTotalScore.ts';
import { useTypeExpert } from '@/composables/achievements/useTypeExpert.ts';
import { useTypeShuffleWins } from '@/composables/achievements/useTypeShuffleWins.ts';
import { gens } from '@/data/gens.ts';
import { megaTypes } from '@/data/megaTypes.ts';
import { pokemonTypes } from '@/data/pokemonTypes.ts';
import { specialTypes } from '@/data/specialTypes.ts';
import type { Achievement, Gen, MegaType, SpecialType, Type } from '@/types.ts';

export const useAchievementsRegistry = (): Record<string, Achievement> => {
  const achievements: Record<string, Achievement> = {
    blankMemory: useManyShadows(),
    boxShuffler: useBoxShuffleWins(),
    cheater: useCheater(),
    comboBreaker: useComboBreaker(),
    cryExpert: useManyCries(),
    dyslexic: useManySpellchecks(),
    encyclopedia: useChaosWins(),
    firstShiny: useFirstShiny(),
    firstWin: useFirstWin(),
    gameOvers: useGameOvers(),
    globalCries: useGlobalCries(),
    globalShadows: useGlobalShadows(),
    globalSpelling: useGlobalSpelling(),
    godOfPokemon: useFullWins(),
    highScorer: useHighScorer(),
    legendaryCollector: useSpecialWins(),
    lightSpeed: useBestTimeFull(),
    masterGuesser: useNoShadowsWins(),
    megaResearcher: useMegaWins(),
    misses: useMisses(),
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

  // Pokemon catcher achievements - by type
  for (const type of Object.keys(pokemonTypes)) {
    achievements[`pokemonCatcher_${type}`] = usePokemonCatcher(type as Type);
  }

  // Pokemon catcher achievements - by special type (excluding 'no')
  for (const specialType of Object.keys(specialTypes)) {
    if (specialType === 'no') continue;
    achievements[`specialCatcher_${specialType}`] = useSpecialCatcher(specialType as SpecialType);
  }

  // Pokemon catcher achievements - by mega type
  for (const megaType of Object.keys(megaTypes)) {
    achievements[`megaCatcher_${megaType}`] = useMegaCatcher(megaType as MegaType);
  }

  return achievements;
};
