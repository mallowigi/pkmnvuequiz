import { useOnline } from '@vueuse/core';
import {
  TwitterAuthProvider,
  browserLocalPersistence,
  setPersistence,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';

import { auth } from '@/firebase';
import { i18n } from '@/main.ts';
import { useMessages } from '@/stores/useMessages';
import { useSettings } from '@/stores/useSettings';

export const useXAuth = () => {
  const { setName, setAvatar } = useSettings();
  const { showUserMessage } = useMessages();

  const authenticateWithX = async () => {
    const online = useOnline();
    if (!online) {
      showUserMessage(i18n.global.t('offlineModeAuthenticate'), 'error');
      return;
    }

    await setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const provider = new TwitterAuthProvider();

        signInWithPopup(auth, provider)
          .then(async (result) => {
            const user = result.user;
            let photoURL = user.photoURL;

            if (photoURL) {
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

  return { authenticateWithX };
};
