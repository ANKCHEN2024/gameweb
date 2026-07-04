import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const gameSlugs = [
  'meccha-chameleon',
  'path-of-exile-2',
  'cyberpunk-2077',
  'dead-by-daylight',
  'marvel-rivals',
  'forza-horizon-6',
] as const;

const guides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    game: z.enum(gameSlugs),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      )
      .default([]),
  }),
});

export const collections = { guides };
