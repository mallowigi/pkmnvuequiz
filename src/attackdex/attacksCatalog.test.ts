import { describe, expect, it } from 'vitest';

import moveTranslationsFile from '@/data/moveTranslations.json';
import attacksFile from '@/data/attacks.json';
import { parseAttackDexCatalog } from '@/schemas/attackDexCatalog.schema.ts';
import type { AttackDexMove } from '@/attackdex/types.ts';

// Contract tests for the checked-in AttackDex move catalog (#72). These
// assert properties of the generated data itself -- not the generator
// script's internals -- so they keep protecting the catalog even if the
// import script is later rewritten.
describe('attacks.json catalog', () => {
  const result = parseAttackDexCatalog(attacksFile);

  it('is a valid, schema-conformant catalog', () => {
    expect(result.success).toBe(true);
  });

  const moves = result.success ? (result.data.moves as AttackDexMove[]) : [];
  const byId = new Map(
    moves.map((m) => [
      m.id,
      m,
    ]),
  );

  it('is non-empty and reasonably close to the known PokeAPI move count', () => {
    expect(moves.length).toBeGreaterThan(800);
  });

  it('has no duplicate ids', () => {
    const ids = moves.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('excludes Colosseum/XD Shadow moves', () => {
    // Colosseum/XD Shadow moves use PokeAPI's synthetic `shadow` elemental
    // type, which isn't part of our Type enum -- schema validity above
    // already proves none slipped through, but assert explicitly by id too.
    const shadowExclusiveIds = [
      'shadow-rush',
      'shadow-blast',
      'shadow-blitz',
      'shadow-half',
      'shadow-hold',
    ];
    for (const id of shadowExclusiveIds) {
      expect(byId.has(id)).toBe(false);
    }
    // Ordinary Ghost-type moves that happen to start with "shadow" (not
    // Colosseum/XD exclusives) must still be present.
    expect(byId.has('shadow-ball')).toBe(true);
  });

  it('classifies every move into exactly one scope, standard xor special', () => {
    for (const move of moves) {
      if (move.placement.scope === 'standard') {
        expect(move.placement).not.toHaveProperty('moveType');
      } else {
        expect(move.placement.scope).toBe('special');
        expect([
          'zmove',
          'max',
          'gmax',
        ]).toContain(move.placement.moveType);
      }
    }
  });

  it('includes all three approved Special families with at least one member each', () => {
    const byMoveType = (type: string) =>
      moves.filter((m) => m.placement.scope === 'special' && m.placement.moveType === type);

    expect(byMoveType('zmove').length).toBeGreaterThan(0);
    expect(byMoveType('max').length).toBeGreaterThan(0);
    expect(byMoveType('gmax').length).toBeGreaterThan(0);
  });

  it('groups Breakneck Blitz physical/special records into one move with two variants', () => {
    const move = byId.get('breakneck-blitz');
    expect(move).toBeDefined();
    expect(move?.placement).toEqual({ moveType: 'zmove', scope: 'special' });
    expect(move?.variants).toHaveLength(2);
    expect(move?.variants.map((v) => v.category).sort()).toEqual([
      'physical',
      'special',
    ]);
  });

  it('marks supplemental G-Max moves with a project-owned id and no PokeAPI apiId', () => {
    const move = byId.get('local-g-max-wildfire');
    expect(move).toBeDefined();
    expect(move?.placement).toEqual({ moveType: 'gmax', scope: 'special' });
    expect(move?.variants[0].apiId).toBeNull();
  });

  it('maps Legends: Arceus-introduced moves to gen8 with a hisui box', () => {
    const move = byId.get('wave-crash');
    expect(move).toBeDefined();
    expect(move?.placement).toEqual({ box: 'hisui', gen: 'gen8', scope: 'standard' });
  });

  it('does not tag a Sword/Shield move reused in Legends: Arceus as hisui', () => {
    const move = byId.get('wicked-blow');
    expect(move).toBeDefined();
    expect(move?.placement).toEqual({ gen: 'gen8', scope: 'standard' });
  });

  it('preserves genuinely variable power as null rather than coercing to zero', () => {
    const move = byId.get('seismic-toss');
    expect(move).toBeDefined();
    expect(move?.variants[0].power).toBeNull();
    expect(move?.variants[0].accuracy).toBe(100);
  });

  it('preserves guaranteed accuracy as null rather than coercing to 100', () => {
    const move = byId.get('aerial-ace');
    expect(move).toBeDefined();
    expect(move?.variants[0].accuracy).toBeNull();
  });
});

describe('moveTranslations.json', () => {
  const translations = (moveTranslationsFile as { translations: Record<string, Record<string, string>> }).translations;

  it('has an English name for every translated move', () => {
    const entries = Object.values(translations);
    expect(entries.length).toBeGreaterThan(800);
    for (const entry of entries) {
      expect(typeof entry.en).toBe('string');
      expect(entry.en.length).toBeGreaterThan(0);
    }
  });

  it('keys translations by the same id used in the move catalog', () => {
    expect(translations['breakneck-blitz']).toBeDefined();
    expect(translations['breakneck-blitz'].en).toBe('Breakneck Blitz');
  });

  it('has no supplemental G-Max entries (no sourced translations available)', () => {
    expect(translations['local-g-max-wildfire']).toBeUndefined();
  });
});
