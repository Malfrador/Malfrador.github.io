import { defineCollection, z } from 'astro:content';

const linkSchema = z.object({
  label: z.string(),
  href: z.string()
});

const mediaSchema = z.object({
  src: z.string(),
  alt: z.string(),
  type: z.enum(['image', 'video']).default('image'),
  caption: z.string().optional()
});

const annotationSchema = z.object({
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
  label: z.string(),
  detail: z.string(),
  placement: z.enum(['left', 'right', 'top', 'bottom']).default('right'),
  href: z.string().optional()
});

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    type: z.string(),
    status: z.string(),
    year: z.number(),
    ongoing: z.boolean().default(false),
    summary: z.string(),
    role: z.string(),
    tags: z.array(z.string()),
    cover: z.string(),
    links: z.array(linkSchema).default([]),
    featured: z.boolean().default(false),
    caseStudy: z.boolean().default(false),
    order: z.number().default(100),
    draft: z.boolean().default(false)
  })
});

const caseStudies = defineCollection({
  type: 'data',
  schema: z.object({
    project: z.string(),
    eyebrow: z.string(),
    headline: z.string(),
    intro: z.string(),
    facts: z.array(z.object({
      label: z.string(),
      value: z.string(),
      group: z.string().default('Details')
    })),
    hero: mediaSchema,
    timeline: z.array(z.object({
      title: z.string(),
      phase: z.string(),
      shortText: z.string(),
      media: mediaSchema,
      annotations: z.array(annotationSchema).default([]),
      outcome: z.string().optional()
    })),
    closing: z.array(z.string()).default([])
  })
});

export const collections = { projects, caseStudies };
