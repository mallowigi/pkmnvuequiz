import { describe, expect, it } from 'vitest';

import type { AttackDexMove } from '@/attackdex/types.ts';
import attacksFile from '@/data/attacks.json';
import moveTranslationsFile from '@/data/moveTranslations.json';
import { parseAttackDexCatalog } from '@/schemas/attackDexCatalog.schema.ts';

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
  const byId = new Map(moves.map((m) => [m.id, m]));

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
    const shadowExclusiveIds = ['shadow-rush', 'shadow-blast', 'shadow-blitz', 'shadow-half', 'shadow-hold'];
    for (const id of shadowExclusiveIds) {
      expect(byId.has(id)).toBe(false);
    }
    // Ordinary Ghost-type moves that happen to start with "shadow" (not
    // Colosseum/XD exclusives) must still be present.
    expect(byId.has('shadow-ball')).toBe(true);
  });

  it('classifies every move into exactly one scope, standard xor special', () => {
    for (const move of moves) {
      if (move.scope === 'standard') {
        expect(move).not.toHaveProperty('moveType');
      } else {
        expect(move.scope).toBe('special');
        expect(['zmove', 'max', 'gmax']).toContain(move.moveType);
      }
    }
  });

  it('includes all three approved Special families with at least one member each', () => {
    const byMoveType = (type: string) => moves.filter((m) => m.scope === 'special' && m.moveType === type);

    expect(byMoveType('zmove').length).toBeGreaterThan(0);
    expect(byMoveType('max').length).toBeGreaterThan(0);
    expect(byMoveType('gmax').length).toBeGreaterThan(0);
  });

  it('collapses Breakneck Blitz physical/special records into one move with a variable category', () => {
    const move = byId.get('breakneck-blitz');
    expect(move).toBeDefined();
    expect(move?.scope).toBe('special');
    expect(move && move.scope === 'special' ? move.moveType : undefined).toBe('zmove');
    expect(move?.category).toBe('variable');
  });

  it('marks supplemental G-Max moves with a project-owned id', () => {
    const move = byId.get('local-g-max-wildfire');
    expect(move).toBeDefined();
    expect(move?.scope).toBe('special');
    expect(move && move.scope === 'special' ? move.moveType : undefined).toBe('gmax');
  });

  it('maps Legends: Arceus-introduced moves to gen8 with a hisui box', () => {
    const move = byId.get('wave-crash');
    expect(move).toBeDefined();
    expect(move?.scope).toBe('standard');
    expect(move?.gen).toBe('gen8');
    expect(move && move.scope === 'standard' ? move.box : undefined).toBe('hisui');
  });

  it('does not tag a Sword/Shield move reused in Legends: Arceus as hisui', () => {
    const move = byId.get('wicked-blow');
    expect(move).toBeDefined();
    expect(move?.scope).toBe('standard');
    expect(move?.gen).toBe('gen8');
    expect(move && move.scope === 'standard' ? move.box : undefined).toBeUndefined();
  });

  it('assigns every move a generation, including the Special families', () => {
    for (const move of moves) {
      expect(move.gen).toBeDefined();
    }

    // Z-Moves debuted in Gen 7; Max and G-Max Moves both debuted in Gen 8.
    const gensOf = (type: string) =>
      new Set(moves.filter((m) => m.scope === 'special' && m.moveType === type).map((m) => m.gen));

    expect(gensOf('zmove')).toEqual(new Set(['gen7']));
    expect(gensOf('max')).toEqual(new Set(['gen8']));
    expect(gensOf('gmax')).toEqual(new Set(['gen8']));
  });

  it('preserves genuinely variable power as null rather than coercing to zero', () => {
    const move = byId.get('seismic-toss');
    expect(move).toBeDefined();
    expect(move?.power).toBeNull();
    expect(move?.accuracy).toBe(100);
  });

  it('preserves guaranteed accuracy as null rather than coercing to 100', () => {
    const move = byId.get('aerial-ace');
    expect(move).toBeDefined();
    expect(move?.accuracy).toBeNull();
  });

  it('has no nested placement/variants objects (flat entries only)', () => {
    for (const move of moves) {
      expect(move).not.toHaveProperty('placement');
      expect(move).not.toHaveProperty('variants');
      expect(move).not.toHaveProperty('aliases');
      expect(move).not.toHaveProperty('apiId');
      expect(move).not.toHaveProperty('description');
      expect(move).not.toHaveProperty('effect');
    }
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
