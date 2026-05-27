import { useFirestore } from '@vueuse/firebase';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { collection, getFirestore, limit, orderBy, query } from 'firebase/firestore';

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
  return {
    leaderBoards,
  };
};
