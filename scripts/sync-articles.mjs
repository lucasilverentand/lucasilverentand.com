import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const configPath = path.join(rootDir, "articles.config.json");
const dataDir = path.join(rootDir, "src/data");
const outputPath = path.join(dataDir, "external-articles.json");
const blogContentDir = path.join(rootDir, "src/content/blog");
const legacyOutputDir = path.join(rootDir, "src/content/blog/imported");

async function main() {
	const config = await loadConfig();
	await mkdir(dataDir, { recursive: true });
	await rm(legacyOutputDir, { recursive: true, force: true });
	await rm(path.join(blogContentDir, ".imported-manifest.json"), { force: true });
	await removeLegacyImportedMarkdown();

	const articles = [];

	for (const source of config.sources) {
		validateSource(source);
		const xml = await fetchFeed(source.feed);
		const items = parseFeed(xml);

		for (const item of items) {
			const normalized = normalizeItem(item, source);

			if (!normalized) {
				continue;
			}

			articles.push(normalized);
		}
	}

	articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	await writeFile(outputPath, `${JSON.stringify(articles, null, 2)}\n`, "utf8");

	console.log(
		`Synced ${articles.length} external article${articles.length === 1 ? "" : "s"} from ${config.sources.length} source${config.sources.length === 1 ? "" : "s"}.`,
	);
}

async function loadConfig() {
	const raw = await readFile(configPath, "utf8");
	const parsed = JSON.parse(raw);

	if (!parsed || !Array.isArray(parsed.sources)) {
		throw new Error('articles.config.json must contain a top-level "sources" array.');
	}

	return parsed;
}

function validateSource(source) {
	if (!source || typeof source !== "object") {
		throw new Error("Each source must be an object.");
	}

	if (typeof source.name !== "string" || source.name.length === 0) {
		throw new Error('Each source needs a non-empty "name".');
	}

	if (typeof source.feed !== "string" || source.feed.length === 0) {
		throw new Error(`Source \"${source.name}\" needs a non-empty \"feed\" URL.`);
	}
}

