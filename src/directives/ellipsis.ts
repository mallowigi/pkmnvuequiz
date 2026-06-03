import type { Directive, DirectiveBinding } from 'vue';

import { useTooltips } from '@/stores/useTooltips.ts';

export type EllipsisDirective = Directive<HTMLElement, string | null>;

declare module 'vue' {
  export interface GlobalDirectives {
    vEllipsis: EllipsisDirective;
  }
}

type Handlers = { mouseenter: () => void; mouseleave: () => void };

const handlerMap = new WeakMap<HTMLElement, Handlers>();

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.classList.add('text-ellipsis');

    const { setTooltip } = useTooltips();

    const mouseenter = () => {
      // Only show tooltip when text is actually truncated
      if (el.scrollWidth <= el.clientWidth) return;

      const text = binding.value ?? el.textContent ?? '';
      if (!text) return;

      const rect = el.getBoundingClientRect();
      const placement = binding.arg ?? 'top';
      const y = placement === 'top' ? rect.top : rect.bottom;
      setTooltip(text, rect.left + rect.width / 2, y, placement);
    };

    const mouseleave = () => {
      setTooltip(null);
    };

    el.addEventListener('mouseenter', mouseenter);
    el.addEventListener('mouseleave', mouseleave);

    handlerMap.set(el, { mouseenter, mouseleave });
  },

  unmounted(el: HTMLElement) {
    el.classList.remove('text-ellipsis');

    const handlers = handlerMap.get(el);
    if (handlers) {
      el.removeEventListener('mouseenter', handlers.mouseenter);
      el.removeEventListener('mouseleave', handlers.mouseleave);
      handlerMap.delete(el);
    }
  },
} satisfies EllipsisDirective;
