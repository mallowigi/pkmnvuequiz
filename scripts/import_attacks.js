import fs from 'fs';
import path from 'path';

// Generates the checked-in AttackDex move catalog (`src/data/attacks.json`)
// and its localized display names (`src/data/attackTranslations.json`) from
// PokeAPI. Run manually with `npm run data:attackdex:import` whenever a new
// game/generation adds moves -- this is expected to happen rarely, so the
// script favors clarity over caching/concurrency machinery.
//
// Scope: ordinary standard moves AND Z-Moves/Max Moves/G-Max Moves are all
// imported. Every move is tagged with a `scope` of `standard` or `special`
// so the regular game can exclude Special-family moves from its answer
// pool without having skipped importing them. Only Colosseum/XD Shadow
// moves (PokeAPI's synthetic `shadow` elemental type) are excluded
// entirely. Catalog entries are kept flat and game-only (no
// description/effect text, no apiId/aliases) -- richer per-move text is
// fetched live from PokeAPI when needed, not cached here.
import { MoveClient } from 'pokenode-ts';
import { z } from 'zod';

const CATALOG_PATH = path.resolve('src/data/attacks.json');
const TRANSLATIONS_PATH = path.resolve('src/data/attackTranslations.json');

// PokeAPI's generation resource names map 1:1 to our `Gen` ids. Let's Go
// moves report `generation-vii` and Legends: Arceus moves report
// `generation-viii` already, so no extra geography-based special-casing is
// needed here -- see PokeAPI's `/version-group/legends-arceus` resource.
const GENERATION_MAP = {
  'generation-i': 'gen1',
  'generation-ii': 'gen2',
  'generation-iii': 'gen3',
  'generation-iv': 'gen4',
  'generation-ix': 'gen9',
  'generation-v': 'gen5',
  'generation-vi': 'gen6',
  'generation-vii': 'gen7',
  'generation-viii': 'gen8',
};

// The 18 generic type-based Z-Moves. Each exists in PokeAPI as two records
// (e.g. `breakneck-blitz--physical` / `breakneck-blitz--special`) that
// share one English display name and become one Attack with two
// variants.
const GENERIC_ZMOVE_BASE_NAMES = new Set([
  'breakneck-blitz',
  'all-out-pummeling',
  'supersonic-skystrike',
  'acid-downpour',
  'tectonic-rage',
  'continental-crush',
  'savage-spin-out',
  'never-ending-nightmare',
  'corkscrew-crash',
  'inferno-overdrive',
  'hydro-vortex',
  'bloom-doom',
  'gigavolt-havoc',
  'shattered-psyche',
  'subzero-slammer',
  'devastating-drake',
  'black-hole-eclipse',
  'twinkle-tackle',
]);

// The 17 Pokemon-specific signature Z-Moves. These exist as single PokeAPI
// records (no physical/special split).
const SIGNATURE_ZMOVE_NAMES = new Set([
  'catastropika',
  '10-000-000-volt-thunderbolt',
  'stoked-sparksurfer',
  'extreme-evoboost',
  'pulverizing-pancake',
  'genesis-supernova',
  'sinister-arrow-raid',
  'malicious-moonsault',
  'oceanic-operetta',
  'guardian-of-alola',
  'soul-stealing-7-star-strike',
  'clangorous-soulblaze',
  'splintered-stormshards',
  'lets-snuggle-forever',
  'searing-sunraze-smash',
  'menacing-moonraze-maelstrom',
  'light-that-burns-the-sky',
]);

