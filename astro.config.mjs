import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

export default defineConfig({
	output: "static",
	site: "https://lucasilverentand.com",
	integrations: [icon(), sitemap()],
});
