import { useFirebase } from '@/composables/useFirebase.ts';
import type { GameMode, Gen, Type } from '@/types.ts';

type LeaderboardsProps = {
  uid?: string | null;
  gameMode?: GameMode | null;
  gen?: Gen | null;
  type?: Type | null;
};

export const useLeaderboards = () => {
  const { getTopTrainers } = useFirebase();

  const getLeaderboards = (props: LeaderboardsProps) => {
    const gameMode = props.gameMode;
    const gen = props.gen;
    const type = props.type;
    const uid = props.uid;

    return getTopTrainers({
      gameMode,
      gen,
      type,
      uid,
    });
  };

  return {
    getLeaderboards,
  };
};
