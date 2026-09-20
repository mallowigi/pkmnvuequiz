import type { DamageCategoryInfo, DamageCategory } from '@/types.ts';

export const damageCategories: Record<DamageCategory, DamageCategoryInfo> = {
  physical: {
    color: '#EA6868',
    fgColor: '#ffffff',
    id: 'physical',
    name: 'Physical',
  },
  special: {
    color: '#4470F1',
    fgColor: '#ffffff',
    id: 'special',
    name: 'Special',
  },
  status: {
    color: '#B5AE9F',
    fgColor: '#232323',
    id: 'status',
    name: 'Status',
  },
  variable: {
    color: 'linear-gradient(90deg, #EA6868 50%, #4470F1 50%)',
    fgColor: '#ffffff',
    id: 'variable',
    name: 'Variable',
  },
};
