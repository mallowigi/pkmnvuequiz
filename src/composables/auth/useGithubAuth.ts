import { useOnline } from '@vueuse/core';
import {
  browserLocalPersistence,
  GithubAuthProvider,
  setPersistence,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';

import { auth } from '@/firebase';
import { i18n } from '@/main.ts';
import { useMessages } from '@/stores/useMessages';
import { useSettings } from '@/stores/useSettings';

export const useGithubAuth = () => {
  const { setName, setAvatar } = useSettings();
  const { showUserMessage } = useMessages();

  const authenticateWithGithub = async () => {
    const online = useOnline();
    if (!online) {
      showUserMessage(i18n.global.t('offlineModeAuthenticate'), 'error');
      return;
    }

    await setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const provider = new GithubAuthProvider();

        signInWithPopup(auth, provider)
          .then(async (result) => {
            const user = result.user;
            const photoURL = user.photoURL;

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

  return { authenticateWithGithub };
};
