import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

interface TooltipState {
  tooltip: string | null;
  x: number;
  y: number;
}

export const useTooltips = defineStore('tooltips', () => {
  const state = reactive<TooltipState>({
    tooltip: null,
    x: 0,
    y: 0,
  });

  const setTooltip = (tooltip: string | null, x: number, y: number) => {
    state.tooltip = tooltip;
    state.x = x;
    state.y = y;
  };

  return {
    setTooltip,
    state,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTooltips, import.meta.hot));
}
