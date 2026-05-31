import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

interface TooltipState {
  tooltip: string | null;
  x: number;
  y: number;
  placement: 'top' | 'bottom' | 'left' | 'right';
}

export const useTooltips = defineStore('tooltips', () => {
  const state = reactive<TooltipState>({
    placement: 'top',
    tooltip: null,
    x: 0,
    y: 0,
  });

  const setTooltip = (tooltip: string | null, x = 0, y = 0, placement: 'top' | 'bottom' | 'left' | 'right' = 'top') => {
    state.tooltip = tooltip;
    state.x = x;
    state.y = y;
    state.placement = placement;
  };

  return {
    setTooltip,
    state,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTooltips, import.meta.hot));
}
