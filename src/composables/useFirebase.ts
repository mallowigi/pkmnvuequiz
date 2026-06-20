import { useFirestore } from '@vueuse/firebase';
import { signInAnonymously, signOut } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, limit, orderBy, query, setDoc, where, deleteDoc } from 'firebase/firestore';
import { storeToRefs, acceptHMRUpdate, defineStore } from 'pinia';
import { reactive } from 'vue';

import { useFacebookAuth } from '@/composables/auth/useFacebookAuth.ts';
import { useGoogleAuth } from '@/composables/auth/useGoogleAuth.ts';
import { auth, db } from '@/firebase.ts';
import { i18n } from '@/main.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useMessages } from '@/stores/useMessages.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import { useSettings } from '@/stores/useSettings.ts';
import { useTimer } from '@/stores/useTimer.ts';
import type { UserRecord, GameMode, Gen, Type, SaveData } from '@/types.ts';
import { useSavedData } from '@/composables/useSavedData.ts';

type TopTrainersOptions = {
  gameMode?: GameMode | null;
  gen?: Gen | null;
  type?: Type | null;
  uid?: string | null;
};

export const useFirebase = defineStore('firebase', () => {
  const { setName, setAvatar } = useSettings();
  const { showUserMessage } = useMessages();
  const { authenticateWithGoogle } = useGoogleAuth();
  const { authenticateWithFacebook } = useFacebookAuth();

  const firebaseState = reactive({
    isSaving: false,
  });

  let saveTimeout: ReturnType<typeof setTimeout> | null = null;

  const authenticateAnonymously = async () => {
    signInAnonymously(auth)
      .then((result) => {
        let userName = result.user.displayName ?? 'Trainer';
        setName(userName);
        showUserMessage(i18n.global.t('welcomeBack', { name: userName }));
      })
      .catch((error) => {
        console.error('Auth failed:', error);
        const errorMessage = error.message;
        showUserMessage(errorMessage, 'error');
      });
  };

  const createRecord = async () => {
    const { flowState } = useGameFlow();
    const pokemonStore = usePokemons();
    const { numFound, numShadows } = storeToRefs(pokemonStore);
    const { timerState } = useTimer();
    const { getSavedState } = useSavedData();

    const user = auth.currentUser;

    const payload: UserRecord = {
      ...getSavedState(),
      hasGivenUp: flowState.isGivenUp,
      numFound: numFound.value,
      numShadows: numShadows.value,
      time: timerState.elapsed,
      uid: user ? user.uid : null,
    };

    if (user?.uid) {
      payload.id = user.uid;
    }

    if (!user) {
      await addDoc(collection(db, 'leaderboards'), payload);
      return;
    }
    await setDoc(doc(db, 'leaderboards', user.uid), payload);
  };

  const saveUserState = async (data: SaveData) => {
    const user = auth.currentUser;
    if (!user) return;

    firebaseState.isSaving = true;
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }

    saveTimeout = setTimeout(() => {
      firebaseState.isSaving = false;
      saveTimeout = null;
    }, 3000);

    await setDoc(doc(db, 'users', user.uid), data);
  };

  const deleteUserState = async () => {
    const user = auth.currentUser;
    if (!user) return;

    await deleteDoc(doc(db, 'users', user.uid));
  };

  const loadUserState = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  };

  const getTopTrainers = ({ gameMode, gen, type, uid }: TopTrainersOptions = {}) => {
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
      showUserMessage(i18n.global.t('signedOut'));
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
    deleteUserState,
    firebaseState,
    getTopTrainers,
    loadUserState,
    saveUserState,
    signout,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFirebase, import.meta.hot));
}
