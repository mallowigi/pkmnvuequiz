import { z } from 'zod';

import { generationSchema, regionBoxSchema, typeSchema } from '@/schemas/enums.schema.ts';

// Named move families exclusive to AttackDex's Special Mode (`movetype`).
export const moveTypeSchema = z.enum([
  'zmove',
  'max',
  'gmax',
]);

// `variable` covers Max/G-Max moves whose category is inherited from
// whichever base move triggered them rather than being fixed by the move
// itself.
export const damageCategorySchema = z.enum([
  'physical',
  'special',
  'status',
  'variable',
]);

export const movePlacementSchema = z.discriminatedUnion('scope', [
  z.object({
    box: regionBoxSchema.optional(),
    gen: generationSchema,
    scope: z.literal('standard'),
  }),
  z.object({
    moveType: moveTypeSchema,
    scope: z.literal('special'),
  }),
]);

export const moveVariantSchema = z.object({
  accuracy: z.number().nullable(),
  apiId: z.number().nullable(),
  category: damageCategorySchema,
  description: z.string().nullable(),
  effect: z.string().nullable(),
  name: z.string().min(1),
  power: z.number().nullable(),
  pp: z.number().nullable(),
  type: typeSchema,
});

export const attackDexMoveSchema = z.object({
  aliases: z.array(z.string()),
  id: z.string().min(1),
  name: z.string().min(1),
  placement: movePlacementSchema,
  variants: z.array(moveVariantSchema).min(1),
});

// On-disk shape of `src/data/attacks.json`. `sourceVersion` and
// `generatedAt` are recorded so a broken/incomplete regeneration is easy to
// spot and so import reports can note when the catalog was last refreshed.
export const attackDexCatalogSchema = z.object({
  generatedAt: z.string(),
  moves: z.array(attackDexMoveSchema),
  sourceVersion: z.literal(1),
});

export type AttackDexCatalogFile = z.infer<typeof attackDexCatalogSchema>;

export const parseAttackDexCatalog = (input: unknown) => attackDexCatalogSchema.safeParse(input);
