import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const DEFAULT_PORT = 4321;
const DEFAULT_ROUTE = "/";
const DEFAULT_OUTPUT = "tmp/screenshots/page.png";
const DEFAULT_WIDTH = 1440;
const DEFAULT_HEIGHT = 1100;

function parseArgs(argv) {
	const options = {
		route: DEFAULT_ROUTE,
		output: DEFAULT_OUTPUT,
		port: DEFAULT_PORT,
		width: DEFAULT_WIDTH,
		height: DEFAULT_HEIGHT,
		delay: 400,
		fullPage: true,
	};

	const positionals = [];
	for (let i = 0; i < argv.length; i++) {
		const arg = argv[i];
		if (!arg.startsWith("--")) {
			positionals.push(arg);
			continue;
		}

		const [key, inlineValue] = arg.split("=", 2);
		const nextValue = inlineValue ?? argv[i + 1];

		switch (key) {
			case "--port":
				options.port = Number(nextValue);
				if (inlineValue == null) i += 1;
				break;
			case "--width":
				options.width = Number(nextValue);
				if (inlineValue == null) i += 1;
				break;
			case "--height":
				options.height = Number(nextValue);
				if (inlineValue == null) i += 1;
				break;
			case "--delay":
				options.delay = Number(nextValue);
				if (inlineValue == null) i += 1;
				break;
			case "--selector":
				options.selector = nextValue;
				if (inlineValue == null) i += 1;
				break;
			case "--no-full-page":
				options.fullPage = false;
				break;
			default:
				throw new Error(`Unknown argument: ${key}`);
		}
	}

	if (positionals[0]) options.route = positionals[0];
	if (positionals[1]) options.output = positionals[1];
	if (!options.route.startsWith("/")) options.route = `/${options.route}`;

	return options;
}

function sleep(ms) {
	return new Promise((resolveSleep) => setTimeout(resolveSleep, ms));
}

async function waitForServer(url, timeoutMs = 20000) {
	const start = Date.now();
	let lastError;

	while (Date.now() - start < timeoutMs) {
		try {
			const response = await fetch(url);
			if (response.ok) return;
			lastError = new Error(`Server responded with ${response.status}`);
		} catch (error) {
			lastError = error;
		}
		await sleep(250);
	}

	throw lastError ?? new Error(`Timed out waiting for ${url}`);
}

async function stopServer(child) {
	if (child.exitCode !== null) return;

	child.kill("SIGTERM");
	await Promise.race([
		new Promise((resolveClose) => child.once("close", resolveClose)),
		sleep(3000),
	]);

	if (child.exitCode === null) child.kill("SIGKILL");
}

async function main() {
	const options = parseArgs(process.argv.slice(2));
	const outputPath = resolve(options.output);
	const baseUrl = `http://127.0.0.1:${options.port}`;
	const targetUrl = new URL(options.route, `${baseUrl}/`).toString();

	await mkdir(dirname(outputPath), { recursive: true });

	const server = spawn(
		"npm",
		["run", "dev", "--", "--host", "127.0.0.1", "--port", String(options.port)],
		{
			stdio: ["ignore", "pipe", "pipe"],
			env: process.env,
		},
	);

	server.stdout.on("data", (chunk) => process.stderr.write(chunk));
	server.stderr.on("data", (chunk) => process.stderr.write(chunk));

	let browser;
	try {
		await waitForServer(baseUrl);

		browser = await chromium.launch({ headless: true });
		const page = await browser.newPage({
			viewport: {
				width: options.width,
				height: options.height,
			},
		});

		await page.goto(targetUrl, { waitUntil: "networkidle" });
		if (options.selector) await page.waitForSelector(options.selector);
		if (options.delay > 0) await page.waitForTimeout(options.delay);

		await page.screenshot({
			path: outputPath,
			fullPage: options.fullPage,
		});

		console.log(outputPath);
	} finally {
		if (browser) await browser.close();
		await stopServer(server);
	}
}

main().catch((error) => {
	console.error(error instanceof Error ? error.stack : String(error));
	process.exit(1);
});
