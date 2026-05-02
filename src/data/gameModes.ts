import type { GameMode, GameModeInfo } from '@/types.ts';

export const gameModes: Record<GameMode, GameModeInfo> = {
  full: {
    id: 'full',
    name: 'Full',
  },
  gen: {
    id: 'gen',
    name: 'Generations',
  },
  special: {
    id: 'special',
    name: 'Special',
  },
  types: {
    id: 'types',
    name: 'Types',
  },
};
