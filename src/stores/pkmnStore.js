import { reactive, readonly } from 'vue';

const state = reactive({
  data: null,
  isLoaded: false,
});

export async function loadPkmnData() {
  if (state.isLoaded) {
    return;
  }

  const module = await import('@/assets/pkmndata.json');
  state.data = module.default;
  state.isLoaded = true;
}

export const usePkmnData = () => {
  return {
    pkmnData: readonly(state),
    loadPkmnData,
  };
};