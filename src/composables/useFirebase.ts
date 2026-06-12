import { useFirestore } from '@vueuse/firebase';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  setPersistence,
  browserLocalPersistence,
  signOut,
  FacebookAuthProvider,
} from 'firebase/auth';
import { addDoc, collection, doc, getFirestore, limit, orderBy, query, setDoc, where } from 'firebase/firestore';
import { storeToRefs, acceptHMRUpdate, defineStore } from 'pinia';
import { useI18n } from 'vue-i18n';

import { useCurrentGen } from '@/stores/useCurrentGen.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useMessages } from '@/stores/useMessages.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import { useSettings } from '@/stores/useSettings.ts';
import { useState } from '@/stores/useState.ts';
import { useTimer } from '@/stores/useTimer.ts';
import type { UserRecord, GameMode, Gen, Type } from '@/types.ts';

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
  const { setName, setProfilePic } = useSettings();
  const { showUserMessage } = useMessages();
  const { t } = useI18n();

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

  const authenticateWithGoogle = async () => {
    await setPersistence(auth, browserLocalPersistence)
      .then(() => {
        signInWithPopup(auth, googleProvider)
          .then((result) => {
            const user = result.user;
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

  const authenticateWithFacebook = async () => {
    await setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
            // const user = result.user;

            // 1. Extract the Facebook Access Token from the credential object
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential?.accessToken;

            // 2. Locate the user's explicit Facebook UID from providerData
            const user = result.user;
            let facebookUid = '';

            user.providerData.forEach((profile) => {
              if (profile.providerId === 'facebook.com') {
                facebookUid = profile.uid;
              }
            });

            if (facebookUid && accessToken) {
              // 3. Assemble the authenticated high-resolution image URL
              const authenticatedPhotoUrl = `https://facebook.com/${facebookUid}/picture?type=large&access_token=${accessToken}`;

              console.log('Authenticated Profile Picture URL:', authenticatedPhotoUrl);
              // Pass this authenticatedPhotoUrl directly to your image element/state
              setProfilePic(authenticatedPhotoUrl);
            }

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
    const { settingsState } = useSettings();
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
  }: { gameMode?: GameMode | null; gen?: Gen | null; type?: Type | null } = {}) => {
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
