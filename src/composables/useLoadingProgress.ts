import { useNProgress } from '@vueuse/integrations/useNProgress';

const { isLoading, progress } = useNProgress(undefined, {
  showSpinner: false,
});

let activeLoaders = 0;
let totalSteps = 0;
let completedSteps = 0;

const updateProgress = () => {
  progress.value = totalSteps > 0 ? completedSteps / totalSteps : 0;
};

function beginLoading(stepCount: number) {
  activeLoaders += 1;
  totalSteps += stepCount;
  updateProgress();
  isLoading.value = true;
}

function reportStep() {
  completedSteps += 1;
  updateProgress();
}

function endLoading() {
  activeLoaders = Math.max(0, activeLoaders - 1);

  if (activeLoaders === 0) {
    isLoading.value = false;
    totalSteps = 0;
    completedSteps = 0;
  }
}

export function useLoadingProgress() {
  return {
    beginLoading,
    endLoading,
    reportStep,
  };
}
