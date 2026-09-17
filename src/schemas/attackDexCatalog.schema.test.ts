import { describe, expect, it } from 'vitest';

import { parseAttackDexCatalog } from '@/schemas/attackDexCatalog.schema.ts';

const validMove = {
  accuracy: 100,
  category: 'physical' as const,
  gen: 'gen1' as const,
  id: 'tackle',
  name: 'Tackle',
  power: 40,
  pp: 35,
  scope: 'standard' as const,
  type: 'normal' as const,
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

  it('accepts a standard move with a regional box and a special-scope move', () => {
    const result = parseAttackDexCatalog({
      ...validCatalog,
      moves: [
        { ...validMove, box: 'hisui', gen: 'gen8', id: 'wave-crash', name: 'Wave Crash' },
        {
          accuracy: null,
          category: 'variable',
          gen: 'gen7',
          id: 'breakneck-blitz',
          moveType: 'zmove',
          name: 'Breakneck Blitz',
          power: null,
          pp: 1,
          scope: 'special',
          type: 'normal',
        },
      ],
    });
    expect(result.success).toBe(true);
  });

  it('rejects a special-scope move missing moveType', () => {
    const result = parseAttackDexCatalog({
      ...validCatalog,
      moves: [{ ...validMove, moveType: undefined, scope: 'special' }],
    });
    expect(result.success).toBe(false);
  });

  it('rejects a special-scope move missing gen', () => {
    const result = parseAttackDexCatalog({
      ...validCatalog,
      moves: [{ ...validMove, gen: undefined, moveType: 'zmove', scope: 'special' }],
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
      moves: [{ ...validMove, type: 'shadow' }],
    });
    expect(result.success).toBe(false);
  });

  it('rejects a malformed payload entirely', () => {
    const result = parseAttackDexCatalog({ moves: 'not-an-array' });
    expect(result.success).toBe(false);
  });
});
