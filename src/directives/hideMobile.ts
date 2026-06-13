import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import type { Directive, DirectiveBinding } from 'vue';

export type HideMobileDirective = Directive<HTMLElement, string | null>;

declare module 'vue' {
  export interface GlobalDirectives {
    vHideMobile: HideMobileDirective;
  }
}

type Breakpoint = keyof typeof breakpointsTailwind;

interface BreakpointState {
  breakpoint?: Breakpoint;
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const breakpoints = useBreakpoints(breakpointsTailwind);
    const state: BreakpointState = {
      breakpoint: (binding.arg as Breakpoint) || '2xl',
    };

    const activeBreakpoint = breakpoints.active();

    const updateVisibility = () => {
      if (!state.breakpoint) return;

      const breakpointIndex = breakpointsTailwind[state.breakpoint];
      const activeIndex = breakpointsTailwind[activeBreakpoint.value as Breakpoint];

      if (activeIndex < breakpointIndex) {
        el.style.display = 'none';
      }
    };

    updateVisibility();
  },
} satisfies HideMobileDirective;
