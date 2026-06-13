import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { type ComputedRef, type Directive, type DirectiveBinding, watch, type WatchStopHandle } from 'vue';

export type BreakpointDirective = Directive<HTMLElement, string | null>;

declare module 'vue' {
  export interface GlobalDirectives {
    vBreakpoint: BreakpointDirective;
  }
}

type Breakpoint = keyof typeof breakpointsTailwind;

const breakpoints = useBreakpoints(breakpointsTailwind);

// Cache to store computed isMobile values for each breakpoint to avoid redundant computations
const isMobileCache = new Map<Breakpoint, ComputedRef<boolean>>();

const isMobileViewport = (breakpoint: Breakpoint) => {
  let isMobile = isMobileCache.get(breakpoint);
  if (!isMobile) {
    isMobile = breakpoints.smaller(breakpoint);
    isMobileCache.set(breakpoint, isMobile);
  }
  return isMobile;
};

// Map to store stop handles for each element to prevent memory leaks
const stopMap = new WeakMap<HTMLElement, WatchStopHandle>();

export default {
  mounted: (el: HTMLElement, binding: DirectiveBinding) => {
    // Clean up old watcher if it exists (e.g., if the breakpoint changed)
    stopMap.get(el)?.();

    const breakpoint = (binding.arg as Breakpoint) || 'sm';
    const isMobile = isMobileViewport(breakpoint);

    const watcher = watch(
      isMobile,
      (value) => {
        if (value) {
          el.style.display = 'none';
          return;
        }

        el.style.display = '';
      },
      { immediate: true },
    );

    stopMap.set(el, watcher);
  },

  unmounted(el) {
    stopMap.get(el)?.();
    stopMap.delete(el);
  },
} satisfies BreakpointDirective;
