import type { Directive } from 'vue';

import { useTooltips } from '@/stores/useTooltips.ts';

export type TooltipDirective = Directive<HTMLElement, string>;

declare module 'vue' {
  export interface GlobalDirectives {
    vTooltip: TooltipDirective;
  }
}

export default {
  mounted(el: HTMLElement, binding: { value: string }) {
    const { setTooltip } = useTooltips();

    el.addEventListener('mouseenter', () => {
      if (!el.className.includes('disabled')) {
        return;
      }

      const rect = el.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top - rect.height / 2;
      setTooltip(binding.value, x, y);
    });

    el.addEventListener('mouseleave', () => {
      setTooltip(null, 0, 0);
    });
  },
} satisfies TooltipDirective;
