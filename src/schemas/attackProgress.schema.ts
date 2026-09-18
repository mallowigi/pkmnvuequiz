import { z } from 'zod';

const attackFoundEntrySchema = z.object({
  id: z.string().min(1),
  lastFoundAt: z.number().nullable(),
});

const attackShadowedEntrySchema = z.object({
  id: z.string().min(1),
  lastShadowedAt: z.number().nullable(),
});

export const attackProgressSchema = z.object({
  attacksFound: z.array(attackFoundEntrySchema).default([]),
  attacksShadowed: z.array(attackShadowedEntrySchema).default([]),
});
