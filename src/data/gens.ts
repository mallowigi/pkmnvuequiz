import type { GenerationInfo } from '@/types';

export const gens: Record<string, GenerationInfo> = {
  gen1: {
    boxes: ['kanto'],
    id: 'gen1',
    name: 'Gen 1',
    sprites: ['bulbasaur', 'charmander', 'squirtle'],
  },
  gen2: {
    boxes: ['johto'],
    id: 'gen2',
    name: 'Gen 2',
    sprites: ['chikorita', 'cyndaquil', 'totodile'],
  },
  gen3: {
    boxes: ['hoenn'],
    id: 'gen3',
    name: 'Gen 3',
    sprites: ['treecko', 'torchic', 'mudkip'],
  },
  gen4: {
    boxes: ['sinnoh'],
    id: 'gen4',
    name: 'Gen 4',
    sprites: ['turtwig', 'chimchar', 'piplup'],
  },
  gen5: {
    boxes: ['unova'],
    id: 'gen5',
    name: 'Gen 5',
    sprites: ['snivy', 'tepig', 'oshawott'],
  },
  gen6: {
    boxes: ['kalos', 'kalosmega', 'hoennmega'],
    id: 'gen6',
    name: 'Gen 6',
    sprites: ['chespin', 'fennekin', 'froakie'],
  },
  gen7: {
    boxes: ['alola', 'pokemongo'],
    id: 'gen7',
    name: 'Gen 7',
    sprites: ['rowlet', 'litten', 'popplio'],
  },
  gen8: {
    boxes: ['galar', 'gmax', 'hisui'],
    id: 'gen8',
    name: 'Gen 8',
    sprites: ['grookey', 'scorbunny', 'sobble'],
  },
  gen9: {
    boxes: ['paldea', 'areazero', 'lumiose', 'hyperspace'],
    id: 'gen9',
    name: 'Gen 9',
    sprites: ['sprigatito', 'fuecoco', 'quaxly'],
  },
};
