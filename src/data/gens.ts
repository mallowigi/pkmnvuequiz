import type { GenerationInfo } from '@/types';

export const gens: Record<string, GenerationInfo> = {
  gen1: {
    boxes: ['kanto'],
    id: 'gen1',
    name: 'Kanto',
    sprites: ['bulbasaur', 'charmander', 'squirtle'],
  },
  gen2: {
    boxes: ['johto'],
    id: 'gen2',
    name: 'Johto',
    sprites: ['chikorita', 'cyndaquil', 'totodile'],
  },
  gen3: {
    boxes: ['hoenn'],
    id: 'gen3',
    name: 'Hoenn',
    sprites: ['treecko', 'torchic', 'mudkip'],
  },
  gen4: {
    boxes: ['sinnoh'],
    id: 'gen4',
    name: 'Sinnoh',
    sprites: ['turtwig', 'chimchar', 'piplup'],
  },
  gen5: {
    boxes: ['unova'],
    id: 'gen5',
    name: 'Unova',
    sprites: ['snivy', 'tepig', 'oshawott'],
  },
  gen6: {
    boxes: ['kalos', 'kalosmega', 'hoennmega'],
    id: 'gen6',
    name: 'Kalos',
    sprites: ['chespin', 'fennekin', 'froakie'],
  },
  gen7: {
    boxes: ['alola', 'pokemongo'],
    id: 'gen7',
    name: 'Alola',
    sprites: ['rowlet', 'litten', 'popplio'],
  },
  gen8: {
    boxes: ['galar', 'gmax', 'hisui'],
    id: 'gen8',
    name: 'Galar',
    sprites: ['grookey', 'scorbunny', 'sobble'],
  },
  gen9: {
    boxes: ['paldea', 'areazero', 'lumiose', 'hyperspace'],
    id: 'gen9',
    name: 'Paldea',
    sprites: ['sprigatito', 'fuecoco', 'quaxly'],
  },
};
