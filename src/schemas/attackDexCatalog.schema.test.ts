import { describe, expect, it } from 'vitest';

import { parseAttackDexCatalog } from '@/schemas/attackDexCatalog.schema.ts';

const validMove = {
  aliases: [],
  id: 'tackle',
  name: 'Tackle',
  placement: { gen: 'gen1' as const, scope: 'standard' as const },
  variants: [
    {
      accuracy: 100,
      apiId: 33,
      category: 'physical' as const,
      description: 'A physical attack.',
      effect: 'Inflicts regular damage.',
      name: 'Tackle',
      power: 40,
      pp: 35,
      type: 'normal' as const,
    },
  ],
};

const validCatalog = {
  generatedAt: '2026-01-01T00:00:00.000Z',
  moves: [validMove],
  sourceVersion: 1 as const,
};

describe('attackDexCatalog.schema', () => {
  it('accepts a valid standard-scope catalog', () => {
    const result = parseAttackDexCatalog(validCatalog);
    expect(result.success).toBe(true);
  });

  it('accepts a valid special-scope move with a regional box on standard moves', () => {
    const result = parseAttackDexCatalog({
      ...validCatalog,
      moves: [
        {
          ...validMove,
          id: 'wave-crash',
          name: 'Wave Crash',
          placement: { box: 'hisui', gen: 'gen8', scope: 'standard' },
        },
        {
          ...validMove,
          id: 'breakneck-blitz',
          name: 'Breakneck Blitz',
          placement: { moveType: 'zmove', scope: 'special' },
          variants: [
            { ...validMove.variants[0], apiId: 622 },
            { ...validMove.variants[0], apiId: 623, category: 'special' },
          ],
        },
      ],
    });
    expect(result.success).toBe(true);
  });

  it('rejects a move with no variants', () => {
    const result = parseAttackDexCatalog({
      ...validCatalog,
      moves: [{ ...validMove, variants: [] }],
    });
    expect(result.success).toBe(false);
  });

  it('rejects a special-scope move missing moveType', () => {
    const result = parseAttackDexCatalog({
      ...validCatalog,
      moves: [{ ...validMove, placement: { scope: 'special' } }],
    });
    expect(result.success).toBe(false);
  });

  it('rejects an unsupported sourceVersion', () => {
    const result = parseAttackDexCatalog({ ...validCatalog, sourceVersion: 2 });
    expect(result.success).toBe(false);
  });

  it('rejects an invalid elemental type', () => {
    const result = parseAttackDexCatalog({
      ...validCatalog,
      moves: [{ ...validMove, variants: [{ ...validMove.variants[0], type: 'shadow' }] }],
    });
    expect(result.success).toBe(false);
  });

  it('rejects a malformed payload entirely', () => {
    const result = parseAttackDexCatalog({ moves: 'not-an-array' });
    expect(result.success).toBe(false);
  });
});