// G-Max Moves are absent from PokeAPI entirely (a known, documented source
// gap -- see AttackDex spec #68). This reviewed, sourced supplement uses
// ids derived from the move name, matching every other entry, so that
// `normalizeName(id) === normalizeName(name)` holds across the catalog and
// translation lookups resolve. Source: Bulbapedia "G-Max Move" page
// (https://bulbapedia.bulbagarden.net/wiki/G-Max_Move), retrieved for this
// import. Power/category are inherited from whichever base move triggers
// them (`category: 'variable'`), except the three moves with a fixed base
// power of 160 regardless of the triggering move.
const GMAX_SUPPLEMENT = [
  { name: 'G-Max Vine Lash', type: 'grass' },
  { name: 'G-Max Wildfire', type: 'fire' },
  { name: 'G-Max Cannonade', type: 'water' },
  { name: 'G-Max Befuddle', type: 'bug' },
  { name: 'G-Max Volt Crash', type: 'electric' },
  { name: 'G-Max Gold Rush', type: 'normal' },
  { name: 'G-Max Chi Strike', type: 'fighting' },
  { name: 'G-Max Terror', type: 'ghost' },
  { name: 'G-Max Foam Burst', type: 'water' },
  { name: 'G-Max Resonance', type: 'ice' },
  { name: 'G-Max Cuddle', type: 'normal' },
  { name: 'G-Max Replenish', type: 'normal' },
  { name: 'G-Max Malodor', type: 'poison' },
  { name: 'G-Max Meltdown', type: 'steel' },
  { name: 'G-Max Drum Solo', power: 160, type: 'grass' },
  { name: 'G-Max Fireball', power: 160, type: 'fire' },
  { name: 'G-Max Hydrosnipe', power: 160, type: 'water' },
  { name: 'G-Max Wind Rage', type: 'flying' },
  { name: 'G-Max Gravitas', type: 'psychic' },
  { name: 'G-Max Stonesurge', type: 'water' },
  { name: 'G-Max Volcalith', type: 'rock' },
  { name: 'G-Max Tartness', type: 'grass' },
  { name: 'G-Max Sweetness', type: 'grass' },
  { name: 'G-Max Sandblast', type: 'ground' },
  { name: 'G-Max Stun Shock', type: 'electric' },
  { name: 'G-Max Centiferno', type: 'fire' },
  { name: 'G-Max Smite', type: 'fairy' },
  { name: 'G-Max Snooze', type: 'dark' },
  { name: 'G-Max Finale', type: 'fairy' },
  { name: 'G-Max Steelsurge', type: 'steel' },
  { name: 'G-Max Depletion', type: 'dragon' },
  { name: 'G-Max One Blow', type: 'dark' },
  { name: 'G-Max Rapid Flow', type: 'water' },
];

const RETRY_ATTEMPTS = 3;
const BATCH_SIZE = 15;

// Memoized version-group `order` lookups (used to detect Legends: Arceus
// -introduced moves -- see `isLegendsArceusOnly` below). There are only
// ~30 version groups total, so this is a handful of one-off requests.
const versionGroupOrderCache = new Map();

async function getVersionGroupOrder(name) {
  if (versionGroupOrderCache.has(name)) return versionGroupOrderCache.get(name);
  const data = await withRetry(
    () => fetch(`https://pokeapi.co/api/v2/version-group/${name}`).then((res) => res.json()),
    `fetching version group "${name}"`,
  );
  versionGroupOrderCache.set(name, data.order);
  return data.order;
}

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

async function withRetry(fn, description) {
  let lastError;
  for (let attempt = 1; attempt <= RETRY_ATTEMPTS; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      console.warn(`  retrying ${description} (attempt ${attempt}/${RETRY_ATTEMPTS}): ${error.message}`);
    }
  }
  throw new Error(`Failed ${description} after ${RETRY_ATTEMPTS} attempts: ${lastError.message}`);
}

async function fetchAllMoves(client) {
  const list = await withRetry(() => client.listMoves(0, 2000), 'listing moves');
  return list.results;
}

async function fetchMoveDetails(client, summaries) {
  const details = [];
  for (let i = 0; i < summaries.length; i += BATCH_SIZE) {
    const batch = summaries.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(
      batch.map((summary) => withRetry(() => client.getMoveByName(summary.name), `fetching move "${summary.name}"`)),
    );
    details.push(...batchResults);
    console.log(`  fetched ${Math.min(i + BATCH_SIZE, summaries.length)}/${summaries.length} moves`);
  }
  return details;
}

function classifyPlacement(move) {
  if (move.name.startsWith('max-')) {
    return Promise.resolve({ moveType: 'max', scope: 'special' });
  }

  const zmoveBase = move.name.replace(/--(physical|special)$/, '');
  if (GENERIC_ZMOVE_BASE_NAMES.has(zmoveBase) || SIGNATURE_ZMOVE_NAMES.has(move.name)) {
    return Promise.resolve({ moveType: 'zmove', scope: 'special' });
  }

  const gen = GENERATION_MAP[move.generation.name];
  if (!gen) {
    return Promise.resolve(null);
  }

  return isLegendsArceusIntroduced(move).then((isHisui) =>
    isHisui ? { box: 'hisui', gen, scope: 'standard' } : { gen, scope: 'standard' },
  );
}

