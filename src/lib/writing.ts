import externalArticles from "../data/external-articles.json";
import type { CollectionEntry } from "astro:content";

export type ExternalArticle = {
	id: string;
	title: string;
	description: string;
	date: string;
	tags: string[];
	source?: string;
	externalUrl: string;
	canonicalUrl?: string;
	imported: true;
};

export type WritingEntry =
	| {
			id: string;
			title: string;
			description: string;
			date: Date;
			tags: string[];
			source?: string;
			externalUrl?: string;
			canonicalUrl?: string;
			imported: boolean;
	  }
	| {
			id: string;
			title: string;
			description: string;
			date: Date;
			tags: string[];
			source?: string;
			externalUrl: string;
			canonicalUrl?: string;
			imported: true;
	  };

export function getExternalArticles(): WritingEntry[] {
	return (externalArticles as ExternalArticle[]).map((article) => ({
		...article,
		date: new Date(article.date),
	}));
}

export function toWritingEntry(post: CollectionEntry<"blog">): WritingEntry {
	return {
		id: post.id,
		title: post.data.title,
		description: post.data.description,
		date: post.data.date,
		tags: post.data.tags,
		source: post.data.source,
		externalUrl: post.data.externalUrl,
		canonicalUrl: post.data.canonicalUrl,
		imported: post.data.imported,
	};
}
