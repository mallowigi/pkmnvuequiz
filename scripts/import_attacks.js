// Generates the checked-in AttackDex move catalog (`src/data/attacks.json`)
// and its localized display names (`src/data/moveTranslations.json`) from
// PokeAPI. Run manually with `npm run data:attackdex:import` whenever a new
// game/generation adds moves -- this is expected to happen rarely, so the
// script favors clarity over caching/concurrency machinery.
//
// Scope: ordinary standard moves AND Z-Moves/Max Moves/G-Max Moves are all
// imported. Every move is tagged with a `placement.scope` of `standard` or
// `special` so the regular game can exclude Special-family moves from its
// answer pool without having skipped importing them. Only Colosseum/XD
// Shadow moves (PokeAPI's synthetic `shadow` elemental type) are excluded
// entirely.
import { MoveClient } from 'pokenode-ts';
import fs from 'fs';
import path from 'path';
import { z } from 'zod';

const CATALOG_PATH = path.resolve('src/data/attacks.json');
const TRANSLATIONS_PATH = path.resolve('src/data/moveTranslations.json');

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
// share one English display name and become one AttackDexMove with two
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
// stable project-owned ids (prefixed `local-`, `apiId: null`) rather than
// pretending they came from PokeAPI. Source: Bulbapedia "G-Max Move" page
// (https://bulbapedia.bulbagarden.net/wiki/G-Max_Move), retrieved for this
// import. Power/category are inherited from whichever base move triggers
// them (`category: 'variable'`), except the three moves with a fixed base
// power of 160 regardless of the triggering move.
const GMAX_SUPPLEMENT = [
  { effect: 'Inflicts damage for four turns on non-Grass opponents.', name: 'G-Max Vine Lash', type: 'grass' },
  { effect: 'Inflicts damage for four turns on non-Fire opponents.', name: 'G-Max Wildfire', type: 'fire' },
  { effect: 'Inflicts damage for four turns on non-Water opponents.', name: 'G-Max Cannonade', type: 'water' },
  { effect: 'Inflicts poison, paralysis, or sleep on all opponents.', name: 'G-Max Befuddle', type: 'bug' },
  { effect: 'Paralyzes all opponents.', name: 'G-Max Volt Crash', type: 'electric' },
  {
    effect:
      "Scatters coins on the ground that are picked up afterwards, and confuses all opponents. Value is equal to 100 times the user's level.",
    name: 'G-Max Gold Rush',
    type: 'normal',
  },
  {
    effect: 'Pumps up the user and its allies, raising the chance of critical hits by one stage.',
    name: 'G-Max Chi Strike',
    type: 'fighting',
  },
  { effect: 'Prevents the opponent from being recalled or switched out.', name: 'G-Max Terror', type: 'ghost' },
  { effect: 'Lowers the Speed of all opponents by two stages.', name: 'G-Max Foam Burst', type: 'water' },
  {
    effect: 'Lowers damage from both Physical and Special moves for five turns.',
    name: 'G-Max Resonance',
    type: 'ice',
  },
  { effect: 'Opponents of the opposite gender of the user become infatuated.', name: 'G-Max Cuddle', type: 'normal' },
  { effect: "50% chance of restoring the user or an ally's used Berry.", name: 'G-Max Replenish', type: 'normal' },
  { effect: 'Poisons all opponents.', name: 'G-Max Malodor', type: 'poison' },
  { effect: 'Makes opponents incapable of using the same move twice in a row.', name: 'G-Max Meltdown', type: 'steel' },
  {
    effect: 'Moves can be used regardless of the target Pokemon\u2019s abilities. Power is always 160.',
    name: 'G-Max Drum Solo',
    power: 160,
    type: 'grass',
  },
  {
    effect: 'Moves can be used regardless of the target Pokemon\u2019s abilities. Power is always 160.',
    name: 'G-Max Fireball',
    power: 160,
    type: 'fire',
  },
  {
    effect: 'Moves can be used regardless of the target Pokemon\u2019s abilities. Power is always 160.',
    name: 'G-Max Hydrosnipe',
    power: 160,
    type: 'water',
  },
  {
    effect: 'Removes hazards, screens, and terrain from the opponents\u2019 side of the field.',
    name: 'G-Max Wind Rage',
    type: 'flying',
  },
  { effect: 'Intensifies gravity for five turns.', name: 'G-Max Gravitas', type: 'psychic' },
  { effect: "Creates Stealth Rock on the opponents' side of the field.", name: 'G-Max Stonesurge', type: 'water' },
  { effect: 'Inflicts damage for four turns on non-Rock opponents.', name: 'G-Max Volcalith', type: 'rock' },
  { effect: 'Lowers the evasion of all opponents by one stage.', name: 'G-Max Tartness', type: 'grass' },
  { effect: 'Cures the user and its allies of their status conditions.', name: 'G-Max Sweetness', type: 'grass' },
  { effect: 'Traps the target in Sand Tomb for four to five turns.', name: 'G-Max Sandblast', type: 'ground' },
  { effect: 'Inflicts poison or paralysis on all opponents.', name: 'G-Max Stun Shock', type: 'electric' },
  { effect: 'Traps the target in Fire Spin for four to five turns.', name: 'G-Max Centiferno', type: 'fire' },
  { effect: 'Inflicts confusion on all opponents.', name: 'G-Max Smite', type: 'fairy' },
  {
    effect: 'Has a 50% chance of making the target drowsy, causing it to fall asleep at the end of the next turn.',
    name: 'G-Max Snooze',
    type: 'dark',
  },
  { effect: 'Heals the user and its allies by 1/6 their maximum HP.', name: 'G-Max Finale', type: 'fairy' },
  {
    effect: "Scatters sharp spikes around the field, working like Stealth Rock against the target's Steel weakness.",
    name: 'G-Max Steelsurge',
    type: 'steel',
  },
  { effect: 'Takes 2 PP away from the last move the target used.', name: 'G-Max Depletion', type: 'dragon' },
  {
    effect: 'Hits the target even if it is protected by a protection move, including Max Guard.',
    name: 'G-Max One Blow',
    type: 'dark',
  },
  {
    effect: 'Hits the target even if it is protected by a protection move, including Max Guard.',
    name: 'G-Max Rapid Flow',
    type: 'water',
  },
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

const normalizeText = (value) =>
  value
    ? value
        .replace(/[\n\f]+/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .trim()
    : null;

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

function pickDescription(move) {
  const entries = move.flavor_text_entries.filter((entry) => entry.language.name === 'en');
  if (entries.length === 0) return null;
  return normalizeText(entries[entries.length - 1].flavor_text);
}

function pickEffect(move) {
  const entry = move.effect_entries.find((e) => e.language.name === 'en');
  if (!entry) return null;
  const text = entry.effect.replace(/\$effect_chance/g, String(move.effect_chance ?? ''));
  return normalizeText(text);
}

function buildVariantFromApiMove(move) {
  return {
    accuracy: move.accuracy,
    apiId: move.id,
    category: move.damage_class ? move.damage_class.name : 'variable',
    description: pickDescription(move),
    effect: pickEffect(move),
    name: pickEnglishName(move) ?? move.name,
    power: move.power,
    pp: move.pp,
    type: move.type.name,
  };
}

function buildVariantFromSupplement(entry) {
  return {
    accuracy: null,
    apiId: null,
    category: 'variable',
    description: null,
    effect: entry.effect,
    name: entry.name,
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
  for (const [
    ourLang,
    apiLang,
  ] of Object.entries(langMap)) {
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
        `local-${slugify(entry.name)}`,
      );
    }

    if (collisions.length > 0) {
      console.warn(`\n${collisions.length} normalized-name collision(s) detected (kept separate):`);
      collisions.forEach((c) => console.warn(`  - ${c}`));
    }

    const moves = Array.from(groups.values()).map((group) => ({
      aliases: [],
      id: group.id,
      name: group.displayName,
      placement: group.placement,
      variants: group.variants,
    }));

    moves.sort((a, b) => a.id.localeCompare(b.id));

    const catalog = {
      generatedAt: new Date().toISOString(),
      moves,
      sourceVersion: 1,
    };

    validateCatalog(catalog);

    console.log(`\nStandard moves: ${moves.filter((m) => m.placement.scope === 'standard').length}`);
    console.log(`Special moves: ${moves.filter((m) => m.placement.scope === 'special').length}`);
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

function placementsMatch(a, b) {
  if (a.scope !== b.scope) return false;
  if (a.scope === 'standard') return a.gen === b.gen;
  return a.moveType === b.moveType;
}

function validateCatalog(catalog) {
  const damageCategory = z.enum([
    'physical',
    'special',
    'status',
    'variable',
  ]);
  const moveVariant = z.object({
    accuracy: z.number().nullable(),
    apiId: z.number().nullable(),
    category: damageCategory,
    description: z.string().nullable(),
    effect: z.string().nullable(),
    name: z.string().min(1),
    power: z.number().nullable(),
    pp: z.number().nullable(),
    type: z.string().min(1),
  });
  const placement = z.union([
    z.object({ box: z.string().optional(), gen: z.string(), scope: z.literal('standard') }),
    z.object({
      moveType: z.enum([
        'zmove',
        'max',
        'gmax',
      ]),
      scope: z.literal('special'),
    }),
  ]);
  const move = z.object({
    aliases: z.array(z.string()),
    id: z.string().min(1),
    name: z.string().min(1),
    placement,
    variants: z.array(moveVariant).min(1),
  });
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
