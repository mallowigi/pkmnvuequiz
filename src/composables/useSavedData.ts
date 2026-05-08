import { useCurrentType } from '@/stores/useCurrentType.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useMessages } from '@/stores/useMessages.ts';
import { useState } from '@/stores/useState.ts';

const { showUserMessage } = useMessages();

export const useSavedData = () => {
  const saveState = () => {
    const { state } = useState();
    const { currentTypeState } = useCurrentType();

    const savedState = {
      ...state,
      currentType: currentTypeState.currentType,
      timer: {
        ...state.timer,
        savedAt: Date.now(),
      },
      version: 1,
    };

    // Simulate a download by creating a blob and a temporary link
    const blob = new Blob([JSON.stringify(savedState)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;

    const [date, time] = new Date().toISOString().split('T');
    const formatDate = date.replace(/-/g, '_');
    const formatTime = time.replace(/:/g, '_').split('.')[0];
    link.download = `pkmn_quiz_state_${formatDate}_${formatTime}.json`;
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const loadState = (e: Event) => {
    const { setState } = useState();
    const { setCurrentType } = useCurrentType();
    const { setFlowState } = useGameFlow();

    const target = e.target as HTMLInputElement;
    const files = Array.from(target.files || []);
    if (files.length === 0) {
      return;
    }

    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const result = e.target?.result as string;
        const loadedState = JSON.parse(result);
        if (loadedState.version !== 1) {
          console.error('Unsupported save version.');
          showUserMessage('Unsupported save version.');
          return;
        }

        const { currentType: loadedCurrentType, version: _version, ...statePayload } = loadedState;

        showUserMessage('Successfully loaded quiz!');

        setCurrentType(loadedCurrentType ?? null);
        setFlowState({
          isEnded: false,
          isPaused: false,
          isStarted: true,
        });
        setState(statePayload);
      } catch (error) {
        console.error('Failed to load state: Invalid file format.', error);
        showUserMessage('Failed to load quiz: Invalid file format.');
      }
    };
    reader.readAsText(file);
  };

  return {
    loadState,
    saveState,
  };
};
