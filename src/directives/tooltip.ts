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

let tooltipHandlers: {
  mouseenter: () => void;
  mouseleave: () => void;
} | null = null;

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { setTooltip } = useTooltips();

    const mouseenter = () => {
      if (timeout) clearTimeout(timeout);
      if (!binding.value) return;

      timeout = setTimeout(() => {
        // Specifies that the tooltip only shows when the element is disabled
        const onlyWhenDisabled = binding.modifiers.disabled;
        const isDisabled = el.classList.contains('disabled') || el.hasAttribute('disabled');

        if (onlyWhenDisabled && !isDisabled) {
          return;
        }

        const rect = el.getBoundingClientRect();
        const placement = (binding.arg as Placement) || 'top';
        console.log('Tooltip placement:', binding.arg, placement);

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

        setTooltip(binding.value, x, y, placement);
      }, SHOW_DELAY);
    };

    const mouseleave = () => {
      if (timeout) clearTimeout(timeout);
      setTooltip(null);
    };

    el.addEventListener('mouseenter', mouseenter);
    el.addEventListener('mouseleave', mouseleave);

    if (binding.modifiers.disabled) {
      el.style.pointerEvents = 'auto';
    }

    // Store handlers for cleanup
    tooltipHandlers = { mouseenter, mouseleave };
  },

  unmounted(el: HTMLElement) {
    const handlers = tooltipHandlers;
    if (handlers) {
      el.removeEventListener('mouseenter', handlers.mouseenter);
      el.removeEventListener('mouseleave', handlers.mouseleave);
      tooltipHandlers = null;
    }
    if (timeout) {
      clearTimeout(timeout);
    }
  },
} satisfies TooltipDirective;
