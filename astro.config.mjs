import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

export default defineConfig({
	server: { port: 41920 },
	output: "static",
	site: "https://lucasilverentand.com",
	integrations: [icon(), sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},
});
