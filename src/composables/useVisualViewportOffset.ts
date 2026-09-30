import { readonly, ref, watch, type Ref } from 'vue';

/** Tracks the visible viewport's top edge without changing document scrolling. */
export const useVisualViewportOffset = (enabled: Ref<boolean>) => {
  const offsetTop = ref(0);

  watch(
    enabled,
    (active, _, onCleanup) => {
      offsetTop.value = 0;
      if (!active || typeof window === 'undefined') return;

      const viewport = window.visualViewport;
      if (!viewport) return;

      let frame: number | undefined;
      const update = () => {
        frame = undefined;
        offsetTop.value = viewport.scale === 1 ? Math.max(0, viewport.offsetTop) : 0;
      };
      const scheduleUpdate = () => {
        if (frame === undefined) {
          frame = window.requestAnimationFrame(update);
        }
      };

      update();
      viewport.addEventListener('scroll', scheduleUpdate);
      viewport.addEventListener('resize', scheduleUpdate);

      onCleanup(() => {
        viewport.removeEventListener('scroll', scheduleUpdate);
        viewport.removeEventListener('resize', scheduleUpdate);
        if (frame !== undefined) window.cancelAnimationFrame(frame);
      });
    },
    { immediate: true },
  );

  return readonly(offsetTop);
};
