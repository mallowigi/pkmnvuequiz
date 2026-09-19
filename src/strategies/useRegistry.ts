import type { DexId, DexStrategy } from '@/strategies/types.ts';
import { useAttackDexStrategy } from '@/strategies/useAttackDexStrategy.ts';
import { usePokemonDexStrategy } from '@/strategies/usePokemonDexStrategy.ts';

export const useStrategyRegistry = (): Record<DexId, DexStrategy> => {
  const pokemonStrategy = usePokemonDexStrategy();
  const attackStrategy = useAttackDexStrategy();

  return {
    attack: attackStrategy,
    pokemon: pokemonStrategy,
  };
};

export const useAllStrategies = (): DexStrategy[] => Object.values(useStrategyRegistry());
