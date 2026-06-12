import { useFirestore } from '@vueuse/firebase';
import {
  signInAnonymously,
  signOut,
} from 'firebase/auth';
import { addDoc, collection, doc, limit, orderBy, query, setDoc, where } from 'firebase/firestore';
import { storeToRefs, acceptHMRUpdate, defineStore } from 'pinia';
import { useI18n } from 'vue-i18n';

import { useFacebookAuth } from '@/composables/auth/useFacebookAuth.ts';
import { useGoogleAuth } from '@/composables/auth/useGoogleAuth.ts';
import { auth, db } from '@/firebase.ts';
import { useCurrentGen } from '@/stores/useCurrentGen.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useMessages } from '@/stores/useMessages.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import { useSettings } from '@/stores/useSettings.ts';
import { useState } from '@/stores/useState.ts';
import { useTimer } from '@/stores/useTimer.ts';
import type { UserRecord, GameMode, Gen, Type } from '@/types.ts';

export const useFirebase = defineStore('firebase', () => {
  const { setName, setAvatar } = useSettings();
  const { showUserMessage } = useMessages();
  const { t } = useI18n();

  const { authenticateWithGoogle } = useGoogleAuth();
  const { authenticateWithFacebook } = useFacebookAuth();

  const authenticateAnonymously = async () => {
    signInAnonymously(auth)
      .then((result) => {
        let userName = result.user.displayName ?? 'Trainer';
        setName(userName);
        showUserMessage(t('welcomeBack', { name: userName }));
      })
      .catch((error) => {
        console.error('Auth failed:', error);
        const errorMessage = error.message;
        showUserMessage(errorMessage, 'error');
      });
  };

  const createRecord = async () => {
    const { state } = useState();
    const { settingsState } = useSettings();
    const { flowState } = useGameFlow();
    const { currentTypeState } = useCurrentType();
    const { currentGenState } = useCurrentGen();
    const pokemonStore = usePokemons();
    const { numFound, numShadows } = storeToRefs(pokemonStore);
    const { timerState } = useTimer();

    const user = auth.currentUser;

    const payload: UserRecord = {
      avatar: settingsState.avatar,
      gameMode: state.gameMode!,
      hasGivenUp: flowState.isGivenUp,
      id: user?.uid,
      mode: state.mode,
      name: settingsState.name!,
      numFound: numFound.value,
      numShadows: numShadows.value,
      time: timerState.elapsed,
      uid: user ? user.uid : null,
      usedAutoPause: state.usedAutoPause,
      usedDisplayShadows: state.usedDisplayShadows,
      usedShadowHelper: state.usedShadowHelper,
      usedSpelling: state.usedSpelling,
      usedTypeShuffle: state.usedTypeShuffle,
    };

    if (state.gameMode === 'types') {
      payload.type = currentTypeState.currentType;
    } else if (state.gameMode === 'gen') {
      payload.gen = currentGenState.gen;
    }

    if (!user) {
      await addDoc(collection(db, 'leaderboards'), payload);
      return;
    }
    await setDoc(doc(db, 'leaderboards', user.uid), payload);
  };

  const getTopTrainers = ({
    gameMode,
    gen,
    type,
    uid,
  }: { gameMode?: GameMode | null; gen?: Gen | null; type?: Type | null; uid?: string | null } = {}) => {
    const andCondition = [where('hasGivenUp', '==', false)];
    if (uid) {
      andCondition.push(where('uid', '==', uid));
    }
    if (gameMode) {
      andCondition.push(where('gameMode', '==', gameMode));

      if (gameMode === 'gen' && gen) {
        andCondition.push(where('gen', '==', gen));
      } else if (gameMode === 'types' && type) {
        andCondition.push(where('type', '==', type));
      }
    }

    const leaderBoardQuery = query(collection(db, 'leaderboards'), ...andCondition, orderBy('time', 'asc'), limit(3));

    return useFirestore(leaderBoardQuery, [], {
      autoDispose: false,
      errorHandler: (error) => console.error('Firestore error:', error),
    });
  };

  const signout = async () => {
    const { resetFlowState } = useGameFlow();

    try {
      await signOut(auth);
      setName(null);
      setAvatar(null);
      resetFlowState();
      showUserMessage(t('signedOut'));
    } catch (error) {
      console.error('Sign out failed:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      showUserMessage(errorMessage, 'error');
    }
  };

  return {
    auth,
    authenticateAnonymously,
    authenticateWithFacebook,
    authenticateWithGoogle,
    createRecord,
    getTopTrainers,
    signout,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFirebase, import.meta.hot));
}
