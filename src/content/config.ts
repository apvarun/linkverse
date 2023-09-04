// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

const baseSchema = z.object({
  sortOrder: z.number().optional(),
  isDraft: z.boolean().optional(),
  backgroundColor: z.string().optional(),
  textColor: z.string().optional(),
  borderColor: z.string().optional(),
  cardSize: z.enum(['small', 'medium', 'large']).default('small'),
})

export const linkSchema = baseSchema.extend({
  type: z.literal('link'),
  title: z.string(),
  description: z.string(),
  icon: z.object({
    src: z.string().url(),
    alt: z.string(),
  }).optional(),
  button: z.object({
    text: z.string(),
    link: z.string().url(),
    backgroundColor: z.string().optional(),
    textColor: z.string().optional(),
    borderColor: z.string().optional(),
  }).optional(),
});

export const imageSchema = baseSchema.extend({
  type: z.literal('image'),
  imageUrl: z.string().url(),
  caption: z.string(),
  link: z.string().url().optional(),
});

export const videoSchema = baseSchema.extend({
  type: z.literal('video'),
  videoUrl: z.string().url(),
  caption: z.string(),
  autoplay: z.boolean().default(false),
});

export const quoteSchema = baseSchema.extend({
  type: z.literal('quote'),
  quote: z.string(),
  author: z.string(),
});


// 2. Define a `type` and `schema` for each collection
const cardCollection = defineCollection({
  type: 'content',
  schema: z.union([
    linkSchema,
    imageSchema,
    videoSchema,
    quoteSchema
  ])
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  'cards': cardCollection,
};