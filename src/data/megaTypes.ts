import type { MegaType, MegaTypeInfo } from '@/types.ts';

export const megaTypes: Record<MegaType, MegaTypeInfo> = {
  gmax: {
    bgColor: '#845ec2',
    buttonColor: '#845ec2',
    darkBgColor: '#2b2f7e',
    fgColor: '#000000',
    icon: 'DARK',
    id: 'gmax',
    index: 1,
    inlineColor: '#424bf5',
    lightBgColor: '#424bf5',
    lightFgColor: '#000000',
    name: 'Gigantamax',
    symbol: '★',
  },
  mega: {
    bgColor: '#3d44b9',
    buttonColor: '#3d60b9',
    darkBgColor: '#2b2f7e',
    fgColor: '#000000',
    icon: 'DRAGON',
    id: 'mega',
    index: 0,
    inlineColor: '#f5c242',
    lightBgColor: '#f5c242',
    lightFgColor: '#000000',
    name: 'Mega Evolution',
    symbol: '★',
  },
};
