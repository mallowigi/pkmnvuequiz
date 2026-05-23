import { useCurrentGen } from '@/stores/useCurrentGen.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { useDialogs } from '@/stores/useDialogs.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import { useState } from '@/stores/useState.ts';
import { useTimer } from '@/stores/useTimer.ts';
import { scrollToTop } from '@/utils/utils.ts';
import type { Type, Gen } from '@/types.ts';

export const useQuiz = ({ withDialog = false } = {}) => {
  const { startGame, setGameSelectionState } = useGameFlow();
  const { setGameMode, state } = useState();
  const { setDialog } = useDialogs();
  const { clearCurrentGen, setCurrentGen } = useCurrentGen();
  const { clearCurrentType, setCurrentType } = useCurrentType();
  const { resetPokemonState } = usePokemons();
  const { resetTimer } = useTimer();

  const setFullQuiz = () => {
    if (state.gameMode === 'full') return;

    const onQuizStart = () => {
      setGameMode('full');
      clearCurrentGen();
      clearCurrentType();
      resetPokemonState();
      resetTimer();
      startGame();
      scrollToTop();
    };

    if (withDialog) {
      setDialog('switchQuiz', () => {
        onQuizStart();
      });
      return;
    }

    onQuizStart();
  };

  const setGenQuiz = (gen: Gen) => {
    const onQuizStart = () => {
      setGameMode('gen');
      clearCurrentType();
      setCurrentGen(gen);
      resetPokemonState();
      resetTimer();
      startGame();
      scrollToTop();
    };

    if (withDialog) {
      setDialog('switchQuiz', () => {
        onQuizStart();
      });
      return;
    }

    onQuizStart();
  };

  const setTypeQuiz = () => {
    const onQuizStart = () => {
      clearCurrentGen();
      clearCurrentType();
      resetPokemonState();
      resetTimer();
      setGameSelectionState('types');
      scrollToTop();
    };

    if (withDialog) {
      setDialog('switchQuiz', () => {
        onQuizStart();
      });
      return;
    }

    onQuizStart();
  };

  const setTypeOrSpecial = (type: string) => {
    clearCurrentGen();
    switch (type) {
      case 'special':
        setGameMode('special');
        clearCurrentType();
        break;
      default:
        setGameMode('types');
        setCurrentType(type as Type);
    }
    resetPokemonState();
    resetTimer();
    setGameSelectionState(null);
    startGame();
    scrollToTop();
  };

  return {
    setFullQuiz,
    setGenQuiz,
    setTypeOrSpecial,
    setTypeQuiz,
  };
};
