import { z } from 'zod';

import { regionBoxSchema, typeSchema } from '@/schemas/enums.schema.ts';

// Named move families exclusive to AttackDex's Special Mode (`movetype`).
export const moveTypeSchema = z.enum(['zmove', 'max', 'gmax']);

// `variable` covers Max/G-Max moves whose category is inherited from
// whichever base move triggered them rather than being fixed by the move
// itself.
export const damageCategorySchema = z.enum(['physical', 'special', 'status', 'variable']);

// Flat catalog entry: no nested `placement`/`variants` objects. Only the
// fields the quiz itself needs are cached here; richer per-language text
// (description/effect) is fetched live from PokeAPI on demand instead.
export const attackSchema = z.discriminatedUnion('scope', [
  z.object({
    accuracy: z.number().nullable(),
    box: regionBoxSchema,
    category: damageCategorySchema,
    id: z.string().min(1),
    name: z.string().min(1),
    power: z.number().nullable(),
    pp: z.number().nullable(),
    scope: z.literal('standard'),
    type: typeSchema,
  }),
  z.object({
    accuracy: z.number().nullable(),
    box: regionBoxSchema,
    category: damageCategorySchema,
    id: z.string().min(1),
    moveType: moveTypeSchema,
    name: z.string().min(1),
    power: z.number().nullable(),
    pp: z.number().nullable(),
    scope: z.literal('special'),
    type: typeSchema,
  }),
]);

// On-disk shape of `src/data/attacks.json`. `sourceVersion` and
// `generatedAt` are recorded so a broken/incomplete regeneration is easy to
// spot and so import reports can note when the catalog was last refreshed.
export const attackDexCatalogSchema = z.object({
  generatedAt: z.string(),
  moves: z.array(attackSchema),
  sourceVersion: z.literal(1),
});

export type AttackDexCatalogFile = z.infer<typeof attackDexCatalogSchema>;

export const parseAttackDexCatalog = (input: unknown) => attackDexCatalogSchema.safeParse(input);
