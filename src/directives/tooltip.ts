import type { Directive, DirectiveBinding } from 'vue';

import { useTooltips } from '@/stores/useTooltips.ts';

export type TooltipDirective = Directive<HTMLElement, string | null>;

declare module 'vue' {
  export interface GlobalDirectives {
    vTooltip: TooltipDirective;
  }
}

type Placement = 'top' | 'bottom' | 'left' | 'right';

const SHOW_DELAY = 300;
let timeout: ReturnType<typeof setTimeout> | null = null;

interface TooltipState {
  value: string | null;
  placement: Placement;
  modifiers: Partial<Record<string, boolean>>;
  handlers?: {
    mouseenter: (e: MouseEvent) => void;
    mouseleave: (e: MouseEvent) => void;
    click?: (e: MouseEvent) => void;
  };
}

const tooltipMap = new WeakMap<HTMLElement, TooltipState>();

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const state: TooltipState = {
      modifiers: binding.modifiers,
      placement: (binding.arg as Placement) || 'top',
      value: binding.value,
    };
    tooltipMap.set(el, state);

    const { setTooltip } = useTooltips();

    const mouseenter = () => {
      if (timeout) clearTimeout(timeout);

      // Keep a weakmap of elements
      const currentState = tooltipMap.get(el);
      if (!currentState?.value) return;

      timeout = setTimeout(() => {
        const onlyWhenDisabled = currentState.modifiers.disabled;
        const isDisabled = el.classList.contains('disabled') || el.hasAttribute('disabled');

        if (onlyWhenDisabled && !isDisabled) {
          return;
        }

        const rect = el.getBoundingClientRect();
        const placement = currentState.placement;

        let x = rect.left + rect.width / 2;
        let y = rect.top;

        switch (placement) {
          case 'bottom':
            y = rect.bottom;
            break;
          case 'left':
            x = rect.left;
            y = rect.top + rect.height / 2;
            break;
          case 'right':
            x = rect.right;
            y = rect.top + rect.height / 2;
            break;
        }

        setTooltip(currentState.value, x, y, placement);
      }, SHOW_DELAY);
    };

    const mouseleave = () => {
      if (timeout) clearTimeout(timeout);
      setTooltip(null);
    };

    const click = (e: MouseEvent) => {
      const currentState = tooltipMap.get(el);
      if (!currentState) return;

      const isDisabled = el.classList.contains('disabled') || el.hasAttribute('disabled');
      if (currentState.modifiers.disabled && isDisabled) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    };

    el.addEventListener('mouseenter', mouseenter);
    el.addEventListener('mouseleave', mouseleave);

    if (binding.modifiers.disabled) {
      el.style.pointerEvents = 'auto';
      el.addEventListener('click', click, { capture: true });
    }

    state.handlers = { click, mouseenter, mouseleave };
  },

  unmounted(el: HTMLElement) {
    const state = tooltipMap.get(el);
    if (state?.handlers) {
      el.removeEventListener('mouseenter', state.handlers.mouseenter);
      el.removeEventListener('mouseleave', state.handlers.mouseleave);

      if (state.handlers.click) {
        el.removeEventListener('click', state.handlers.click, { capture: true });
      }
    }
    tooltipMap.delete(el);

    if (timeout) {
      clearTimeout(timeout);
    }
  },

  updated(el: HTMLElement, binding: DirectiveBinding) {
    const state = tooltipMap.get(el);
    if (state) {
      state.value = binding.value;
      state.placement = (binding.arg as Placement) || 'top';
      state.modifiers = binding.modifiers;
    }
  },
} satisfies TooltipDirective;
