export type Tool = {
	name: string;
	description: string;
	url?: string;
	icon?: string;
	why?: string;
	how?: string;
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
				name: "Mac Studio",
				description: "Main desk setup — the workhorse for everything development.",
				url: "https://apple.com/mac-studio",
				icon: "simple-icons:apple",
				why: "Plenty of headroom for builds, simulators, and video calls running at the same time.",
				how: "Always-on desk machine — the beating heart of my workflow.",
			},
			{
				name: "MacBook Air",
				description: "Travel machine — light, silent, and enough power for anything on the go.",
				url: "https://apple.com/macbook-air",
				icon: "simple-icons:apple",
				why: "Fanless, silent, and lasts all day on battery.",
				how: "Travel companion for coffee shops, trains, and anywhere that isn't the desk.",
			},
			{
				name: "iPhone",
				description: "Daily driver and primary device for testing iOS apps.",
				icon: "simple-icons:apple",
				why: "It's the target — and the best testbed for anything I ship on iOS.",
				how: "Daily driver, and first device I install every new build on.",
			},
		],
	},
	{
		name: "Editor & Terminal",
		tools: [
			{
				name: "Zed",
				description: "Fast, native, multiplayer code editor built in Rust.",
				url: "https://zed.dev",
				icon: "simple-icons:zedindustries",
				why: "The most responsive editor I've used — feels instant on everything.",
				how: "Primary editor for TypeScript, Rust, and Swift work.",
			},
			{
				name: "Ghostty",
				description: "GPU-accelerated, native terminal emulator.",
				url: "https://ghostty.org",
				icon: "simple-icons:ghostty",
				why: "Fast, zero-config, and genuinely beautiful out of the box.",
				how: "Every shell session — dev, SSH, and long-running processes.",
			},
			{
				name: "Claude Code",
				description: "Agentic coding CLI from Anthropic.",
				url: "https://claude.ai/code",
				icon: "simple-icons:anthropic",
				why: "Handles multi-file refactors and research faster than I could alone.",
				how: "Pair-programmer for complex refactors, code review, and exploration.",
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
				why: "One tool that replaces Node, npm, tsx, and Jest — and it's genuinely fast.",
				how: "Default runtime, package manager, and test runner for every TypeScript project.",
			},
			{
				name: "TypeScript",
				description: "Strictly typed JavaScript for every web and server project.",
				url: "https://typescriptlang.org",
				icon: "simple-icons:typescript",
				why: "Types catch the bugs I'd otherwise ship.",
				how: "Every web, API, and CLI project I write starts here.",
			},
			{
				name: "Swift",
				description: "Native iOS and macOS development with SwiftUI and @Observable.",
				url: "https://swift.org",
				icon: "simple-icons:swift",
				why: "Modern language, best-in-class tooling, and fully native on Apple platforms.",
				how: "iOS and macOS apps with SwiftUI and @Observable, typically zero dependencies.",
			},
			{
				name: "Rust",
				description: "Systems language for CLI tools and performance-critical code.",
				url: "https://rust-lang.org",
				icon: "simple-icons:rust",
				why: "When speed and correctness both matter, nothing else comes close.",
				how: "CLI tools, release automation, and anything performance-sensitive.",
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
				why: "Ships almost no JS by default, and islands handle the interactive bits when I need them.",
				how: "Marketing sites, blogs, and this very site.",
			},
			{
				name: "Hono",
				description: "Lightweight, fast web framework for APIs on edge runtimes.",
				url: "https://hono.dev",
				icon: "simple-icons:hono",
				why: "Tiny, Web-standard, and runs wherever I need it to.",
				how: "Every API I build on Cloudflare Workers.",
			},
			{
				name: "Expo",
				description: "Cross-platform mobile apps with expo-router.",
				url: "https://expo.dev",
				icon: "simple-icons:expo",
				why: "Native platform features with web-speed iteration and great DX.",
				how: "React Native apps with expo-router for typed, file-based routing.",
			},
			{
				name: "Tailwind CSS",
				description: "Utility-first CSS — consistent, fast, and never fights you.",
				url: "https://tailwindcss.com",
				icon: "simple-icons:tailwindcss",
				why: "Consistent design tokens, fast iteration, and no more naming CSS classes.",
				how: "Styles every web project, and paired with NativeWind on React Native.",
			},
			{
				name: "Drizzle ORM",
				description: "Type-safe SQL ORM that works seamlessly with D1 and Postgres.",
				url: "https://orm.drizzle.team",
				icon: "simple-icons:drizzle",
				why: "Type-safe SQL without the ceremony or runtime weight of heavier ORMs.",
				how: "Database layer for D1, SQLite, and Postgres projects.",
			},
			{
				name: "Zod",
				description: "Schema validation with automatic TypeScript type inference.",
				url: "https://zod.dev",
				icon: "simple-icons:zod",
				why: "Schema and types from one source of truth — no drift.",
				how: "Validating API inputs, environment variables, and form data.",
			},
			{
				name: "Biome",
				description: "One tool for formatting and linting — replaces ESLint and Prettier.",
				url: "https://biomejs.dev",
				icon: "simple-icons:biome",
				why: "Rust-fast, zero-config, and ends the ESLint vs Prettier config wars.",
				how: "Formatter and linter in every TypeScript project I touch.",
			},
		],
	},
	{
		name: "Infrastructure",
		tools: [
			{
				name: "Cloudflare Workers",
				description: "Edge runtime for APIs, static assets, KV, D1, R2, and queues.",
				url: "https://developers.cloudflare.com/workers",
				icon: "simple-icons:cloudflare",
				why: "Global edge, no cold starts, and every primitive I need in one runtime.",
				how: "Hosts APIs, static sites, databases, and queues for nearly every project.",
			},
			{
				name: "Railway",
				description: "Managed deployments for services that need persistent infrastructure.",
				url: "https://railway.app",
				icon: "simple-icons:railway",
				why: "Handles stateful services Cloudflare can't, without the Kubernetes overhead.",
				how: "Long-running services, background workers, and anything that needs disks.",
			},
			{
				name: "OrbStack",
				description: "Fast, lightweight Docker Desktop replacement for macOS.",
				url: "https://orbstack.dev",
				why: "Fast, quiet, and doesn't turn my laptop into a space heater.",
				how: "Local Docker and Linux VMs for development and testing.",
			},
			{
				name: "Kubernetes",
				description: "Container orchestration for the homelab, managed with Flux CD.",
				url: "https://kubernetes.io",
				icon: "simple-icons:kubernetes",
				why: "The right level of abstraction for a homelab that runs 24/7.",
				how: "Homelab orchestration, paired with Flux CD for GitOps.",
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
				why: "Collaborative, fast, and the industry standard for a reason.",
				how: "UI design and prototyping for every product I build.",
			},
			{
				name: "svgl",
				description: "Open-source SVG logo library.",
				url: "https://svgl.app",
				why: "Brand-accurate logos in seconds, no hunting through marketing pages.",
				how: "First stop for any brand logo I need in a project.",
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
				why: "Zero-trust secrets management with a CLI that fits cleanly into scripts.",
				how: "Passwords, SSH keys, and secrets piped directly into dev commands.",
			},
		],
	},
];
