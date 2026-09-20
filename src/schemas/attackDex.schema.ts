import { z } from 'zod';

export const attackDexSchema = z.object({
  isAttackDex: z.boolean().default(false),
});