async function fetchFeed(url) {
	const response = await fetch(url, {
		headers: {
			"user-agent": "lucasilverentand.com article sync",
			accept:
				"application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.1",
		},
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
	}

	return response.text();
}

function parseFeed(xml) {
	const normalizedXml = xml.replace(/^\uFEFF/, "");
	const items = matchBlocks(normalizedXml, "item");

	if (items.length > 0) {
		return items.map((block) => parseRssItem(block));
	}

	const entries = matchBlocks(normalizedXml, "entry");
	return entries.map((block) => parseAtomEntry(block));
}

function parseRssItem(block) {
	return {
		title: getTagValue(block, "title"),
		link: getTagValue(block, "link"),
		description: getTagValue(block, "description"),
		content: getTagValue(block, "content:encoded"),
		pubDate: getTagValue(block, "pubDate"),
		updated: getTagValue(block, "lastBuildDate"),
		guid: getTagValue(block, "guid"),
		author: getTagValue(block, "dc:creator") ?? getTagValue(block, "author"),
		categories: getTagValues(block, "category"),
	};
}

function parseAtomEntry(block) {
	return {
		title: getTagValue(block, "title"),
		link: getAtomLink(block),
		description: getTagValue(block, "summary"),
		content: getTagValue(block, "content"),
		pubDate: getTagValue(block, "published"),
		updated: getTagValue(block, "updated"),
		guid: getTagValue(block, "id"),
		author: getTagValue(block, "name"),
		categories: getAtomCategories(block),
	};
}

function normalizeItem(item, source) {
	const title = cleanText(item.title);
	const link = cleanUrl(item.link);
	const guid = cleanText(item.guid);
	const dateValue = cleanText(item.pubDate) ?? cleanText(item.updated);

	if (!title || !link || !dateValue) {
		return null;
	}

	const date = new Date(dateValue);
	if (Number.isNaN(date.getTime())) {
		return null;
	}

	const sourceName = cleanText(source.label) ?? cleanText(source.name) ?? "External";
	const content = item.content ?? item.description ?? "";
	const excerpt = collapseWhitespace(htmlToText(item.description ?? content)).slice(0, 280);
	const image = extractFirstImage(content) ?? extractFirstImage(item.description ?? "");
	const tags = uniqueStrings([
		...(Array.isArray(source.tags) ? source.tags : []),
		...item.categories.map((category) => cleanText(category)).filter(Boolean),
	]);
	const idBase = guid || link;

	return {
		id: createHash("sha1").update(idBase).digest("hex"),
		title,
		description: excerpt || `Originally published on ${sourceName}.`,
		date: date.toISOString(),
		tags,
		source: sourceName,
		externalUrl: link,
		canonicalUrl: link,
		image: image ?? undefined,
		imported: true,
	};
}

function extractFirstImage(html) {
	if (typeof html !== "string" || html.length === 0) {
		return null;
	}

	const match = html.match(/<img\b[^>]*?\bsrc=(["'])(.*?)\1/i);
	if (!match) {
		return null;
	}

	const src = decodeXmlEntities(match[2]).trim();
	if (!src) {
		return null;
	}

	try {
		return new URL(src).toString();
	} catch {
		return null;
	}
}

async function removeLegacyImportedMarkdown() {
	for (const entry of await readFileSafe(blogContentDir)) {
		if (entry.startsWith("imported-") && entry.endsWith(".md")) {
			await rm(path.join(blogContentDir, entry), { force: true });
		}
	}
}

function matchBlocks(xml, tagName) {
	const pattern = new RegExp(
		`<${escapeRegExp(tagName)}(?:\\s[^>]*)?>([\\s\\S]*?)</${escapeRegExp(tagName)}>`,
		"gi",
	);
	return [...xml.matchAll(pattern)].map((match) => match[1]);
}

function getTagValue(xml, tagName) {
	const pattern = new RegExp(
		`<${escapeRegExp(tagName)}(?:\\s[^>]*)?>([\\s\\S]*?)</${escapeRegExp(tagName)}>`,
		"i",
	);
	const match = xml.match(pattern);
	return match ? decodeXmlEntities(stripCdata(match[1]).trim()) : null;
}

function getTagValues(xml, tagName) {
	const pattern = new RegExp(
		`<${escapeRegExp(tagName)}(?:\\s[^>]*)?>([\\s\\S]*?)</${escapeRegExp(tagName)}>`,
		"gi",
	);
	return [...xml.matchAll(pattern)].map((match) => decodeXmlEntities(stripCdata(match[1]).trim()));
}

function getAtomLink(xml) {
	const links = [...xml.matchAll(/<link\b([^>]*)\/?>/gi)];

	for (const [, attributes] of links) {
		const rel = getAttribute(attributes, "rel");
		const href = getAttribute(attributes, "href");

		if (href && (!rel || rel === "alternate")) {
			return decodeXmlEntities(href);
		}
	}

	return null;
}

function getAtomCategories(xml) {
	return [...xml.matchAll(/<category\b([^>]*)\/?>/gi)]
		.map(([, attributes]) => getAttribute(attributes, "term"))
		.filter(Boolean)
		.map((value) => decodeXmlEntities(value));
}

function getAttribute(attributes, name) {
	const pattern = new RegExp(`${escapeRegExp(name)}=(["'])(.*?)\\1`, "i");
	const match = attributes.match(pattern);
	return match ? match[2] : null;
}

function stripCdata(value) {
	return value.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "");
}

function decodeXmlEntities(value) {
	return value
		.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&apos;/g, "'")
		.replace(/&amp;/g, "&")
		.replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
		.replace(/&#(\d+);/g, (_, num) => String.fromCodePoint(Number.parseInt(num, 10)));
}

function htmlToText(value) {
	return decodeXmlEntities(
		value
			.replace(/<script[\s\S]*?<\/script>/gi, " ")
			.replace(/<style[\s\S]*?<\/style>/gi, " ")
			.replace(/<br\s*\/?>/gi, "\n")
			.replace(/<\/p>/gi, "\n\n")
			.replace(/<[^>]+>/g, " "),
	);
}

function collapseWhitespace(value) {
	return value.replace(/\s+/g, " ").trim();
}

function cleanText(value) {
	return typeof value === "string" ? collapseWhitespace(value) : null;
}

function cleanUrl(value) {
	try {
		return value ? new URL(value).toString() : null;
	} catch {
		return null;
	}
}

function uniqueStrings(values) {
	return [...new Set(values.map((value) => cleanText(value)).filter(Boolean))];
}

async function readFileSafe(dirPath) {
	try {
		return await readdir(dirPath);
	} catch (error) {
		if (error.code === "ENOENT") {
			return [];
		}
		throw error;
	}
}

function escapeRegExp(value) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

main().catch((error) => {
	console.error(error instanceof Error ? error.message : error);
	process.exitCode = 1;
});
