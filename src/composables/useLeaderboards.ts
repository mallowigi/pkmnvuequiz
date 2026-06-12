import { useFirebase } from '@/composables/useFirebase.ts';
import { useCurrentGen } from '@/stores/useCurrentGen.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { useState } from '@/stores/useState.ts';
import type { GameMode, Gen, Type } from '@/types.ts';

type LeaderboardsProps = {
  uid?: string | null;
  gameMode?: GameMode | null;
  gen?: Gen | null;
  type?: Type | null;
};

export const useLeaderboards = () => {
  const { currentGenState } = useCurrentGen();
  const { currentTypeState } = useCurrentType();
  const { state } = useState();
  const { getTopTrainers } = useFirebase();

  const getLeaderboards = (props: LeaderboardsProps) => {
    const gameMode = props.gameMode ?? state.gameMode!;
    const gen = props.gen ?? currentGenState.gen;
    const type = props.type ?? currentTypeState.currentType;
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
