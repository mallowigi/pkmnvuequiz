import type { MoveTypeInfo } from '@/types.ts';

// Visual treatment for AttackDex's `movetype` mode button: it represents all
// Special-family moves (Z-Moves, Max Moves, G-Max Moves) at once, the same
// way the Pokemon `mega` mode has no sub-picker. Uses its own icon/color so
// it isn't confused with Pokemon's `mega`/`special` buttons.
export const moveTypeInfo: MoveTypeInfo = {
  bgColor: '#e63946',
  buttonColor: '#d12d3a',
  darkBgColor: '#a4212b',
  fgColor: '#ffffff',
  icon: 'MOVETYPE',
  id: 'movetype',
  index: 0,
  inlineColor: '#e63946',
  lightBgColor: '#f2828d',
  lightFgColor: '#111111',
  name: 'Move Type',
  symbol: '★',
};
