import { z } from 'zod';

export const bblParamSchema = z.object({
  bbl: z.string().min(1, 'BBL parameter is required'),
});

export const searchQuerySchema = z.object({
  q: z.string().optional().default(''),
});
