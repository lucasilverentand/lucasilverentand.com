import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const WIDTH = 1200;
const HEIGHT = 630;
const REPO_ROOT = resolve(fileURLToPath(import.meta.url), "..", "..");
const DEFAULT_OUTPUT = resolve(REPO_ROOT, "public/og.png");
const PORTRAIT_PATH = resolve(REPO_ROOT, "public/me.jpg");

async function buildHtml() {
	const portraitBytes = await readFile(PORTRAIT_PATH);
	const portraitDataUri = `data:image/jpeg;base64,${portraitBytes.toString("base64")}`;

	return `<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap"
			rel="stylesheet"
		/>
		<style>
			:root {
				--surface: #080808;
				--surface-raised: #0e0e0e;
				--border-subtle: #1e1e1e;
				--border-strong: #2a2a2a;
				--text-primary: #ededed;
				--text-muted: #999999;
				--text-faint: #555555;
				--accent: #ff5c1a;
				--accent-glow: rgba(255, 92, 26, 0.28);
			}

			* {
				box-sizing: border-box;
				margin: 0;
				padding: 0;
			}

			html,
			body {
				width: ${WIDTH}px;
				height: ${HEIGHT}px;
				background: #000;
			}

			body {
				font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
				color: var(--text-primary);
				overflow: hidden;
			}

			.frame {
				position: relative;
				width: ${WIDTH}px;
				height: ${HEIGHT}px;
				background: var(--surface);
				overflow: hidden;
			}

			/* Subtle dot grid — nods to the site's halftone aesthetic. */
			.grid {
				position: absolute;
				inset: 0;
				background-image: radial-gradient(
					circle at 1px 1px,
					rgba(255, 255, 255, 0.045) 1px,
					transparent 1.5px
				);
				background-size: 18px 18px;
			}

			/* Warm aurora in the bottom-right, fading off-screen. */
			.glow {
				position: absolute;
				right: -200px;
				bottom: -260px;
				width: 760px;
				height: 760px;
				border-radius: 50%;
				background: radial-gradient(
					circle,
					var(--accent-glow) 0%,
					rgba(255, 92, 26, 0.08) 40%,
					transparent 70%
				);
				filter: blur(20px);
			}

			/* Inset card with subtle border — keeps the image looking "intentional"
			   when surrounded by either a light or dark social feed background. */
			.card {
				position: absolute;
				inset: 32px;
				border-radius: 20px;
				background: var(--surface-raised);
				border: 1px solid var(--border-subtle);
				padding: 56px 72px;
				display: flex;
				align-items: center;
				gap: 64px;
			}

			.portrait {
				flex-shrink: 0;
				width: 380px;
				height: 380px;
				border-radius: 999px;
				overflow: hidden;
				border: 1px solid var(--border-strong);
				background: var(--surface);
				position: relative;
			}

			.portrait img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				/* Duotone-ish treatment that echoes the dithered portrait
				   on the live site without needing canvas rendering. */
				filter: grayscale(0.45) contrast(1.05) saturate(1.1) brightness(0.95);
			}

			.portrait::after {
				content: "";
				position: absolute;
				inset: 0;
				border-radius: inherit;
				background: radial-gradient(
					circle at 70% 30%,
					transparent 50%,
					rgba(8, 8, 8, 0.35) 100%
				);
				pointer-events: none;
			}

			.content {
				min-width: 0;
				display: flex;
				flex-direction: column;
				gap: 28px;
			}

			.eyebrow {
				display: inline-flex;
				align-items: center;
				gap: 14px;
				font-family: "DM Mono", "JetBrains Mono", monospace;
				font-size: 22px;
				font-weight: 400;
				letter-spacing: 0.02em;
				color: var(--text-primary);
				text-transform: lowercase;
			}

			.eyebrow .dot {
				width: 14px;
				height: 14px;
				border-radius: 50%;
				background: var(--accent);
				box-shadow: 0 0 18px var(--accent);
			}

			.name {
				font-family: "DM Serif Display", Georgia, serif;
				font-weight: 400;
				font-size: 104px;
				line-height: 0.95;
				letter-spacing: -0.015em;
				color: var(--text-primary);
			}

			.tagline {
				font-size: 32px;
				line-height: 1.35;
				color: var(--text-muted);
				max-width: 540px;
			}

			.tagline strong {
				color: var(--text-primary);
				font-weight: 500;
			}
		</style>
	</head>
	<body>
		<div class="frame">
			<div class="grid"></div>
			<div class="glow"></div>
			<div class="card">
				<div class="portrait">
					<img src="${portraitDataUri}" alt="" />
				</div>
				<div class="content">
					<span class="eyebrow"><span class="dot"></span>lucasilverentand.com</span>
					<h1 class="name">Luca<br />Silverentand</h1>
					<p class="tagline">
						Self-taught developer.<br /><strong>15+ years</strong> building software.
					</p>
				</div>
			</div>
		</div>
	</body>
</html>`;
}

async function main() {
	const outputArg = process.argv[2];
	const outputPath = outputArg ? resolve(outputArg) : DEFAULT_OUTPUT;

	await mkdir(dirname(outputPath), { recursive: true });

	const html = await buildHtml();
	const browser = await chromium.launch({ headless: true });
	try {
		const context = await browser.newContext({
			viewport: { width: WIDTH, height: HEIGHT },
			deviceScaleFactor: 1,
		});
		const page = await context.newPage();
		await page.setContent(html, { waitUntil: "networkidle" });
		// Belt-and-braces: ensure web fonts have loaded before snapshotting.
		await page.evaluate(() => document.fonts.ready);
		const buffer = await page.screenshot({
			type: "png",
			clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
		});
		await writeFile(outputPath, buffer);
		console.log(`Wrote ${outputPath} (${buffer.length} bytes, ${WIDTH}×${HEIGHT})`);
	} finally {
		await browser.close();
	}
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
