import {
  browserLocalPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';

import { auth } from '@/firebase';
import { useMessages } from '@/stores/useMessages';
import { useSettings } from '@/stores/useSettings';

export const useGoogleAuth = () => {
  const { setName, setAvatar } = useSettings();
  const { showUserMessage } = useMessages();

  const authenticateWithGoogle = async () => {
    await setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
          .then(async (result) => {
            const user = result.user;
            const photoURL = user.photoURL?.replace(/=s\d+-c/, '=s500-c') || user.photoURL;

            if (photoURL && user.photoURL !== photoURL) {
              await updateProfile(user, { photoURL });
            }

            setName(user.displayName ?? 'Trainer');
            setAvatar(photoURL);
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

  return { authenticateWithGoogle };
};
