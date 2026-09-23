import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const schema = z.object({ title: z.string(), description: z.string(), publishedAt: z.string(), kind: z.enum(['guides', 'blog']) });
export const collections = { articles: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/articles' }), schema }) };
