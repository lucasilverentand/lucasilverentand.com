import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
		source: z.string().optional(),
		externalUrl: z.string().url().optional(),
		canonicalUrl: z.string().url().optional(),
		image: z.string().url().optional(),
		imported: z.boolean().default(false),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
	schema: z.object({
		name: z.string(),
		description: z.string(),
		owner: z.string().default("lucasilverentand"),
		url: z.string().url().optional(),
		homepage: z.string().url().optional(),
		appStoreUrl: z.string().url().optional(),
		platform: z.string().optional(),
		topics: z.array(z.string()).default([]),
		tags: z
			.object({
				type: z.array(z.string()).default([]),
				framework: z.array(z.string()).default([]),
				language: z.array(z.string()).default([]),
			})
			.default({ type: [], framework: [], language: [] }),
		date: z.coerce.date(),
		featured: z.boolean().default(false),
		draft: z.boolean().default(false),
	}),
});

export const collections = { blog, projects };
