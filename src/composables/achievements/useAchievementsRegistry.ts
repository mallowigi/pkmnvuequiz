import { useChaosWins } from '@/composables/achievements/useChaosWins.ts';
import { useDexOrderWins } from '@/composables/achievements/useDexOrderWins.ts';
import { useFirstShiny } from '@/composables/achievements/useFirstShiny.ts';
import { useFirstWin } from '@/composables/achievements/useFirstWin.ts';
import { useFullWins } from '@/composables/achievements/useFullWins.ts';
import { useGenExpert } from '@/composables/achievements/useGenExpert.ts';
import { useHighScorer } from '@/composables/achievements/useHighScorer.ts';
import { useMegaWins } from '@/composables/achievements/useMegaWins.ts';
import { useNumWins } from '@/composables/achievements/useNumWins.ts';
import { useShinyCollector } from '@/composables/achievements/useShinyCollector.ts';
import { useSpecialWins } from '@/composables/achievements/useSpecialWins.ts';
import { useTypeExpert } from '@/composables/achievements/useTypeExpert.ts';
import { gens } from '@/data/gens.ts';
import { pokemonTypes } from '@/data/pokemonTypes.ts';
import type { Achievement, Gen, Type } from '@/types.ts';

export const useAchievementsRegistry = (): Record<string, Achievement> => {
  const achievements: Record<string, Achievement> = {
    encyclopedia: useChaosWins(),
    firstShiny: useFirstShiny(),
    firstWin: useFirstWin(),
    godOfPokemon: useFullWins(),
    highScorer: useHighScorer(),
    legendaryCollector: useSpecialWins(),
    megaResearcher: useMegaWins(),
    numWins: useNumWins(),
    professor: useDexOrderWins(),
    shinyCollector: useShinyCollector(),
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
