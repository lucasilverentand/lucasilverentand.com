export type Tool = {
	name: string;
	description: string;
	url?: string;
	icon?: string;
	note?: string;
};

export type ToolCategory = {
	name: string;
	tools: Tool[];
};

export const uses: ToolCategory[] = [
	{
		name: "Hardware",
		tools: [
			{
				name: "MacBook Pro",
				description: "Primary development machine.",
				url: "https://apple.com/macbook-pro",
				icon: "simple-icons:apple",
			},
			{
				name: "iPhone",
				description: "Daily driver and primary device for testing iOS apps.",
				icon: "simple-icons:apple",
			},
		],
	},
	{
		name: "Editor & Terminal",
		tools: [
			{
				name: "Cursor",
				description: "AI-native code editor built on VS Code.",
				url: "https://cursor.com",
				icon: "simple-icons:cursor",
			},
			{
				name: "Warp",
				description: "Modern terminal with AI command lookup and block-based output.",
				url: "https://warp.dev",
				icon: "simple-icons:warp",
			},
			{
				name: "Claude Code",
				description:
					"Agentic coding CLI — handles complex multi-file refactors, research, and review.",
				url: "https://claude.ai/code",
				icon: "simple-icons:anthropic",
			},
		],
	},
	{
		name: "Languages & Runtimes",
		tools: [
			{
				name: "Bun",
				description: "All-in-one JavaScript runtime, package manager, bundler, and test runner.",
				url: "https://bun.sh",
				icon: "simple-icons:bun",
			},
			{
				name: "TypeScript",
				description: "Strictly typed JavaScript for every web and server project.",
				url: "https://typescriptlang.org",
				icon: "simple-icons:typescript",
			},
			{
				name: "Swift",
				description: "Native iOS and macOS development with SwiftUI and @Observable.",
				url: "https://swift.org",
				icon: "simple-icons:swift",
			},
			{
				name: "Rust",
				description: "CLI tools, performance-critical code, and anything systems-level.",
				url: "https://rust-lang.org",
				icon: "simple-icons:rust",
			},
		],
	},
	{
		name: "Frameworks & Libraries",
		tools: [
			{
				name: "Astro",
				description: "Static site generation for content sites and landing pages.",
				url: "https://astro.build",
				icon: "simple-icons:astro",
			},
			{
				name: "Hono",
				description: "Lightweight, fast web framework for APIs on Cloudflare Workers.",
				url: "https://hono.dev",
				icon: "simple-icons:hono",
			},
			{
				name: "Expo",
				description: "Cross-platform mobile apps with expo-router for file-based routing.",
				url: "https://expo.dev",
				icon: "simple-icons:expo",
			},
			{
				name: "Tailwind CSS",
				description: "Utility-first CSS — consistent, fast, and never fights you.",
				url: "https://tailwindcss.com",
				icon: "simple-icons:tailwindcss",
			},
			{
				name: "Drizzle ORM",
				description: "Type-safe SQL ORM that works seamlessly with D1 and Postgres.",
				url: "https://orm.drizzle.team",
				icon: "simple-icons:drizzle",
			},
			{
				name: "Zod",
				description: "Schema validation with automatic TypeScript type inference.",
				url: "https://zod.dev",
				icon: "simple-icons:zod",
			},
			{
				name: "Biome",
				description: "One tool for formatting and linting — replaces ESLint and Prettier.",
				url: "https://biomejs.dev",
				icon: "simple-icons:biome",
			},
		],
	},
	{
		name: "Infrastructure",
		tools: [
			{
				name: "Cloudflare Workers",
				description: "Edge runtime for APIs, static assets, KV, D1, and R2 — all in one runtime.",
				url: "https://developers.cloudflare.com/workers",
				icon: "simple-icons:cloudflare",
			},
			{
				name: "Railway",
				description: "Managed deployments for services that need persistent infrastructure.",
				url: "https://railway.app",
				icon: "simple-icons:railway",
			},
			{
				name: "OrbStack",
				description: "Fast, lightweight Docker Desktop replacement for macOS.",
				url: "https://orbstack.dev",
			},
			{
				name: "Kubernetes",
				description: "Container orchestration for the homelab, managed with Flux CD.",
				url: "https://kubernetes.io",
				icon: "simple-icons:kubernetes",
			},
		],
	},
	{
		name: "Design",
		tools: [
			{
				name: "Figma",
				description: "UI design, prototyping, and design systems.",
				url: "https://figma.com",
				icon: "simple-icons:figma",
			},
			{
				name: "svgl",
				description: "Open-source SVG logo library — first stop for any brand logo in a project.",
				url: "https://svgl.app",
			},
		],
	},
	{
		name: "Productivity",
		tools: [
			{
				name: "1Password",
				description: "Password manager and secrets vault — used for every project.",
				url: "https://1password.com",
				icon: "simple-icons:1password",
			},
		],
	},
];