// A move is treated as Hisui-specific when Legends: Arceus is the earliest
// version group (by PokeAPI's `order`) carrying its flavor text -- i.e. it
// wasn't already present in an earlier Generation VIII game. Moves later
// reused in Scarlet/Violet keep this classification; moves that already
// existed in Sword/Shield do not, even if Legends: Arceus reused them too.
async function isLegendsArceusIntroduced(move) {
  const versionGroups = Array.from(new Set(move.flavor_text_entries.map((entry) => entry.version_group.name)));
  if (!versionGroups.includes('legends-arceus')) return false;

  const orders = await Promise.all(versionGroups.map((name) => getVersionGroupOrder(name)));
  const legendsArceusOrder = orders[versionGroups.indexOf('legends-arceus')];
  return orders.every((order) => order >= legendsArceusOrder);
}

function pickEnglishName(move) {
  const entry = move.names.find((n) => n.language.name === 'en');
  return entry ? entry.name : null;
}

function buildVariantFromApiMove(move) {
  return {
    accuracy: move.accuracy,
    category: move.damage_class ? move.damage_class.name : 'variable',
    power: move.power,
    pp: move.pp,
    type: move.type.name,
  };
}

function buildVariantFromSupplement(entry) {
  return {
    accuracy: null,
    category: 'variable',
    power: entry.power ?? null,
    pp: 10,
    type: entry.type,
  };
}

function collectMoveNames(move) {
  const names = {};
  const langMap = {
    cn: 'zh-hant',
    de: 'de',
    en: 'en',
    es: 'es',
    fr: 'fr',
    it: 'it',
    ja: 'ja',
    ko: 'ko',
    zh: 'zh-hans',
  };
  for (const [ourLang, apiLang] of Object.entries(langMap)) {
    const entry = move.names.find((n) => n.language.name === apiLang);
    if (entry) names[ourLang] = entry.name;
  }
  return names;
}

async function run() {
  console.log('Fetching AttackDex move catalog from PokeAPI...');
  const client = new MoveClient();

  try {
    const summaries = await fetchAllMoves(client);
    console.log(`Found ${summaries.length} moves. Fetching details...`);
    const apiMoves = await fetchMoveDetails(client, summaries);

    const excluded = [];
    const groups = new Map();
    const collisions = [];
    const translations = {};

    for (const move of apiMoves) {
      if (move.type.name === 'shadow') {
        excluded.push(move.name);
        continue;
      }

      const placement = await classifyPlacement(move);
      if (!placement) {
        console.warn(`  skipping "${move.name}": unrecognized generation "${move.generation.name}"`);
        excluded.push(move.name);
        continue;
      }

      const displayName = pickEnglishName(move) ?? move.name;
      const groupKey = displayName.trim().toLowerCase();
      const variant = buildVariantFromApiMove(move);

      addToGroup(groups, collisions, groupKey, displayName, placement, variant, move.name, slugify(displayName));
      translations[slugify(displayName)] = collectMoveNames(move);
    }

    for (const entry of GMAX_SUPPLEMENT) {
      const placement = { moveType: 'gmax', scope: 'special' };
      const variant = buildVariantFromSupplement(entry);
      const groupKey = entry.name.trim().toLowerCase();
      // Project-owned id, distinct from a PokeAPI slug, since G-Max moves
      // are entirely absent from PokeAPI (see GMAX_SUPPLEMENT comment).
      addToGroup(
        groups,
        collisions,
        groupKey,
        entry.name,
        placement,
        variant,
        `local:${entry.name}`,
        slugify(entry.name),
      );
    }

    if (collisions.length > 0) {
      console.warn(`\n${collisions.length} normalized-name collision(s) detected (kept separate):`);
      collisions.forEach((c) => console.warn(`  - ${c}`));
    }

    const moves = Array.from(groups.values()).map(flattenGroup);

    moves.sort((a, b) => a.id.localeCompare(b.id));

    const catalog = {
      generatedAt: new Date().toISOString(),
      moves,
      sourceVersion: 1,
    };

    validateCatalog(catalog);

    console.log(`\nStandard moves: ${moves.filter((m) => m.scope === 'standard').length}`);
    console.log(`Special moves: ${moves.filter((m) => m.scope === 'special').length}`);
    console.log(`Excluded (Colosseum/XD Shadow or unrecognized): ${excluded.length}`);

    fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2) + '\n');
    fs.writeFileSync(TRANSLATIONS_PATH, JSON.stringify({ translations }, null, 2) + '\n');
    console.log(`\nWrote ${CATALOG_PATH}`);
    console.log(`Wrote ${TRANSLATIONS_PATH}`);
  } catch (error) {
    console.error('Import failed; previous catalog files were left untouched.');
    console.error(error);
    process.exitCode = 1;
  }
}

