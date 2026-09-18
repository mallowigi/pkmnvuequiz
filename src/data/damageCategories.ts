import type { DamageCategoryInfo, DamageCategory } from '@/types.ts';

export const damageCategories: Record<DamageCategory, DamageCategoryInfo> = {
  physical: {
    id: 'physical',
    name: 'Physical',
  },
  special: {
    id: 'special',
    name: 'Special',
  },
  status: {
    id: 'status',
    name: 'Status',
  },
  variable: {
    id: 'variable',
    name: 'Variable',
  },
};
