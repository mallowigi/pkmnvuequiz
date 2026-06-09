import { useFirestore } from '@vueuse/firebase';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  type User,
  signInAnonymously,
  setPersistence,
  browserLocalPersistence,
  signOut,
} from 'firebase/auth';
import { addDoc, collection, doc, getFirestore, limit, orderBy, query, setDoc, where } from 'firebase/firestore';
import { storeToRefs, acceptHMRUpdate, defineStore } from 'pinia';
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import { useCurrentGen } from '@/stores/useCurrentGen.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useMessages } from '@/stores/useMessages.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import { useState } from '@/stores/useState.ts';
import { useTimer } from '@/stores/useTimer.ts';
import type { UserRecord, GameMode, Gen, Type, UserData } from '@/types.ts';

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
});
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const useFirebase = defineStore('firebase', () => {
  const { setName } = useState();
  const { showUserMessage } = useMessages();
  const { t } = useI18n();

  const loginState = reactive<UserData>({
    user: null,
  });

  let unsubscribeAuth: (() => void) | null = null;

  const setUser = (data: User | null) => {
    loginState.user = data;
  };

  const initAuth = () => {
    if (unsubscribeAuth) {
      unsubscribeAuth();
    }

    unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setName(user.displayName ?? 'Trainer');
      }
    });
  };

  const authenticateAnonymously = async () => {
    signInAnonymously(auth)
      .then((result) => {
        const user = result.user;
        setUser(user);
        setName('Trainer');
        showUserMessage(t('welcomeBack', { name: 'Trainer' }));
      })
      .catch((error) => {
        console.error('Auth failed:', error);
        const errorMessage = error.message;
        showUserMessage(errorMessage, 'error');
      });
  };

  const authenticateWithGoogle = async () => {
    await setPersistence(auth, browserLocalPersistence)
      .then(() => {
        signInWithPopup(auth, googleProvider)
          .then((result) => {
            const user = result.user;
            setUser(user);
            setName(user.displayName ?? 'Trainer');
          })
          .catch((error) => {
            console.error('Auth failed:', error);
            const errorMessage = error.message;
            showUserMessage(errorMessage, 'error');
          });
      })
      .catch((error) => {
        console.error('Persistence failed:', error);
      });
  };

  const createRecord = async () => {
    const { state } = useState();
    const { flowState } = useGameFlow();
    const { currentTypeState } = useCurrentType();
    const { currentGenState } = useCurrentGen();
    const pokemonStore = usePokemons();
    const { numFound, numShadows } = storeToRefs(pokemonStore);
    const { timerState } = useTimer();

    const user = auth.currentUser;

    const payload: UserRecord = {
      gameMode: state.gameMode!,
      hasGivenUp: flowState.isGivenUp,
      id: user?.uid,
      mode: state.mode,
      name: state.name!,
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
  }: {
    gameMode?: GameMode | null;
    gen?: Gen | null;
    type?: Type | null;
  } = {}) => {
    const andCondition = [where('hasGivenUp', '==', false)];
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
      setUser(null);
      setName(null);
      resetFlowState();
      showUserMessage(t('signedOut'));
    } catch (error) {
      console.error('Sign out failed:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      showUserMessage(errorMessage, 'error');
    }
  };

  return {
    authenticateAnonymously,
    authenticateWithGoogle,
    createRecord,
    getTopTrainers,
    initAuth,
    loginState,
    signout,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFirebase, import.meta.hot));
}