// Groups a variant under `groupKey`. If a group already exists with the
// same key but a genuinely different type/category (i.e. not a legitimate
// physical/special split of the same named move), it's reported as a
// collision and kept as its own separate entry instead of being silently
// merged.
function addToGroup(groups, collisions, groupKey, displayName, placement, variant, sourceId, id) {
  const existing = groups.get(groupKey);
  if (!existing) {
    groups.set(groupKey, { displayName, id, placement, variants: [variant] });
    return;
  }

  const sameFamily =
    existing.variants.every((v) => v.type === variant.type) && placementsMatch(existing.placement, placement);
  if (sameFamily) {
    existing.variants.push(variant);
    return;
  }

  const disambiguatedKey = `${groupKey}__${sourceId}`;
  collisions.push(`"${displayName}" (${sourceId}) collides with an existing "${groupKey}" entry`);
  groups.set(disambiguatedKey, { displayName, id, placement, variants: [variant] });
}

// Collapses a group's accumulated variants (kept internally only for
// collision detection, e.g. the physical/special Z-Move pairs) into one
// flat catalog entry. When a move has more than one variant, they only
// ever differ by damage category (see grouping notes above), so the flat
// entry uses `category: 'variable'` -- the same convention already used
// for Max/G-Max moves whose category depends on the triggering move.
function flattenGroup(group) {
  const [first] = group.variants;
  const category = group.variants.length > 1 ? 'variable' : first.category;
  const base = {
    accuracy: first.accuracy,
    category,
    id: group.id,
    name: group.displayName,
    power: first.power,
    pp: first.pp,
    type: first.type,
  };

  return group.placement.scope === 'standard'
    ? {
        ...base,
        ...(group.placement.box ? { box: group.placement.box } : {}),
        gen: group.placement.gen,
        scope: 'standard',
      }
    : { ...base, moveType: group.placement.moveType, scope: 'special' };
}

function placementsMatch(a, b) {
  if (a.scope !== b.scope) return false;
  if (a.scope === 'standard') return a.gen === b.gen;
  return a.moveType === b.moveType;
}

function validateCatalog(catalog) {
  const damageCategory = z.enum(['physical', 'special', 'status', 'variable']);
  const move = z.discriminatedUnion('scope', [
    z.object({
      accuracy: z.number().nullable(),
      box: z.string().optional(),
      category: damageCategory,
      gen: z.string(),
      id: z.string().min(1),
      name: z.string().min(1),
      power: z.number().nullable(),
      pp: z.number().nullable(),
      scope: z.literal('standard'),
      type: z.string().min(1),
    }),
    z.object({
      accuracy: z.number().nullable(),
      category: damageCategory,
      id: z.string().min(1),
      moveType: z.enum(['zmove', 'max', 'gmax']),
      name: z.string().min(1),
      power: z.number().nullable(),
      pp: z.number().nullable(),
      scope: z.literal('special'),
      type: z.string().min(1),
    }),
  ]);
  const schema = z.object({
    generatedAt: z.string(),
    moves: z.array(move),
    sourceVersion: z.literal(1),
  });

  const result = schema.safeParse(catalog);
  if (!result.success) {
    throw new Error(`Generated catalog failed validation:\n${JSON.stringify(result.error.issues, null, 2)}`);
  }

  const ids = new Set();
  for (const m of catalog.moves) {
    if (ids.has(m.id)) {
      throw new Error(`Duplicate move id detected: "${m.id}"`);
    }
    ids.add(m.id);
  }
}

run();
