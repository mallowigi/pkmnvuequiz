import type { MegaType, MegaTypeInfo } from '@/types.ts';

export const megaTypes: Record<MegaType, MegaTypeInfo> = {
  gmax: {
    bgColor: '#845ec2',
    buttonColor: '#7049b0',
    darkBgColor: '#593d91',
    fgColor: '#ffffff',
    icon: 'DARK',
    id: 'gmax',
    index: 1,
    inlineColor: '#a178e6',
    lightBgColor: '#c1a8f2',
    lightFgColor: '#111111',
    name: 'Gigantamax',
    symbol: '★',
  },
  mega: {
    bgColor: '#00a8a8',
    buttonColor: '#008a8a',
    darkBgColor: '#006666',
    fgColor: '#ffffff',
    icon: 'MEGA',
    id: 'mega',
    index: 0,
    inlineColor: '#00cfcf',
    lightBgColor: '#33e6e6',
    lightFgColor: '#111111',
    name: 'Mega Evolution',
    symbol: '★',
  },
};

export const megaTypesList = Object.values(megaTypes).sort((a, b) => a.index - b.index);
