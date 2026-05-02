import type { ModeInfo, Mode } from '@/types.ts';

export const modes: Record<Mode, ModeInfo> = {
  chaos: {
    id: 'chaos',
    name: 'Chaos',
  },
  normal: {
    id: 'normal',
    name: 'Normal',
  },
  order: {
    id: 'order',
    name: 'Order',
  },
};
