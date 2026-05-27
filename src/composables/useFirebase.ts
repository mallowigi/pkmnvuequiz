import { useFirestore } from '@vueuse/firebase';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { addDoc, collection, doc, getFirestore, limit, orderBy, query, setDoc } from 'firebase/firestore';

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

// Allow anonymous authentication (no stored progress)
const auth = getAuth(app);
signInAnonymously(auth).catch((error) => {
  console.error('Auth failed:', error);
});

const leaderBoardQuery = query(collection(db, 'leaderboards'), orderBy('time', 'asc'), limit(10));

const leaderBoards = useFirestore(leaderBoardQuery, [], {
  autoDispose: false,
  errorHandler: (error) => console.error('Firestore error:', error),
});

export const useFirebase = () => {
  const createRecord = async () => {
    const user = auth.currentUser;

    const gameModes = ['full', 'gen', 'special', 'types'];
    const modes = ['chaos', 'normal', 'order'];
    const randomGameMode = gameModes[Math.floor(Math.random() * gameModes.length)];
    const randomMode = modes[Math.floor(Math.random() * modes.length)];

    const payload = {
      gameMode: randomGameMode,
      mode: randomMode,
      name: 'Player' + Math.floor(Math.random() * 1000),
      numShadows: Math.floor(Math.random() * 20),
      time: 2000 + Math.floor(Math.random() * 50000),
      uid: user ? user.uid : null,
    };

    if (!user) {
      await addDoc(collection(db, 'leaderboards'), payload);
      return;
    }
    await setDoc(doc(db, 'leaderboards', user.uid), payload);
  };

  return {
    createRecord,
    leaderBoards,
  };
};
